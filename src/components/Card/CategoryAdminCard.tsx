import { Category } from 'rr-apilib';
import { useNavigate } from 'react-router-dom';

import CategoryCardStyles from "../../styles/Components/Card/CategoryCardStyles.module.css";

interface Props {
    category: Category;
}

export default function CategoryAdminCard({ category }: Props) {
    
    const navigate = useNavigate();

    const handleOnPress = () => {
        navigate(`/admin/categories/${category.id}`);
    }
    
    return (
        <div className={CategoryCardStyles.cardAdminBackground} onClick={handleOnPress}>
            <h2 className={CategoryCardStyles.cardAdminTitle}>{category.name}</h2>  
            <p className={CategoryCardStyles.cardAdminText}>{`${category.resources.cache.size.toString()} Ressource(s)`}</p>
        </div>
    )
}