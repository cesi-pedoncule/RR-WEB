import { Client } from "rr-apilib";
import { useParams } from "react-router-dom";
import CommonStyles from "../../styles/CommonStyles.module.css";
import UserDetailStyles from "../../styles/Page/UserDetailStyles.module.css";
import StatDashBoard from "../../components/StatDashBoard";
import ResourceCardWithUser from "../../components/Card/ResourceCardWithUser";
import UserFollowCard from "../../components/Card/UserFollowCard";

interface Props {
    client: Client;
}

export default function UserDetailPage ({ client }: Props) {
    
    const {id} = useParams();
    const user = id && client.users.cache.get(id);
    
    return (
        <div className={CommonStyles.container}>
            {
                user && 
                <div className={CommonStyles.content}>
                    <h1 className={CommonStyles.title}>{`${user.firstname} ${user.name}`}</h1>
                    <div className={UserDetailStyles.itemsContainer}>
                        <div className={UserDetailStyles.statContainer}>
                            <p className={UserDetailStyles.profileSubTitle}>{user.resources.cache.size} enregistrement(s)</p>
                            <p className={UserDetailStyles.profileTitle}>Statistiques</p>
                            <StatDashBoard user={user}/>
                            <div className={UserDetailStyles.followersContainer}>
                                {user.followers.cache.size !== 0 && <div className={UserDetailStyles.title}>Personnes follow ({user.followers.cache.size})</div>}
                                <div className={UserDetailStyles.wrapperContainer}>
                                    {
                                        Array.from(user.followers.cache.values()).map((user) => 
                                            <UserFollowCard user={user.user}/>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={UserDetailStyles.resourcesContainer}>
                            {user.likedResources.size !== 0 && <div className={UserDetailStyles.title}>Ressource(s) aimée(s) ({user.likedResources.size})</div>}
                            {
                                user.likedResources.map((resource) => 
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