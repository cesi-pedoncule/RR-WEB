import { Category } from "rr-apilib";
import { useNavigate } from 'react-router-dom';
import CategoryButtonStyles from "../../styles/Components/Button/CategoryButtonStyles.module.css";

interface Props {
    category: Category;
}

export default function CategoryButton({category} : Props) {
    const navigate = useNavigate();

    const callBack = () => {
        if (category.resources.cache.size === 0) {
            alert("Cette catégorie ne contient aucune ressource.")
        } else {
            navigate('/category-detail', { state: { id: category.id } })
        }
    }

    return (
        <div onClick={callBack} className={CategoryButtonStyles.btnBackground}>
            <p className={CategoryButtonStyles.btnText}>{category.name}</p>
        </div>
    )
}