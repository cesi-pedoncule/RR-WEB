import { Client } from "rr-apilib";
import { useNavigate } from "react-router-dom";

import CommonStyles from "../styles/CommonStyles.module.css";
import ProfileStyles from "../styles/Page/ProfilePageStyles.module.css";
import { useEffect } from "react";

interface Props {
    client: Client;
}

export default function ProfilePage ({ client }: Props) {
    
    const navigate = useNavigate();
    const me = client.auth.me;

    const checkAuth = () => {
        if(client.auth.me === null) {
            navigate('/login');
            return <div></div>;
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);
    
    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <h1>Profil</h1>
                <div className={CommonStyles.itemsContainer}>
                    <h3 className={ProfileStyles.profileTitle}>{`${me?.firstname} ${me?.name}`}</h3>
                    <div className={ProfileStyles.profileContainer}>
                        <p className={ProfileStyles.profileSubTitle}>{me?.resources.cache.size} enregistrement(s)</p>
                        <p className={ProfileStyles.profileTitle}>Statistiques</p>
                    </div>
                </div>
            </div>
        </div>
    )
}