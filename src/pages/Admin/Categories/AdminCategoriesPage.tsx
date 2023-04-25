import { useState } from 'react'
import { Client } from "rr-apilib";
import { useNavigate } from 'react-router';
import CommonStyles from "../../../styles/CommonStyles.module.css";
import AdminCategoriesPageStyles from "../../../styles/Page/Admin/Category/AdminCategoriesPageStyles.module.css";
import SearchBar from '../../../components/Input/SearchBar';
import CategoryAdminCard from '../../../components/Card/CategoryAdminCard';

interface Props {
    client: Client;
}

export default function AdminCategoriesPage({ client }: Props) {

    const navigate = useNavigate();
    const [ search, setSearch ] = useState('');

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <h1 className={CommonStyles.title}>Les catégories</h1>
                
                <SearchBar value={search} onChangeSearch={(text) => setSearch(text)} />
                <div className={CommonStyles.buttonContainer}>
                    <button className={AdminCategoriesPageStyles.button} onClick={() => navigate('/admin/categories/create')}>Créer une nouvelle catégorie</button>
                </div>
                <div className={CommonStyles.itemsContainer}>
                    {client.categories.cache.map((category, id) => {
                        if(category.name.toLowerCase().includes(search.toLowerCase())) {
                            return (
                                <CategoryAdminCard key={id} category={category} />
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}