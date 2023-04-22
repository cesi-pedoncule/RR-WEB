import { useEffect, useState } from "react";
import CommonStyles from "../styles/CommonStyles.module.css";
import { Client, Resource } from "rr-apilib";
import SearchBar from "../components/Input/SearchBar";
import ResourceCard from "../components/Card/ResourceCard";

interface Props {
    client: Client;
}

export default function ResourcesPage ({ client }: Props) {
    
    const [resources, setResources] = useState<Resource[]>([]);

    const handleChangeSearch = (text: string) => {
        
    }
    
    const fetchResources = async () => {
        setResources(Array.from((await client.resources.fetchAll()).values()));
    }

    useEffect(() => {
        fetchResources();
    }, [client])
    
    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <h1 className={CommonStyles.title}>Les ressources</h1>
                <SearchBar onChangeSearch={handleChangeSearch} />
                <div className={CommonStyles.itemsContainer}>
                    {resources.map((r, i) =>
                        <ResourceCard key={i} resourceData={r}/>
                    )}
                </div>
            </div>
        </div>
    )
}