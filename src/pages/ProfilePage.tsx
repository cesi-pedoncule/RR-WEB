import { Client } from "rr-apilib";
import { useNavigate } from "react-router-dom";

import CommonStyles from "../styles/CommonStyles.module.css";
import ProfileStyles from "../styles/Page/ProfilePageStyles.module.css";
import { useEffect } from "react";
import StatDashBoard from "../components/StatDashBoard";

interface Props {
    client: Client;
}

export default function ProfilePage ({ client }: Props) {
    
    const navigate = useNavigate();

    const me = client.auth.me;

    useEffect(() => {
        if(me === null) {
            navigate('/login');
        }
    })
    
    return (
        <div className={CommonStyles.container}>
            {
                me && 
                <div className={CommonStyles.content}>
                    <h1 className={CommonStyles.title}>{`${me.firstname} ${me.name}`}</h1>
                    <div className={ProfileStyles.container}>
                        <div className={ProfileStyles.profileContainer}>
                            <p className={ProfileStyles.profileSubTitle}>{me.resources.cache.size} enregistrement(s)</p>
                            <p className={ProfileStyles.profileTitle}>Statistiques</p>
                            <StatDashBoard user={me}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}