import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import {
    APIValidationStateCreate,
    Client,
    Resource,
    ValidationStateBuilder
} from "rr-apilib";

import CommonStyles from "../../styles/CommonStyles.module.css";
import ResourceDetailsPageStyles from "../../styles/Page/ResourceDetailsPageStyles.module.css";
import ResourceCardWithUser from "../../components/Card/ResourceCardWithUser";

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
                <div className={ResourceDetailsPageStyles.centerContent}>
                    <div className={ResourceDetailsPageStyles.resourceContainer}>
                        <ResourceCardWithUser resource={resource} styleContainer={ResourceDetailsPageStyles.cardContainer}/>
                    </div>
                    <div className={ResourceDetailsPageStyles.commentsContainer}>
                        <div className={ResourceDetailsPageStyles.commentContainer}>
                            <div className={ResourceDetailsPageStyles.commentTitle}>Pièces jointes :</div>
                            {/* TODO: display files */}
                            <div onClick={() => handleOnClickChangeState(APIValidationStateCreate.Validated)} className={ResourceDetailsPageStyles.validateButton}>Valider</div>
                            <div onClick={() => handleOnClickChangeState(APIValidationStateCreate.Rejected)} className={ResourceDetailsPageStyles.validateButton}>Rejeter</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}