import { Category, Resource } from 'rr-apilib';

import CategoryCardStyles from "../../styles/Components/Card/CategoryCardStyles.module.css";
import { useNavigate } from 'react-router-dom';

interface Props {
    category: Category;
    resources:  Resource[]
}

export default function CategoryCard({ category, resources }:Props) {
    
    const navigate = useNavigate();

    const handleOnPress = () => {

        if (category.resources.cache.size === 0) {
            alert("Cette catégorie ne contient aucune ressource.")
        } else {
            navigate('/category-detail', { state: { id: category.id } })
        }
    }
    
    return (
        <div className={CategoryCardStyles.cardBackground} onClick={handleOnPress}>
            <h2 className={CategoryCardStyles.cardTitle}>{category.name}</h2>
            <p className={CategoryCardStyles.cardText}>{category.resources.cache.size.toString() + " Ressource(s)"}</p>
        </div>
    )
}