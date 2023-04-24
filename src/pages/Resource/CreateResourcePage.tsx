import { useState } from 'react';
import Switch from "react-switch";
import { Client, ResourceBuilder } from 'rr-apilib';

import CommonStyles from '../../styles/CommonStyles.module.css';
import CreateResourceStyles from '../../styles/Page/CreateResourcePageStyles.module.css';
import EditResourceStyles from '../../styles/Page/EditResourcePageStyles.module.css';
import InputTextDescription from '../../components/Input/InputTextDescription';
import ButtonFile from '../../components/Button/ButtonFile';
import SelectCategories from '../../components/Input/SelectCategories';

interface Props {
    client: Client;
}

export default function CreateResourceScreen({ client }: Props) {
    
    const user = client.auth.me;

    const [ newResource, setNewResource ] = useState<ResourceBuilder>(new ResourceBuilder());

    const onClickSend = async () => {
        try { 
            if(user) {
                await user.resources.create(newResource);
            }

        } catch(error) {
            console.log(error);
        }
    }

    const onClickAddFile = () => {}

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
                        <ButtonFile callBack={onClickAddFile}/>
                        {
                            newResource.attachments.map((attachment, index) => 
                                <div key={index}>
                                    <h6>{attachment.file?.name}</h6>
                                    <button
                                        onClick={() => {
                                            const attachs = newResource.attachments;
                                            const index = attachs.findIndex(a => a.file === attachment.file);
                                            attachs.splice(index, 1);
                                            newResource.setAttachments(attachs);
                                            setNewResource(new ResourceBuilder(newResource));
                                        }}
                                    >Delete</button>
                                </div>
                            )
                        }
                        <div className={EditResourceStyles.switchContainer}>
                            <Switch
                                onChange={() => {
                                    newResource.setIsPublic(!newResource.isPublic);
                                    setNewResource(new ResourceBuilder(newResource));
                                }}
                                checked={newResource.isPublic}
                            />
                            <p> Privé / Publique </p>
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