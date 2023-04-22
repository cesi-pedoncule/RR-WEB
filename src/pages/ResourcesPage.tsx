import { useState } from "react";
import { Client } from "rr-apilib";

import CommonStyles from "../styles/CommonStyles.module.css";
import SearchBar from "../components/Input/SearchBar";
import ResourceCard from "../components/Card/ResourceCard";

interface Props {
    client: Client;
}

export default function ResourcesPage ({ client }: Props) {

    const [ search, setSearch ] = useState('');
    
    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                
                <h1 className={CommonStyles.title}>Les ressources</h1>
                
                <SearchBar value={search} onChangeSearch={(text) => setSearch(text.toLowerCase())} />
                
                <div className={CommonStyles.itemsContainer}>
                    {client.resources.cache.map((resource, id) => {
                        if(resource.title.toLowerCase().includes(search)) {
                            return (
                                <ResourceCard key={id} resource={resource} />
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}