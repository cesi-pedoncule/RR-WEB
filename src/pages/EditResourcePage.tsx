import { Client } from "rr-apilib";
import CommonStyles from "../styles/CommonStyles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import EditResourceStyles from '../styles/Page/EditResourcePageStyles.module.css'
import { Attachment, AttachmentBuilder, Category, Resource } from 'rr-apilib'
import Switch from "react-switch";
import InputTextDescription from "../components/Input/InputTextDescription";
import ButtonFile from "../components/Button/ButtonFile";

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
    const [ showSelectCategories, setShowSelectCategories ] = useState<boolean>(false);
    const [ isPublic, setIsPublic ] = useState(resource ? resource.isPublic : false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    // Les attachmentsBuilder sont les attachments qu'on rajoute, et qu'on peut supprimer comme pour dans CreateResourceScreen => des nouvelles attachments
    // Elles sont affichées sur l'écran
    const [ attachmentsBuilder, setAttachmentsBuilder ] = useState<AttachmentBuilder[]>([]);
    // Les attachmentsToDelete est une liste à la base vide, qu'on remplie à chaque fois qu'on veut supprimer une attachment, 
    // elle permet de supprimer les attachments, déjà présente avant l'édition, seulement si on valide la modification de la ressource 
    // Elles ne sont pas affichées
    const [ attachmentsToDelete, setAttachmentsToDelete ] = useState<Attachment[]>([]);
    // Les attachmentsToShow sont les attachments qui était déjà présente avantl'édition, qu'on montre à l'écran, 
    // et qu'on diminue quand on supprime une attachment => C'est juste un state de visualisation, elle n'est pas prise en compte au moment de valider la modif
    const [ attachmentsToShow, setAttachmentsToShow ] = useState<Attachment[]>(Array.from(resource ? resource.attachments.cache.values() : []));

    useEffect(() => {
        if(id) {
            setResource(client.resources.cache.get(id));
        }
    })

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
        
    }

    const onClickAddCategory = () => {
        setShowSelectCategories(true);
    }

    const onClickAddFile = () => {
        
    }

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <div></div> 
                <div className={CommonStyles.itemsContainer}>
                    <div className={EditResourceStyles.container}>
                        <input className={EditResourceStyles.addNameResource} placeholder={"Titre de la ressource"} value={title} onChange={onChangeTitleEvent}></input>
                        <div className={EditResourceStyles.categorieContainer}>
                        {

                        }    
                        </div>
                        <InputTextDescription defaultValue={""} onChangeText={(text) => setDescription(text)}/>
                        <ButtonFile text={'Ajouter un fichier'} callBack={onClickAddFile}/>
                        {
                            
                        }
                        {
                            
                        }
                        <div className={EditResourceStyles.switchContainer}>
                            <Switch onChange={toggleSwitch} checked={isPublic}/>
                            <p> Privé / Publique </p>
                        </div>
                        <button onClick={onClickSend} className={EditResourceStyles.sendButton}>Modifier</button>
                    </div>
                </div>
            </div>
        </div>
    )
}