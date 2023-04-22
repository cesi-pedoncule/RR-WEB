import { useState } from "react";
import { Resource } from "rr-apilib";
import ResourceCardStyles from "../../styles/Components/Card/ResourceCardStyles.module.css";
import CategoryButton from "../Button/CategoryButton";
import CommentButton from "../Button/CommentButton";
import LikeButton from "../Button/LikeButton";

interface Props {
    resourceData: Resource;
    styleContainer?: any;
}

export default function ResourceCard ({ resourceData, styleContainer}: Props) {
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
                <p className={ResourceCardStyles.cardUser}>{username}</p>
                <div className={ResourceCardStyles.userAndButtonsContainer}>
                    <LikeButton resource={resource}/>
                    <CommentButton commentNumber={numberCommentResource}/>
                </div>
            </div>
            <p className={ResourceCardStyles.cardTitle}>{resource.title}</p>
            <div className={ResourceCardStyles.categoriesContainer}>
                {
                    resource.categories.cache.map((category) => 
                        <CategoryButton category={category}/>
                    )
                }
            </div>
            <p className={ResourceCardStyles.cardText}>{description}</p>
        </div>
    )
}