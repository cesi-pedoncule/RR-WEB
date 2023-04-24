import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Client, User } from "rr-apilib";
import CommonStyles from "../../styles/CommonStyles.module.css";
import SearchBar from "../../components/Input/SearchBar";
import ResourceCardWithUser from "../../components/Card/ResourceCardWithUser";

interface Props {
    client: Client;
}

export default function AdminUserPage ({ client }: Props) {

    const navigate = useNavigate();
    const { id } = useParams();

    const [ user, setUser ] = useState<User>();
    const [ search, setSearch ] = useState('');

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
                
                <h1 className={CommonStyles.title}>{user.name} {user.firstname}</h1>
                
                <SearchBar value={search} onChangeSearch={(text) => setSearch(text)} />
                <div className={CommonStyles.buttonContainer}>
                    <button className={CommonStyles.buttonEdit} onClick={() => navigate('/resources/create')}>Modifier l'utilisateur</button>
                </div>
                <h3 className={CommonStyles.title}>Resources</h3>
                <div className={CommonStyles.itemsContainer2}>
                    {
                        user.resources.cache.map((resource, id) => {
                            if(resource.title.toLowerCase().includes(search.toLowerCase())) {
                                return (
                                    <ResourceCardWithUser key={id} resource={resource} />
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}