import { useState } from "react";
import { Client } from "rr-apilib";

import CommonStyles from "../../styles/CommonStyles.module.css";
import CategoryCard from "../../components/Card/CategoryCard";
import SearchBar from "../../components/Input/SearchBar";

interface Props {
    client: Client;
}

export default function CategoriesPage ({ client }: Props) {

    const [ search, setSearch ] = useState('');

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                
                <h1 className={CommonStyles.title}>Les catégories</h1>
                
                <SearchBar value={search} onChangeSearch={(text) => setSearch(text)} />
                
                <div className={CommonStyles.itemsContainer}>
                    {client.categories.cache.map((category, id) => {
                        if(category.name.toLowerCase().includes(search.toLowerCase())) {
                            return (
                                <CategoryCard key={id} category={category} />
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}