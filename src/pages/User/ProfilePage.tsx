import { Client } from "rr-apilib";
import { useNavigate } from "react-router-dom";
import CommonStyles from "../../styles/CommonStyles.module.css";
import ProfileStyles from "../../styles/Page/ProfilePageStyles.module.css";
import { useEffect } from "react";
import StatDashBoard from "../../components/StatDashBoard";
import ResourceCardWithUser from "../../components/Card/ResourceCardWithUser";
import UserFollowCard from "../../components/Card/UserFollowCard";

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
                    <div className={ProfileStyles.itemsContainer}>
                        <div className={ProfileStyles.statContainer}>
                            <p className={ProfileStyles.profileSubTitle}>{me.resources.cache.size} enregistrement(s)</p>
                            <p className={ProfileStyles.profileTitle}>Statistiques</p>
                            <StatDashBoard user={me}/>
                            <div className={ProfileStyles.followersContainer}>
                                {me.followers.cache.size !== 0 && <div className={ProfileStyles.title}>Personnes follow ({me.followers.cache.size})</div>}
                                <div className={ProfileStyles.wrapperContainer}>
                                    {
                                        Array.from(me.followers.cache.values()).map((user) => 
                                            <UserFollowCard user={user.user}/>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={ProfileStyles.resourcesContainer}>
                            {me.likedResources.size !== 0 && <div className={ProfileStyles.title}>Ressource(s) aimée(s) ({me.likedResources.size})</div>}
                            {
                                me.likedResources.map((resource) => 
                                    <ResourceCardWithUser resourceData={resource}/>
                                )
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}