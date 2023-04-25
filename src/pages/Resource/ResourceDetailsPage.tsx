import { Comment, Client, Resource } from "rr-apilib";
import CommonStyles from "../../styles/CommonStyles.module.css";
import ResourceDetailsPageStyles from "../../styles/Page/ResourceDetailsPageStyles.module.css";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import ResourceCardWithUser from "../../components/Card/ResourceCardWithUser";
import CommentCard from "../../components/Card/CommentCard";
import InputTextComment from "../../components/Input/InputTextComment";
import MediaButton from "../../components/Button/MediaButton";

interface Props {
    client: Client;
}

export default function ResourceDetailPage ({ client }: Props) {

    const navigate = useNavigate();
    const { id } = useParams();

    const [ resource, setResource ] = useState<Resource>();
    const [ comments, setComments ] = useState<Comment[]>([]);

    useEffect(() => {
        if(id) {
            setResource(client.resources.cache.get(id));
            setComments(Array.from(resource ? resource.comments.sort().values() : []))
        }
    }, [id, client.resources.cache, resource])

    if(!resource) {
        navigate('/404');
        return (
            <div>{"Cette resource n'existe pas"}</div>
        )
    }
    
    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <div className={ResourceDetailsPageStyles.centerContent}>
                    <div className={ResourceDetailsPageStyles.resourceContainer}>
                        <ResourceCardWithUser resourceData={resource} styleContainer={ResourceDetailsPageStyles.cardContainer}/>
                    </div>
                    <div className={ResourceDetailsPageStyles.commentsContainer}>
                        <div className={ResourceDetailsPageStyles.commentTitle}>Commentaires</div>
                        {
                            client.auth.me && <InputTextComment resource={resource} setComments={setComments}/>
                        }
                        <div>
                            {
                                comments.map((comment, i) => 
                                    <CommentCard key={i} comment={comment} setComments={setComments} resource={resource}/>
                                )
                            }
                        </div>
                    </div>
                </div>

                {
                    resource.attachments.cache.size > 0 && (
                        <div className={ResourceDetailsPageStyles.attachementsContainer}>
                            <div className={ResourceDetailsPageStyles.commentTitle}>Pièces jointes</div>
                            <div>
                                {
                                    Array.from(resource.attachments.cache.values()).map((attachment, index) => (
                                        <MediaButton isDeleted={false} attachment={attachment} key={index} idAttachement={index}/>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
