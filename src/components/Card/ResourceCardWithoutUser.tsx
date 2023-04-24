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
    resource: Resource;
    setIsOpenModal: any;
    moderation?: boolean;
}

export default function ResourceCardWithoutUser ({ resource, setIsOpenModal, moderation = false }: Props) {
    
    const navigate = useNavigate();

    const description = resource.description ?  resource.description : "Aucune description fournie" ;

    const onClickDetailResource = () => {
        if (!moderation) {
            navigate(`/resources/${resource.id}`);
        } else {
            navigate(`/admin/validations/${resource.id}`);
        }
    }

    const onClickEditResource = () => {
        navigate(`/resources/${resource.id}/edit`);
    }

    const onClickDeleteResource = async () => {
        try {
            if(resource.client.auth.me != null){
                await resource.client.auth.me.resources.delete(resource); 
            }
        } catch(error) {
            setIsOpenModal(true);
        } 
    }

    return (
        <div className={ResourceCardStyles.container}>
            <div className={ResourceCardStyles.withoutUserContainer}>
                <p className={ResourceCardStyles.cardTitle} onClick={onClickDetailResource}>{resource.title}</p>
                <div className={ResourceCardStyles.categoriesContainer}>
                    {
                        resource.categories.cache.map((category) => 
                            <CategoryButton category={category}/>
                        )
                    }
                </div>
                <p className={ResourceCardStyles.cardText}>{description}</p>
                <div className={ResourceCardStyles.buttonsContainer}>
                    <LikeButton resource={resource} />
                    <CommentButton commentNumber={resource.comments.cache.size} />
                    <EditButton callBack={onClickEditResource} />
                    <DeleteButton callBack={onClickDeleteResource} />
                    <StateButton resource={resource} />
                </div>
            </div>
        </div>
    )
}