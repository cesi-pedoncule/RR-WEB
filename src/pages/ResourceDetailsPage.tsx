import { Comment, Client, Resource } from "rr-apilib";
import CommonStyles from "../styles/CommonStyles.module.css";
import ResourceDetailsPageStyles from "../styles/Page/ResourceDetailsPageStyles.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import ResourceCardWithUser from "../components/Card/ResourceCardWithUser";
import CommentCard from "../components/Card/CommentCard";
import InputTextComment from "../components/Input/InputTextComment";

interface Props {
    client: Client;
}

export default function ResourceDetailPage ({ client }: Props) {

    const { id } = useParams();

    const [ resource, setResource ] = useState<Resource>();
    const [ comments, setComments ] = useState<Comment[]>([]);

    useEffect(() => {
        if(id) {
            setResource(client.resources.cache.get(id));
            setComments(Array.from(resource ? resource.comments.sort().values() : []))
        }
    })

    if(!resource) {
        return (
            <div>{"Cette resource n'existe pas"}</div>
        )
    }
    
    
    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <div className={ResourceDetailsPageStyles.centerContent}>
                    <div className={ResourceDetailsPageStyles.resourceContainer}>
                        <ResourceCardWithUser resource={resource} styleContainer={ResourceDetailsPageStyles.cardContainer}/>
                    </div>
                    <div className={ResourceDetailsPageStyles.commentsContainer}>
                        <div className={ResourceDetailsPageStyles.commentTitle}>Commentaires</div>
                        {
                            client.auth.me && <InputTextComment resource={resource} setComments={setComments}/>
                        }
                        <div className={ResourceDetailsPageStyles.commentContainer}>
                            {
                                comments.map((comment) => 
                                    <CommentCard comment={comment} setComments={setComments} resource={resource}/>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}