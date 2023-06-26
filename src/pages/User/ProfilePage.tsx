import { Client, User } from "rr-apilib";
import { useNavigate } from "react-router-dom";
import CommonStyles from "../../styles/CommonStyles.module.css";
import ProfileStyles from "../../styles/Page/ProfilePageStyles.module.css";
import { useEffect, useState } from "react";
import StatDashBoard from "../../components/StatDashBoard";
import ResourceCardWithUser from "../../components/Card/ResourceCardWithUser";
import UserFollowCard from "../../components/Card/UserFollowCard";

interface Props {
    client: Client;
}

export default function ProfilePage ({ client }: Props) {
    
    const navigate = useNavigate();
    const me = client.auth.me;
    const secondColumnFollowersStart = me ? Math.floor(me?.followers.cache.size / 2) : 0;
    const secondColumnFollowsStart = me ? Math.floor(me?.follows.size / 2) : 0;
    
    const [ followersUser, setFollowersUser ] = useState<User[] | null>([]);

    useEffect(() => {
        if(me === null) {
            navigate('/login');
        }
        if(me) {
            const refreshFollowers: User[] = [];
            me.followers.cache.map((userFollower) =>
                userFollower.follower && refreshFollowers.push(userFollower.follower)
            )
            setFollowersUser([...refreshFollowers]);
        }
    }, [me, navigate]);
    
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
                            {
                                me.follows.size !== 0 &&
                                <div>
                                    <div className={ProfileStyles.title}>Personnes suivi ({me.follows.size})</div>
                                    <div className={ProfileStyles.wrapperContainer}>
                                        <div>
                                            {
                                                Array.from(me.follows.values()).slice(0, secondColumnFollowsStart).map((user, id) => 
                                                    <UserFollowCard key={id} user={user.user}/>
                                                )
                                            }
                                        </div>
                                        <div>
                                            {
                                                Array.from(me.follows.values()).slice(secondColumnFollowsStart).map((user, id) => 
                                                    <UserFollowCard key={id} user={user.user}/>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                followersUser && followersUser.length !== 0 &&
                                <div>   
                                    <div className={ProfileStyles.title}>Personnes qui nous suive ({followersUser.length})</div>
                                    <div className={ProfileStyles.wrapperContainer}>
                                        <div>
                                            {
                                                followersUser.slice(0, secondColumnFollowersStart).map((user, id) => 
                                                    <UserFollowCard key={id} user={user}/>
                                                )
                                            }
                                        </div>
                                        <div>
                                            {
                                                followersUser.slice(secondColumnFollowersStart).map((user, id) => 
                                                    <UserFollowCard key={id} user={user}/>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={ProfileStyles.resourcesContainer}>
                            {me.likedResources.size !== 0 && <div className={ProfileStyles.title}>Ressource(s) aimée(s) ({me.likedResources.size})</div>}
                            {
                                me.likedResources.map((resource, id) => 
                                    <ResourceCardWithUser key={id} resourceData={resource}/>
                                )
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}