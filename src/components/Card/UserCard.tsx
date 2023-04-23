import { User } from 'rr-apilib';
import CategoryCardStyles from "../../styles/Components/Card/CategoryCardStyles.module.css";
import { useNavigate } from 'react-router-dom';

interface Props {
    user: User;
}

export default function UserCard({ user }:Props) {
    
    const navigate = useNavigate();

    const handleOnPress = () => {
        navigate(`/admin/users/${user.id}`);
    }
    
    return (
        <div className={CategoryCardStyles.cardBackground} onClick={handleOnPress}>
            <h2 className={CategoryCardStyles.cardTitle}>{user.name} {user.firstname}</h2>
            <p className={CategoryCardStyles.cardText}>{user.resources.cache.size.toString() + " Ressource(s)"}</p>
        </div>
    )
}