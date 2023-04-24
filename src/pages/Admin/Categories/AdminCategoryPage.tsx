import { useState, useEffect } from 'react'
import { Category, CategoryBuilder, Client } from "rr-apilib";
import { useNavigate, useParams } from 'react-router-dom';
import Switch from "react-switch";
import CommonStyles from "../../../styles/CommonStyles.module.css";
import CategoryCardStyles from "../../../styles/Components/Card/CategoryCardStyles.module.css";
import EditButton from '../../../components/Button/EditButton';
import DeleteButton from '../../../components/Button/DeleteButton';
import AdminCategoryPageStyles from "../../../styles/Page/Admin/Category/AdminCategoryPageStyles.module.css";

interface Props {
    client: Client;
}

export default function AdminCategoryPage({ client }: Props) {

    const { id } = useParams();
    const navigate = useNavigate()
    
    const [ category, setCategory ] = useState<Category>();
    const [ data, setData ] = useState<CategoryBuilder>(new CategoryBuilder());

    useEffect(() => {
        if(id) {
            const category = client.categories.cache.get(id);
            if(category) {
                setCategory(category);
                setData(new CategoryBuilder(category));
            }
        }
    }, [id]);

    if(!category || !data) {
        return (
            <div>{`Cette catégorie n'existe plus`}</div>
        )
    }

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>

                <div className={AdminCategoryPageStyles.container}>
                    <input
                        className={AdminCategoryPageStyles.setNameCategory}
                        type="text"
                        value={data.name}
                        onChange={(v) => {
                            data.setName(v.target.value);
                            setData(new CategoryBuilder(data));
                        }}
                    />

                    <div className={AdminCategoryPageStyles.switchContainer}>
                        <Switch
                            onChange={() => {
                                data.setIsVisible(!data.isVisible);
                                setData(new CategoryBuilder(data));
                            }}
                            checked={data.isVisible}
                        />
                        <p>{`Visible / Invisible (Cette catégorie contient ${category.resources.cache.size} ressources)`}</p>
                    </div>

                    <div className={AdminCategoryPageStyles.validationsContainer}>
                        <button
                            onClick={async () => {
                                category.name = data.name;
                                category.isVisible = data.isVisible;
                                await client.categories.edit(category);
                            }}
                            className={CommonStyles.button}
                        >Modifier</button>
                        <button
                            onClick={async () => {
                                await client.categories.delete(category);
                                navigate('/admin/categories');
                            }}
                            className={CommonStyles.button}
                        >Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    )
}