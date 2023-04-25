import { useEffect, useState } from "react";
import { Comment, Resource } from "rr-apilib";
import CommentCardStyles from '../../styles/Components/Card/CommentCardStyles.module.css';
import DeleteButton from "../Button/DeleteButton";

interface Props {
    comment: Comment;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    resource: Resource;
}

export default function CommentCard({comment, setComments, resource}:Props) {
    const user = resource.client.auth.me;
    
    const [ isDeleted, setIsDeleted]  = useState<boolean>(false);

    const onClickDeleteComment = async () => {
        const res = await resource.comments.delete(comment);
        const newComments:Comment[] = Array.from(res.comments.cache.values());
        setComments(newComments);
    };

    useEffect(() => {
        setIsDeleted(comment.user?.id === user?.id);
    }, [setIsDeleted])

    const getDateCreation = () => {
        let localDateString:string;
        const hourDateString:string = comment.createdAt.getHours()<10 ? "0"+comment.createdAt.getHours() : comment.createdAt.getHours().toString();
        const minuteDateString:string = comment.createdAt.getMinutes()<10 ? "0"+comment.createdAt.getMinutes() : comment.createdAt.getMinutes().toString();
        if(comment.createdAt.toLocaleDateString("fr-FR") === new Date().toLocaleDateString("fr-FR")){
            localDateString = "Aujourd'hui";
        } else {
            localDateString = comment.createdAt.toLocaleDateString("fr-FR");
        }
        
        return localDateString+"     "+hourDateString+":"+minuteDateString;
    }

    return (
        <div className={CommentCardStyles.container}>
            <div className={CommentCardStyles.infoContainer}>
                <div className={CommentCardStyles.textCardUser}>{comment.user ? `${comment.user.name} ${comment.user.firstname}` : "Utilisateur inconnu"}</div>
                <div className={CommentCardStyles.cardDate}>{getDateCreation()}</div>
            </div>
            <div className={CommentCardStyles.lineDeleteComment}>
                <textarea readOnly className={CommentCardStyles.cardComment} value={comment.comment}/>
                {   
                    isDeleted &&
                    <div className={CommentCardStyles.deleteCommentButton}>
                        <DeleteButton callBack={onClickDeleteComment}/>
                    </div>
                }
            </div>
        </div>
    )
}