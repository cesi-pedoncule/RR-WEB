import { useParams } from "react-router-dom";
import CommonStyles from "../styles/CommonStyles.module.css";
import { useCallback, useEffect, useState } from "react";
import { Category, Client, Resource } from "rr-apilib";
import SearchBar from "../components/Input/SearchBar";

interface Props {
    client: Client;
}

export default function CategoryDetailsPage ({ client }: Props) {

    const { id } = useParams();

    const [ category, setCategory ] = useState<Category>();
    const [ resources, setResources ] = useState<Resource[]>([]);
    const [ resourcesFiltered, setResourcesFiltered ] = useState<Resource[]>([]);
    // const [ refreshing, setRefreshing ] = useState(false);

    const handleChangeSearch = (text: string) => {
		if (category) {
            const filteredResources = Array.from(category.resources.getValidateResources().values()).filter((resource) =>
                resource.title.toLowerCase().includes(text.toLowerCase())
            );
            setResources([...filteredResources]);
            setResourcesFiltered(filteredResources.splice(0, 6));
        }
	}

    const onRefresh = useCallback(async () => {
        if (category) {
            const newCategorie = client.categories.cache.get(category.id);
            if(newCategorie){
                const refreshResources:Resource[] = Array.from(newCategorie.resources.cache.values());
                setResources([...refreshResources]);
                setResourcesFiltered([...refreshResources.slice(0, 6)]);
                // setRefreshing(false);
            }
        }
    }, []);

    useEffect(() => {
        if(id && !category) {
            alert('test')
            const categoryTmp = client.categories.cache.get(id);
            setCategory(client.categories.cache.get(id));

            setResources(Array.from(categoryTmp?.resources.cache.values() || []));
            setResourcesFiltered(Array.from(categoryTmp?.resources.cache.values() || []).slice(0, 6));
        }
        onRefresh();
    }, [id, category, resourcesFiltered, client]);

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <h1>CategoryDetailPage</h1>
                <SearchBar onChangeSearch={handleChangeSearch} />
                <div className={CommonStyles.itemsContainer}>
                    <h2>{category?.name}</h2>
                    {
                        resourcesFiltered.map((r, i) =>
                            <div key={i}>
                                <p>{r.title}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}