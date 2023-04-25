import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { APIValidationStateCreate, Client, Resource, ValidationStateBuilder } from "rr-apilib";
import CommonStyles from "../../styles/CommonStyles.module.css";
import AdminValidationPageStyles from "../../styles/Page/Admin/AdminValidationPageStyles.module.css";
import ResourceCardWithUser from "../../components/Card/ResourceCardWithUser";
import MediaButton from "../../components/Button/MediaButton";

interface Props {
    client: Client;
}

export default function AdminValidationPage ({ client }: Props) {

    const navigate = useNavigate();
    const { id } = useParams();

    const [ resource, setResource ] = useState<Resource>();
    const [ newValidationState ] = useState<ValidationStateBuilder>(new ValidationStateBuilder());

    const handleOnClickChangeState = async (state: APIValidationStateCreate.Validated | APIValidationStateCreate.Rejected) => {
        if(resource && client.auth.me) {
            newValidationState.setResource(resource);
            newValidationState.setState(state);
            newValidationState.setModerator(client.auth.me);

            await resource.validations.create(newValidationState);

            navigate('/admin/validations');
        }
    }

    useEffect(() => {
        if(client.auth.me === null || !client.auth.me.isModerator) {
            navigate('/login');
        }
        
        if(id) {
            setResource(client.resources.cache.get(id));
        }
    }, [client.auth.me, client.resources.cache, id, navigate]);

    if(!resource) {
        navigate('/404');
        return (
            <div>{"Cette ressource n'existe pas"}</div>
        )
    }

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <div className={AdminValidationPageStyles.centerContent}>
                    <div className={AdminValidationPageStyles.resourceContainer}>
                        <ResourceCardWithUser resourceData={resource} styleContainer={AdminValidationPageStyles.cardContainer}/>
                    </div>
                    <div className={AdminValidationPageStyles.btnFile}>
                        <div className={AdminValidationPageStyles.validationTitle}>Pièces de jointes :</div>
                        {
                            Array.from(resource.attachments.cache.values()).map((attachment, index) => (
                                <MediaButton isDeleted={false} attachment={attachment} key={index} idAttachement={index}/>
                            ))
                        }
                    </div>
                    <div className={AdminValidationPageStyles.validationsContainer}>
                        <div onClick={() => handleOnClickChangeState(APIValidationStateCreate.Validated)} className={AdminValidationPageStyles.button}>Valider</div>
                        <div onClick={() => handleOnClickChangeState(APIValidationStateCreate.Rejected)} className={AdminValidationPageStyles.button}>Rejeter</div>
                    </div>
                </div>
            </div>
        </div>
    )
}