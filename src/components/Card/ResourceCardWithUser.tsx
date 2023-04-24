import { Resource } from "rr-apilib";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import ResourceCardStyles from "../../styles/Components/Card/ResourceCardStyles.module.css";
import CategoryButton from "../Button/CategoryButton";
import CommentButton from "../Button/CommentButton";
import LikeButton from "../Button/LikeButton";

interface Props {
    resource: Resource;
    styleContainer?: any;
}

export default function ResourceCardWithUser({ resource, styleContainer }: Props) {

    const navigate = useNavigate();

    const [r, setResource] = useState(resource);
    const username = resource.creator ? `${resource.creator.name} ${resource.creator.firstname}` : "Utilisateur inconnu";
    const description = resource.description ?  resource.description : "Aucune description fournie" ;

    const onClickDetailResource = () => {
        navigate(`/resources/${resource.id}`);
    }

    return (
        <div className={styleContainer ? styleContainer : ResourceCardStyles.container}>
            <div className={ResourceCardStyles.lineButtonsAndUser}>
                <div className={ResourceCardStyles.cardUser}>{username}</div>
                <div className={ResourceCardStyles.userAndButtonsContainer}>
                    <LikeButton resource={r} setResource={setResource} />
                    <CommentButton commentNumber={resource.comments.cache.size}/>
                </div>
            </div>
            <div className={ResourceCardStyles.cardTitle} onClick={onClickDetailResource}>{resource.title}</div>
            <div className={ResourceCardStyles.categoriesContainer}>
                {
                    resource.categories.cache.map((category, id) => 
                        <CategoryButton key={id} category={category}/>
                    )
                }
            </div>
            {
                styleContainer ? 
                <div className={ResourceCardStyles.cardTextAuto}>{description}</div>
                :
                <div className={ResourceCardStyles.cardText}>{description}</div>
            }
            
        </div>
    )
}