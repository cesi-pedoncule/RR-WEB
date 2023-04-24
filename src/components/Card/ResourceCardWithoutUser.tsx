import { Resource } from "rr-apilib";
import ResourceCardStyles from "../../styles/Components/Card/ResourceCardStyles.module.css";
import CategoryButton from "../Button/CategoryButton";
import CommentButton from "../Button/CommentButton";
import LikeButton from "../Button/LikeButton";
import EditButton from "../Button/EditButton";
import DeleteButton from "../Button/DeleteButton";
import StateButton from "../Button/StateButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Props {
    resourceData: Resource;
    setIsOpenModal: any;
    moderation?: boolean;
}

export default function ResourceCardWithoutUser ({ resourceData, setIsOpenModal, moderation = false }: Props) {
    
    const navigate = useNavigate();

    const description = resourceData.description ?  resourceData.description : "Aucune description fournie" ;
    const [ resource, setResource ] = useState(resourceData);

    const onClickDetailResource = () => {
        if (!moderation) {
            navigate(`/resources/${resourceData.id}`);
        } else {
            navigate(`/admin/validations/${resourceData.id}`);
        }
    }

    const onClickEditResource = () => {
        navigate(`/resources/${resourceData.id}/edit`);
    }

    const onClickDeleteResource = async () => {
        try {
            if(resourceData.client.auth.me != null){
                await resourceData.client.auth.me.resources.delete(resourceData); 
            }
        } catch(error) {
            setIsOpenModal(true);
        } 
    }

    return (
        <div className={ResourceCardStyles.container}>
            <div className={ResourceCardStyles.withoutUserContainer}>
                <p className={ResourceCardStyles.cardTitle} onClick={onClickDetailResource}>{resourceData.title}</p>
                <div className={ResourceCardStyles.categoriesContainer}>
                    {
                        resourceData.categories.cache.map((category, id) => 
                            <CategoryButton key={id} category={category}/>
                        )
                    }
                </div>
                <p className={ResourceCardStyles.cardText}>{description}</p>
                <div className={ResourceCardStyles.buttonsContainer}>
                    <LikeButton resource={resource} setResource={setResource} />
                    <CommentButton commentNumber={resourceData.comments.cache.size} />
                    <EditButton callBack={onClickEditResource} />
                    <DeleteButton callBack={onClickDeleteResource} />
                    <StateButton resource={resourceData} />
                </div>
            </div>
        </div>
    )
}