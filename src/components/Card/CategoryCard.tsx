import { Category } from 'rr-apilib';
import CategoryCardStyles from "../../styles/Components/Card/CategoryCardStyles.module.css";
import { useNavigate } from 'react-router-dom';

interface Props {
    category: Category;
}

export default function CategoryCard({ category }:Props) {
    
    const navigate = useNavigate();

    const handleOnPress = () => {

        if (category.resources.cache.size === 0) {
            alert("Cette catégorie ne contient aucune ressource.")
        } else {
            navigate(`/categories/${category.id}`);
        }
    }
    
    return (
        <div className={CategoryCardStyles.cardBackground} onClick={handleOnPress}>
            <h2 className={CategoryCardStyles.cardTitle}>{category.name}</h2>
            <p className={CategoryCardStyles.cardText}>{category.resources.cache.size.toString() + " Ressource(s)"}</p>
        </div>
    )
}