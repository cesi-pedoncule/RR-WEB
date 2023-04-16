import { useLocation } from "react-router-dom";
import CommonStyles from "../styles/CommonStyles.module.css";
import { useCallback, useEffect, useState } from "react";
import { CategoryResourceManager, Category, Client, Resource } from "rr-apilib";
import { Collection } from "typescript";

interface Props {
    client: Client;
}

export default function CategoryDetailsPage ({ client }: Props) {
    
    const location = useLocation();

    const [ category, setCategory ] = useState<Category>();
    const [ resources, setResources ] = useState<Resource[]>([]);
    const [ resourcesFiltered, setResourcesFiltered ] = useState<Resource[]>([]);
    const [ refreshing, setRefreshing ] = useState(false);

    const fetchResources = async () => {
        setCategory(await client.categories.fetch(location.state.id).then());  
    }

    useEffect(() => {
        fetchResources();
    }, [client])

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <div className={CommonStyles.itemsContainer}>
                    <h1>CategoryDetailPage</h1>
                    {
                        <h2>{category?.name}</h2>
                    }
                </div>
            </div>
        </div>
    )
}