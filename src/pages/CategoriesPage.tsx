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
        const filteredCategories = categories.filter((category) => 
            category.name.toLowerCase().includes(text.toLowerCase())
        );
        setCategoriesFiltered([...filteredCategories.slice(0, 8)]);
    }

    const fetchCategories = async () => {
        setCategories(Array.from((await client.categories.fetchAll()).values()));
    }

    useEffect(() => {
        fetchCategories();
        if (categoriesFiltered.length === 0 && categories.length !== 0) {
            setCategoriesFiltered([...categories.slice(0, 8)]);
        }
    }, [client])

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <h1 className={CommonStyles.title}>Les catégories</h1>
                <SearchBar onChangeSearch={handleChangeSearch} />
                <div className={CommonStyles.itemsContainer}>
                    {categoriesFiltered.map((q, i) => {
                        return (
                            <CategoryCard key={i} category={q}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}