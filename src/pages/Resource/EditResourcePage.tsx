import { Client } from "rr-apilib";
import CommonStyles from "../../styles/CommonStyles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from 'react'
import EditResourceStyles from '../../styles/Page/EditResourcePageStyles.module.css'
import { Attachment, AttachmentBuilder, Category, Resource } from 'rr-apilib'
import Switch from "react-switch";
import InputTextDescription from "../../components/Input/InputTextDescription";
import ButtonFile from "../../components/Button/ButtonFile";
import MediaButton from "../../components/Button/MediaButton";
import SelectCategories from "../../components/Input/SelectCategories";

interface Props {
    client: Client;
}

export default function EditResourcePage ({ client }: Props) {

    const navigate = useNavigate();

    const { id } = useParams();

    const [ resource, setResource ] = useState<Resource>();

    const [ title, setTitle ] = useState<string>(resource ? resource.title : "");
    const [ description, setDescription ] = useState(resource ? resource.description : "");
    const [ categories, setCategories ] = useState<Category[]>(Array.from(resource ? resource.categories.cache.values() : []));
    const [ isPublic, setIsPublic ] = useState(resource ? resource.isPublic : false);
    const [ file, setFile ] = useState<File>();
    // Les attachmentsBuilder sont les attachments qu'on rajoute, et qu'on peut supprimer comme pour dans CreateResourceScreen => des nouvelles attachments
    // Elles sont affichées sur l'écran
    const [ attachmentsBuilder, setAttachmentsBuilder ] = useState<AttachmentBuilder[]>([]);
    // Les attachmentsToDelete est une liste à la base vide, qu'on remplie à chaque fois qu'on veut supprimer une attachment, 
    // elle permet de supprimer les attachments, déjà présente avant l'édition, seulement si on valide la modification de la ressource 
    // Elles ne sont pas affichées
    const [ attachmentsToDelete, setAttachmentsToDelete ] = useState<Attachment[]>([]);
    // Les attachmentsToShow sont les attachments qui était déjà présente avant l'édition, qu'on montre à l'écran, 
    // et qu'on diminue quand on supprime une attachment => C'est juste un state de visualisation, elle n'est pas prise en compte au moment de valider la modif
    const [ attachmentsToShow, setAttachmentsToShow ] = useState<Attachment[]>(Array.from(resource ? resource.attachments.cache.values() : []));

    useEffect(() => {
        if(id) {
            setResource(client.resources.cache.get(id));
            setTitle(resource ? resource.title : "");
            setDescription(resource ? resource.description : "");
            setCategories(Array.from(resource ? resource.categories.cache.values() : []));
            setIsPublic(resource ? resource.isPublic : false);
            setAttachmentsBuilder([]);
            setAttachmentsToDelete([]);
            setAttachmentsToShow(Array.from(resource ? resource.attachments.cache.values() : []));
        }
    }, [id, client.resources.cache, resource])

    if(!resource) {
        navigate('/404');
        return (
            <div>{"Cette resource n'existe pas"}</div>
        )
    }

    const onChangeTitleEvent = (event: any) => {
        setTitle(event.target.value);
    };

    const toggleSwitch = () => setIsPublic(previousState => !previousState);

    const onClickSend = async () => {

        try {
            resource.title = title;
            resource.description = description;
            
            await resource.categories.set(categories);
            await client.resources.edit(resource);

            attachmentsBuilder.map(async (attachment) => 
                await resource.attachments.create(attachment)
            );

            attachmentsToDelete.map(async (attachmentToDelete) =>
                await resource.attachments.delete(attachmentToDelete)
            );
            navigate(-1);

        } catch(error) {
            console.log("Problème lors de l'édition");
        }
    }

    const onClickAddFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            if((attachmentsBuilder.length + resource.attachments.cache.size) < 6 && file != null){
                const attachment = new AttachmentBuilder().setFile(file).setRessource(resource);
                attachmentsBuilder.push(attachment);
                setAttachmentsBuilder([...attachmentsBuilder ]);
            } else if (resource && attachmentsBuilder.length + resource.attachments.cache.size === 6) {
                console.log("Vous avez atteint le seuil maximum de fichier importé");
            }
        }
    }

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <div className={CommonStyles.itemsContainer}>
                    <div className={EditResourceStyles.container}>
                        <input className={EditResourceStyles.addNameResource} placeholder={"Titre de la ressource"} value={title} onChange={onChangeTitleEvent}></input>
                        <div className={EditResourceStyles.categorieContainer}>
                        {
                            <SelectCategories
                                client={client}
                                value={categories}
                                onChange={(v) => setCategories([ ...v ])}
                            />
                        }    
                        </div>
                        <InputTextDescription defaultValue={description} onChangeText={(text) => setDescription(text)}/>
                        <div className={EditResourceStyles.attachementsContainer}>
                            <ButtonFile callBack={onClickAddFile}/>
                            {
                                attachmentsToShow.map((attachment, index) => 
                                    <MediaButton 
                                        isDeleted={true} 
                                        key={index} 
                                        idAttachement={index} 
                                        attachment={attachment} 
                                        attachementsToDelete={attachmentsToDelete} 
                                        setAttachementsToDelete={setAttachmentsToDelete} 
                                        attachementsToShow={attachmentsToShow}
                                        setAttachementsToShow={setAttachmentsToShow}
                                    />
                                )
                            }
                            {
                                attachmentsBuilder.map((attachment, index) => 
                                    <MediaButton 
                                        isDeleted={true} 
                                        key={index}
                                        idAttachement={index} 
                                        attachment={attachment.file!} 
                                        attachmentsBuilder={attachmentsBuilder} 
                                        setAttachementsBuilder={setAttachmentsBuilder} 
                                    />
                                )
                            }
                        </div>
                        <div className={EditResourceStyles.switchContainer}>
                            <Switch onChange={toggleSwitch} checked={isPublic} onColor='#03989E'/>
                            <p className={CommonStyles.switchText}> Privé / Publique </p>
                        </div>
                        <button onClick={onClickSend} className={EditResourceStyles.sendButton}>Modifier</button>
                    </div>
                </div>
            </div>
        </div>
    )
}