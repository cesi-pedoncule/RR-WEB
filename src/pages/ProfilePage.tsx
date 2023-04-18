import { Client } from "rr-apilib";
import CommonStyles from "../styles/CommonStyles.module.css";
import ProfileStyles from "../styles/Page/ProfilePageStyles.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    client: Client;
}

export default function ProfilePage ({ client }: Props) {
    
    const navigate = useNavigate();

    const user = client.auth.me;

    useEffect(() => {
        if (user == null) {
            navigate('/');
        }
    })

    const userProfileName = user?.name + ' ' + user?.firstname;
    
    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <div className={CommonStyles.itemsContainer}>
                    <h1>ProfilePage</h1>
                    <header className={ProfileStyles.profileTitle}>{userProfileName}</header>
                    <div className={ProfileStyles.profileContainer}>
                        <p className={ProfileStyles.profileSubTitle}>{user?.resources.cache.size} enregistrement(s)</p>
                        <p className={ProfileStyles.profileTitle}>Statistiques</p>
                    </div>
                </div>
            </div>
        </div>
    )
}