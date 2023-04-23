import { Resource } from "rr-apilib";
import { useNavigate } from "react-router";

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

    const username = resource.creator ? `${resource.creator.name} ${resource.creator.firstname}` : "Utilisateur inconnu";
    const description = resource.description ?  resource.description : "Aucune description fournie" ;

    const onClickDetailResource = () => {
        navigate(`/resources/${resource.id}`);
    }

    return (
        <div className={styleContainer ? styleContainer : ResourceCardStyles.container} onClick={onClickDetailResource}>
            <div className={ResourceCardStyles.lineButtonsAndUser}>
                <p className={ResourceCardStyles.cardUser}>{username}</p>
                <div className={ResourceCardStyles.userAndButtonsContainer}>
                    <LikeButton resource={resource}/>
                    <CommentButton commentNumber={resource.comments.cache.size}/>
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