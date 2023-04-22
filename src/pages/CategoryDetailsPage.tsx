import { useParams } from "react-router-dom";
import CommonStyles from "../styles/CommonStyles.module.css";
import { useCallback, useEffect, useState } from "react";
import { CategoryResourceManager, Category, Client, Resource } from "rr-apilib";
import { Collection } from "typescript";
import SearchBar from "../components/Input/SearchBar";

interface Props {
    client: Client;
}

export default function CategoryDetailsPage ({ client }: Props) {

    const { id } = useParams();

    const [ category, setCategory ] = useState<Category>();
    const [ resources, setResources ] = useState<Resource[]>([]);
    const [ resourcesFiltered, setResourcesFiltered ] = useState<Resource[]>([]);
    const [ refreshing, setRefreshing ] = useState(false);

    // const handleChangeSearch = (text: string) => {
        
    // }

    useEffect(() => {
        if(id) {
            setCategory(client.categories.cache.get(id));
        }
    }, [id])

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <h1>CategoryDetailPage</h1>
                {/* <SearchBar onChangeSearch={handleChangeSearch} /> */}
                <div className={CommonStyles.itemsContainer}>
                    {
                        <h2>{category?.name}</h2>
                    }
                </div>
            </div>
        </div>
    )
}