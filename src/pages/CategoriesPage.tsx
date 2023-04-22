import { useCallback, useEffect, useState } from "react";
import { Category, Client } from "rr-apilib";
import CommonStyles from "../styles/CommonStyles.module.css";
import CategoryCard from "../components/Card/CategoryCard";
import SearchBar from "../components/Input/SearchBar";

interface Props {
    client: Client;
}

export default function CategoriesPage ({ client }: Props) {

    const [categories, setCategories] = useState<Category[]>([]);
    const [ categoriesFiltered, setCategoriesFiltered ] = useState<Category[]>([]);

    const handleChangeSearch = (text: string) => {
        const filteredCategories = Array.from(client.categories.cache.values()).filter((category) => 
            category.name.toLowerCase().includes(text.toLowerCase())
        );
        setCategories([...filteredCategories]);
        setCategoriesFiltered([...filteredCategories.slice(0, 8)]);
    }

    const onRefresh = useCallback(async () => {
        const refreshCategories = Array.from(client.categories.cache.values());
		setCategories([ ...refreshCategories ]);
		setCategoriesFiltered([ ...refreshCategories.slice(0, 8) ]);
 	 }, []);

    useEffect(() => {
        onRefresh();
    }, [client])

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <h1 className={CommonStyles.title}>Les catégories</h1>
                
                <SearchBar onChangeSearch={handleChangeSearch} />
                
                <div className={CommonStyles.itemsContainer}>
                    {categoriesFiltered.map((q, i) => 
                        <CategoryCard key={i} category={q}/>
                    )}
                </div>
            </div>
        </div>
    )
}