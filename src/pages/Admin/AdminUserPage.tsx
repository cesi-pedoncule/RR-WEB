import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Client, User } from "rr-apilib";
import CommonStyles from "../../styles/CommonStyles.module.css";
import AdminUserPageStyles from "../../styles/Page/Admin/AdminUserPageStyles.module.css";
import SearchBar from "../../components/Input/SearchBar";
import ResourceCardWithUser from "../../components/Card/ResourceCardWithUser";
import { BsPencilSquare } from "react-icons/bs";

interface Props {
    client: Client;
}

export default function AdminUserPage ({ client }: Props) {

    const navigate = useNavigate();
    const { id } = useParams();

    const [ user, setUser ] = useState<User>();
    const [ search, setSearch ] = useState('');

    const handleClickEditUser = () => {
        navigate('/admin/users/' + id + '/edit');
    }

    useEffect(() => {
        if(client.auth.me === null || !client.auth.me.isSuperAdmin) {
            navigate('/login');
        }
        
        if(id) {
            setUser(client.users.cache.get(id));
        }
    }, [client.auth.me, client.users.cache, id, navigate]);

    if(!user) {
        navigate('/404');
        return (
            <div>{"Cet utilisateur n'existe pas"}</div>
        )
    }

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                
                <div className={AdminUserPageStyles.horizontalContainer} onClick={handleClickEditUser}>
                    <h3 className={AdminUserPageStyles.title}>{user.name} {user.firstname}</h3>
                    <BsPencilSquare  className={AdminUserPageStyles.editIcon} color='#363e3e' size={34} />
                </div>
                
                <SearchBar value={search} onChangeSearch={(text) => setSearch(text)} />
                
                <div className={CommonStyles.itemsContainer}>
                    {
                        user.resources.cache.map((resource, id) => {
                            if(resource.title.toLowerCase().includes(search.toLowerCase())) {
                                return (
                                    <ResourceCardWithUser key={id} resourceData={resource} />
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}