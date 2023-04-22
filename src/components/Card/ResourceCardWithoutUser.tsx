import { useState } from "react";
import { Resource } from "rr-apilib";
import ResourceCardStyles from "../../styles/Components/Card/ResourceCardStyles.module.css";
import CategoryButton from "../Button/CategoryButton";
import CommentButton from "../Button/CommentButton";
import LikeButton from "../Button/LikeButton";
import EditButton from "../Button/EditButton";
import DeleteButton from "../Button/DeleteButton";
import StateButton from "../Button/StateButton";
import { useNavigate } from "react-router-dom";

interface Props {
    resourceData: Resource;
    styleContainer?: any;
}

export default function ResourceCard ({ resourceData, styleContainer}: Props) {
    
    const navigate = useNavigate();
    
    const [resource, setResource] = useState<Resource>(resourceData);
    const numberCommentResource = resource.comments.cache.size;

    const description = resource.description ?  resource.description : "Aucune description fournie" ;

    const onClickDetailResource = () => {
        
    }

    const onClickEditResource = () => {
        
    }

    const onClickDeleteResource = () => {
        
    }

    return (
        <div className={ResourceCardStyles.container} onClick={onClickDetailResource}>
            <div className={ResourceCardStyles.withoutUserContainer}>
                <p className={ResourceCardStyles.cardTitle}>{resource.title}</p>
                <div className={ResourceCardStyles.categoriesContainer}>
                    {
                        resource.categories.cache.map((category) => 
                            <CategoryButton category={category}/>
                        )
                    }
                </div>
                <p className={ResourceCardStyles.cardText}>{description}</p>
                <div className={ResourceCardStyles.buttonsContainer}>
                    <LikeButton resource={resource}/>
                    <CommentButton commentNumber={numberCommentResource}/>
                    <EditButton callBack={onClickEditResource}/>
                    <DeleteButton callBack={onClickDeleteResource} />
                    <StateButton resource={resource}/>
                </div>
            </div>
        </div>
    )
}