import { Resource } from "rr-apilib";
import { useNavigate } from "react-router";
import { useState } from "react";

import ResourceCardStyles from "../../styles/Components/Card/ResourceCardStyles.module.css";
import CategoryButton from "../Button/CategoryButton";
import CommentButton from "../Button/CommentButton";
import LikeButton from "../Button/LikeButton";

interface Props {
    resourceData: Resource;
    styleContainer?: any;
}

export default function ResourceCardWithUser({ resourceData, styleContainer }: Props) {

    const navigate = useNavigate();

    const [ resource, setResource ] = useState(resourceData);
    const username = resourceData.creator ? `${resourceData.creator.name} ${resourceData.creator.firstname}` : "Utilisateur inconnu";
    const description = resourceData.description ?  resourceData.description : "Aucune description fournie" ;

    const onClickDetailResource = () => {
        navigate(`/resources/${resourceData.id}`);
    }
    console.log('1')

    return (
        <div className={styleContainer ? styleContainer : ResourceCardStyles.container}>
            <div className={ResourceCardStyles.lineButtonsAndUser}>
                <div className={ResourceCardStyles.cardUser}>{username}</div>
                <div className={ResourceCardStyles.userAndButtonsContainer}>
                    <LikeButton resource={resource} setResource={setResource} />
                    <CommentButton commentNumber={resourceData.comments.cache.size}/>
                </div>
            </div>
            <div className={ResourceCardStyles.cardTitle} onClick={onClickDetailResource}>{resourceData.title}</div>
            <div className={ResourceCardStyles.categoriesContainer}>
                {
                    resourceData.categories.cache.map((category, id) => 
                        <CategoryButton key={id} category={category}/>
                    )
                }
            </div>
            {
                <div className={styleContainer ? ResourceCardStyles.cardTextAuto : ResourceCardStyles.cardText}>{description}</div>
            }
        </div>
    )
}