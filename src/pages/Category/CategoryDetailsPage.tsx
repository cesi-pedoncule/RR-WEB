import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Category, Client } from "rr-apilib";

import CommonStyles from "../../styles/CommonStyles.module.css";
import SearchBar from "../../components/Input/SearchBar";
import ResourceCardWithUser from "../../components/Card/ResourceCardWithUser";

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
    }, [id, client.categories.cache]);

    if(!category) {
        return (
            <div>{"Cette categorie n'existe pas"}</div>
        )
    }

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <h1 className={CommonStyles.title}>{category.name}</h1>
                <SearchBar value={search} onChangeSearch={(text) => setSearch(text)} />
                <div className={CommonStyles.itemsContainer}>
                    {
                        category.resources.cache.map((resource, id) => {
                            if(resource.title.toLowerCase().includes(search.toLowerCase())) {
                                return (
                                    <ResourceCardWithUser key={id} resourceData={resource} />
                                )
                            } else {
                                return null;
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}