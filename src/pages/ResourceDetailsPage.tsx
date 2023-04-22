import { Client, Resource } from "rr-apilib";
import CommonStyles from "../styles/CommonStyles.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import CategoryCard from "../components/Card/CategoryCard";

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
                <h1>{resource.title}</h1>
                <p>{resource.description}</p>

                <h4>Catégories</h4>
                
                <div className={CommonStyles.itemsContainer}>
                    {
                        resource.categories.cache.map((cat, id) => (
                            <CategoryCard key={id} category={cat} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}