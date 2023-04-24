import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Client, User } from "rr-apilib";
import CommonStyles from "../../styles/CommonStyles.module.css";

interface Props {
    client: Client;
}

export default function AdminEditUserPage({ client }: Props) {
    
    const navigate = useNavigate();
    const { id } = useParams();

    const [ user, setUser ] = useState<User>();

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
            </div>
        </div>
    )
}