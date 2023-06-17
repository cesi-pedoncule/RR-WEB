import { User } from 'rr-apilib';
import UserFollowCardStyles from "../../styles/Components/Card/UserFollowCardStyles.module.css";
import { useNavigate } from 'react-router-dom';

interface Props {
    user: User | null;
}

export default function UserFollowCard({ user }:Props) {
    
    const navigate = useNavigate();

    const handleOnPress = () => {
        user && user.id === user.client.me?.id ?
        navigate("/profile")
        :
        navigate(`/user/${user?.id}`);
    }
    
    return (
        <div className={UserFollowCardStyles.cardBackground} onClick={handleOnPress}>
            <h2 className={UserFollowCardStyles.cardTitle}>{user?.name} {user?.firstname}</h2>
            <p className={UserFollowCardStyles.cardText}>{user?.followers.cache.size.toString() + " Follower(s)"}</p>
        </div>
    )
}