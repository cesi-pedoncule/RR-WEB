import { useEffect, useState } from "react";
import { Category, Client } from "rr-apilib";

import CommonStyles from "../styles/CommonStyles.module.css";
import CategoriesStyles from "../styles/Page/CategoriesPageStyles.module.css";


import CategoryCard from "../components/Card/CategoryCard";

interface Props {
    client: Client;
}

export default function CategoriesPage ({ client }: Props) {

    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        setCategories(Array.from((await client.categories.fetchAll()).values()));
    }

    useEffect(() => {
        fetchCategories();
    }, [client])

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <h1>CategoriesPage</h1>
                <div className={CategoriesStyles.resourcesContainer}>
                    {categories.map((q, i) => {
                        return (
                            <CategoryCard category={q} resources={Array.from(q.resources.cache.values())} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}