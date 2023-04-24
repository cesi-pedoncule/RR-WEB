import { useState } from 'react';
import Switch from "react-switch";
import { AttachmentBuilder, Client, ResourceBuilder } from 'rr-apilib';

import CommonStyles from '../../styles/CommonStyles.module.css';
import CreateResourceStyles from '../../styles/Page/CreateResourcePageStyles.module.css';
import EditResourceStyles from '../../styles/Page/EditResourcePageStyles.module.css';
import InputTextDescription from '../../components/Input/InputTextDescription';
import ButtonFile from '../../components/Button/ButtonFile';
import SelectCategories from '../../components/Input/SelectCategories';
import AttachmentCard from '../../components/Card/AttachmentCard';
import { useNavigate } from 'react-router';

interface Props {
    client: Client;
}

export default function CreateResourceScreen({ client }: Props) {
    
    const navigate = useNavigate();
    const user = client.auth.me;

    const [ newResource, setNewResource ] = useState<ResourceBuilder>(new ResourceBuilder());

    const onClickSend = async () => {
        try { 
            if(user) {
                const res = await user.resources.create(newResource);
                navigate(`/resources/${res.id}/edit`);
            }

        } catch(error) {
            console.log(error);
        }
    }

    const onClickAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            const attachs: AttachmentBuilder[] = [];
            for(const f of Array.from(e.target.files)) {
                const attach = new AttachmentBuilder();
                attach.setFile(f);
                attachs.push(attach);
            }

            newResource.setAttachments(attachs);
            setNewResource(new ResourceBuilder(newResource));
        }
    }

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <div className={CommonStyles.itemsContainer}>
                    <div className={CreateResourceStyles.container}>
                        <input
                            className={CreateResourceStyles.addNameResource}
                            placeholder={"Titre de la ressource"}
                            onChange={(text) => newResource.setTitle(text.target.value)}
                        />
                        <SelectCategories
                            client={client}
                            value={newResource.categories}
                            onChange={(v) => {
                                newResource.setCategories(v);
                                setNewResource(new ResourceBuilder(newResource));
                            }}
                        />
                        <InputTextDescription
                            onChangeText={(text) => newResource.setDescription(text)}
                            defaultValue={""}
                        />
                        <div className={CreateResourceStyles.attachementsContainer}>
                            <ButtonFile callBack={onClickAddFile}/>
                            {
                                newResource.attachments.map((attachment, index) => 
                                    <AttachmentCard
                                        key={index}
                                        attachment={attachment}
                                        displayDeleteButton
                                        deleteCallback={() => {
                                            newResource.attachments.splice(index, 1);
                                            setNewResource(new ResourceBuilder(newResource));
                                        }}
                                    />
                                )
                            }
                        </div>
                        <div className={EditResourceStyles.switchContainer}>
                            <Switch
                                onChange={() => {
                                    newResource.setIsPublic(!newResource.isPublic);
                                    setNewResource(new ResourceBuilder(newResource));
                                }}
                                onColor='#03989E'
                                checked={newResource.isPublic}
                            />
                            <p className={CommonStyles.switchText}> Privé / Publique </p>
                        </div>
                        <div className={CreateResourceStyles.sendButtonContainer}>
                            <button
                                onClick={onClickSend}
                                className={CreateResourceStyles.sendButton}
                            >Enregistrer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}