import { useState } from "react";
import { Client } from "rr-apilib";
import { useNavigate } from "react-router";

import CommonStyles from "../styles/CommonStyles.module.css";
import SearchBar from "../components/Input/SearchBar";
import ResourceCard from "../components/Card/ResourceCard";
import ResourceCardWithoutUser from "../components/Card/ResourceCardWithoutUser";

interface Props {
    client: Client;
}

export default function ShareResourcePage ({ client }: Props) {

    const navigate = useNavigate();

    const [ search, setSearch ] = useState('');

    if(client.auth.me === null) {
        navigate('/login');
        return <div></div>
    }

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                
                <h1 className={CommonStyles.title}>Mes ressources</h1>
                
                <SearchBar value={search} onChangeSearch={(text) => setSearch(text)} />
                
                <div className={CommonStyles.itemsContainer}>
                    {
                        client.auth.me.resources.cache.map((resource, id) => {
                            if(resource.title.toLowerCase().includes(search.toLowerCase())) {
                                return (
                                    <ResourceCardWithoutUser key={id} resource={resource} />
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}