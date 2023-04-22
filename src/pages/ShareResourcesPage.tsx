import { useCallback, useEffect, useState } from "react";
import { Client, Resource } from "rr-apilib";

import CommonStyles from "../styles/CommonStyles.module.css";
import SearchBar from "../components/Input/SearchBar";
import ResourceCard from "../components/Card/ResourceCard";

interface Props {
    client: Client;
}

export default function ShareResourcePage ({ client }: Props) {
    
    const [ resources, setResources ] = useState<Resource[]>([]);
	const [ resourcesFiltered, setResourcesFiltered ] = useState<Resource[]>([]);

	const onClickShareNewItem = () => {
		// navigation.navigate("CreateResourceScreen", { client });
	}

	const handleChangeSearch = (text: string) => {
        if(client.auth.me != null){
            const filteredResources = Array.from(client.auth.me.resources.cache.values()).filter((resource) => 
                resource.title.toLowerCase().includes(text.toLowerCase())
            );
            setResources([...filteredResources])
            setResourcesFiltered([...filteredResources.splice(0, 6)]);
        }
	}

	useEffect(() => {
        if(client.auth.me == null){
			// navigation.navigate("Login", { client });
		}
        onRefresh();
    }, []);

	const onRefresh = useCallback(async () => {
		if(client.auth.me != null){
			const refreshResources:Resource[] = Array.from(client.auth.me.resources.cache.values());
			setResources([...refreshResources]);
			setResourcesFiltered([...refreshResources.slice(0, 6)]);
		}
 	 }, []);

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
            <h1 className={CommonStyles.title}>Mes ressources</h1>
                <SearchBar onChangeSearch={handleChangeSearch} />
                <div className={CommonStyles.itemsContainer}>
                    {
                        resourcesFiltered.map((r, i) =>
                            <ResourceCard key={i} resourceData={r}/>
                        )
                    }
                </div>
            </div>
        </div>
    )
}