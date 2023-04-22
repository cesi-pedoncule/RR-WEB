import { useState } from "react";
import { Resource } from "rr-apilib";
import ResourceCardStyles from "../../styles/Components/Card/ResourceCardStyles.module.css";

interface Props {
    resourceData: Resource;
}

export default function ResourceCard ({ resourceData}: Props) {
    const [resource, setResource] = useState<Resource>(resourceData);
    const numberCommentResource = resource.comments.cache.size;
    const categories = Array.from(resource.categories.cache.values());

    const username = resource.creator ? `${resource.creator.name} ${resource.creator.firstname}` : "Utilisateur inconnu";
    const description = resource.description ?  resource.description : "Aucune description fournie" ;

    const onClickDetailResource = () => {
        
    }

    return (
        <div className={ResourceCardStyles.container} onClick={onClickDetailResource}>
            <div className={ResourceCardStyles.lineButtonsAndUser}>
                <p>{username}</p>
                <p>{resource.title}</p>
            </div>
        </div>
    )
}