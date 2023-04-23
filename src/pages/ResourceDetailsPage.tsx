import { Client, Resource } from "rr-apilib";
import CommonStyles from "../styles/CommonStyles.module.css";
import ResourceDetailsPageStyles from "../styles/Page/ResourceDetailsPageStyles.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import ResourceCardWithUser from "../components/Card/ResourceCardWithUser";

interface Props {
    client: Client;
}

export default function ResourceDetailPage ({ client }: Props) {

    const { id } = useParams();

    const [ resource, setResource ] = useState<Resource>();

    useEffect(() => {
        if(id) {
            setResource(client.resources.cache.get(id));
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
                </div>
            </div>
        </div>
    )
}