import React, { useState, useEffect } from 'react'
import { Comment, Resource } from 'rr-apilib';
import CommentCardStyles from '../../styles/Components/Card/CommentCardStyles.module.css';
import { BsDashCircle } from "react-icons/bs"

interface Props {
    comment: Comment;
    setComments: any;
    resource: Resource;
}

export default function CommentCard({comment, setComments, resource}:Props) {
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const user = resource.client.auth.me;
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const onClickDeleteComment = async () => {
        setIsLoading(true);

        try {
            const res = await resource.comments.delete(comment);
            const newComments:Comment[] = Array.from(res.comments.cache.values());
            setComments(newComments);
        } catch(error) {
            // Problème lors de la suppression
        }

        setIsLoading(false);
    };

    useEffect(() => {
        setIsDeleted(comment.user?.id == user?.id);
    })

    const getDateCreation = () => {
        let localDateString:string;
        const hourDateString:string = comment.createdAt.getHours()<10 ? "0"+comment.createdAt.getHours() : comment.createdAt.getHours().toString();
        const minuteDateString:string = comment.createdAt.getMinutes()<10 ? "0"+comment.createdAt.getMinutes() : comment.createdAt.getMinutes().toString();
        if(comment.createdAt.toLocaleDateString("fr-FR") == new Date().toLocaleDateString("fr-FR")){
            localDateString = "Aujourd'hui";
        }
        else {
            localDateString = comment.createdAt.toLocaleDateString("fr-FR");
        }
        

        return localDateString+"     "+hourDateString+":"+minuteDateString;
    }

    return (
        <div className={CommentCardStyles.container}>
            <div className={CommentCardStyles.infoContainer}>
                <div className={CommentCardStyles.cardUser}>
                    <p className={CommentCardStyles.textCardUser}>{comment.user ? `${comment.user.name} ${comment.user.firstname}` : "Utilisateur inconnu"}</p>
                </div>
                <p className={CommentCardStyles.cardComment}>{comment.comment}</p>
            </div>
            <div className={CommentCardStyles.cardDateAndDelete}>
                <p className={CommentCardStyles.cardDate}>{getDateCreation()}</p>
                {
                    isDeleted && 
                    <div className={CommentCardStyles.deleteCommentButton}>
                        <div className={CommentCardStyles.buttonContainer} onClick={onClickDeleteComment}>
                            <BsDashCircle />
                        </div>
                    </div>
                }
            </div>
        </div>
        
    )
}