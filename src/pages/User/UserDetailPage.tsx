import { Client } from "rr-apilib";
import { useNavigate, useParams } from "react-router-dom";
import CommonStyles from "../../styles/CommonStyles.module.css";
import UserDetailStyles from "../../styles/Page/UserDetailStyles.module.css";
import StatDashBoard from "../../components/StatDashBoard";
import ResourceCardWithUser from "../../components/Card/ResourceCardWithUser";
import UserFollowCard from "../../components/Card/UserFollowCard";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import ErrorModal from "../../components/Modal/ErrorModal";

interface Props {
    client: Client;
}

export default function UserDetailPage ({ client }: Props) {
    
    const navigate = useNavigate();

    const {id} = useParams();
    const user = id && client.users.cache.get(id);
    const secondColumnFollowersStart = user ? Math.floor(user?.followers.cache.size / 2) : 0;
    const secondColumnFollowsStart = user ? Math.floor(user?.follows.size / 2) : 0;
    
    const [ isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [ messageModal, setMessageModal] = useState<string>('');
    const [ isFollow, setIsFollow ] = useState<boolean>(false);


    const onClikFollowUser = async () => {
        try {
            user && await user.follow();
            setIsFollow(true);
        } catch (error) {
            setMessageModal("Une erreur s'est produite");
            setIsOpenModal(true);
        }
    };

    const onClikUnFollowUser = async () => {
        try {
            user && await user.unfollow();
            setIsFollow(false);
        } catch (error) {
            setMessageModal("Une erreur s'est produite");
            setIsOpenModal(true);
        }
    };

    useEffect(() => {
         if(user && user.myFollow){
            setIsFollow(true);
         } else {
            setIsFollow(false);
         }
    }, [client.me, navigate, user]);

    return (
        <div className={CommonStyles.container}>
            {
                user && 
                <div className={CommonStyles.content}>
                    {isOpenModal && <ErrorModal setIsOpenModal={setIsOpenModal} message={messageModal} />}
                    <div className={UserDetailStyles.lineTitleLikeContainer}>
                        <h1 className={CommonStyles.title}>{`${user.firstname} ${user.name}`}</h1>
                        <div className={UserDetailStyles.likeButtonContainer}>
                            {
                                isFollow ?
                                <AiFillHeart size={30} color='#363e3e' onClick={onClikUnFollowUser}/>
                                :
                                <AiOutlineHeart size={30} color='#363e3e' onClick={onClikFollowUser}/>
                            }
                        </div>
                    </div>
                    <div className={UserDetailStyles.itemsContainer}>
                        <div className={UserDetailStyles.statContainer}>
                            <p className={UserDetailStyles.profileSubTitle}>{user.resources.cache.size} enregistrement(s)</p>
                            <p className={UserDetailStyles.profileTitle}>Statistiques</p>
                            <StatDashBoard user={user}/>
                            {
                                user.follows.size !== 0 &&
                                <div>
                                    <div className={UserDetailStyles.title}>Personnes suivi ({user.follows.size})</div>
                                    <div className={UserDetailStyles.wrapperContainer}>
                                        <div>
                                            {
                                                Array.from(user.follows.values()).slice(0, secondColumnFollowsStart).map((user, id) => 
                                                    <UserFollowCard key={id} user={user.user}/>
                                                )
                                            }
                                        </div>
                                        <div>
                                            {
                                                Array.from(user.follows.values()).slice(secondColumnFollowsStart).map((user, id) => 
                                                    <UserFollowCard key={id} user={user.user}/>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                            {   
                                user.followers.cache.size !== 0 &&
                                <div>
                                    <div className={UserDetailStyles.title}>Personnes qui le/la suive ({user.followers.cache.size})</div>
                                    <div className={UserDetailStyles.wrapperContainer}>
                                        <div>
                                            {
                                                Array.from(user.followers.cache.values()).slice(0, secondColumnFollowersStart).map((user, id) => 
                                                    <UserFollowCard key={id} user={user.user}/>
                                                )
                                            }
                                        </div>
                                        <div>
                                            {
                                                Array.from(user.followers.cache.values()).slice(secondColumnFollowersStart).map((user, id) => 
                                                    <UserFollowCard key={id} user={user.user}/>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={UserDetailStyles.resourcesContainer}>
                            {user.likedResources.size !== 0 && <div className={UserDetailStyles.title}>Ressource(s) aimée(s) ({user.likedResources.size})</div>}
                            {
                                user.likedResources.map((resource, id) => 
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