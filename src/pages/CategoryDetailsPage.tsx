import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Category, Client } from "rr-apilib";

import CommonStyles from "../styles/CommonStyles.module.css";
import SearchBar from "../components/Input/SearchBar";
import ResourceCard from "../components/Card/ResourceCard";

interface Props {
    client: Client;
}

export default function CategoryDetailsPage ({ client }: Props) {

    const { id } = useParams();

    const [ category, setCategory ] = useState<Category>();
    const [ search, setSearch ] = useState('');

    useEffect(() => {
        if(id) {
            setCategory(client.categories.cache.get(id));
        }
    }, [id]);

    if(!category) {
        return (
            <div>{"Cette categorie n'existe pas"}</div>
        )
    }

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                
                <h1>{category.name}</h1>
                
                <SearchBar value={search} onChangeSearch={(text) => setSearch(text)} />
                
                <h3>Resources</h3>
                <div className={CommonStyles.itemsContainer}>
                    {
                        category.resources.cache.map((resource, id) => {
                            if(resource.title.toLowerCase().includes(search.toLowerCase())) {
                                return (
                                    <ResourceCard key={id} resource={resource} />
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}