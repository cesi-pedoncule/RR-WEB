import { useCallback, useEffect, useState } from "react";
import CommonStyles from "../styles/CommonStyles.module.css";
import { Client, Resource } from "rr-apilib";
import SearchBar from "../components/Input/SearchBar";
import ResourceCard from "../components/Card/ResourceCard";

interface Props {
    client: Client;
}

export default function ResourcesPage ({ client }: Props) {
    
    const [ resources, setResources ] = useState<Resource[]>([]);
    const [ resourcesFiltered, setResourcesFiltered ] = useState<Resource[]>([]);

    const handleChangeSearch = (text: string) => {
        const filteredResources = resources.filter((resource) =>
            resource.title.toLowerCase().includes(text.toLowerCase()) && resource.isPublic
        );
        setResourcesFiltered([...filteredResources.splice(0, 6)]);
    }

    const onRefresh = useCallback(async () => {
        const refreshResources = Array.from(
            client.resources.getValidateResources()
                .filter(resource => resource.isPublic).values()
        );
        setResources([ ...refreshResources ]);
        setResourcesFiltered([ ...refreshResources.slice(0, 6) ]);
    }, []);

    useEffect(() => {
        onRefresh();
    }, [client]);
    
    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                
                <h1 className={CommonStyles.title}>Les ressources</h1>
                
                <SearchBar onChangeSearch={handleChangeSearch} />
                
                <div className={CommonStyles.itemsContainer}>
                    {resourcesFiltered.map((r, i) =>
                        <ResourceCard key={i} resource={r}/>
                    )}
                </div>
            </div>
        </div>
    )
}