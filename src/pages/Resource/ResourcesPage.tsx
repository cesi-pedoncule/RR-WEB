import { useState } from "react";
import { APIValidationState, Client } from "rr-apilib";

import CommonStyles from "../../styles/CommonStyles.module.css";
import SearchBar from "../../components/Input/SearchBar";
import ResourceCardWithUser from "../../components/Card/ResourceCardWithUser";

interface Props {
    client: Client;
}

export default function ResourcesPage ({ client }: Props) {

    const [ search, setSearch ] = useState('');
    
    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                
                <h1 className={CommonStyles.title}>Les ressources</h1>
                
                <SearchBar value={search} onChangeSearch={(text) => setSearch(text)} />
                
                <div className={CommonStyles.itemsContainer}>
                    {client.resources.cache.map((resource, id) => {
                        if(resource.title.toLowerCase().includes(search.toLowerCase()) && resource.validations.getLastValidationState()?.state === APIValidationState.Validated) {
                            return (
                                <ResourceCardWithUser key={id} resource={resource} />
                            )
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        </div>
    )
}