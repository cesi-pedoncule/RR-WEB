import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { APIUserRoleType, Client, User } from "rr-apilib";
import CommonStyles from "../../styles/CommonStyles.module.css";
import AdminEditUserPageStyles from "../../styles/Page/Admin/AdminEditUserPageStyles.module.css";
import SelectRoles from "../../components/Input/SelectRoles";

interface Props {
    client: Client;
}

export default function AdminEditUserPage({ client }: Props) {
    
    const navigate = useNavigate();
    const { id } = useParams();

    const [ user ] = useState<User|undefined>(client.users.cache.get(''+id));
    
    const [ name, setName ] = useState<string>('');
    const [ firstname, setFirstname ] = useState<string>('');
    const [ roles, setRoles ] = useState<APIUserRoleType[]>([]);

    const handleClickEditUser = async () => {
        if (user) {
            try {
                user.name = name;
                user.firstname = firstname;
                user.roles = roles;
    
                await client.users.edit(user);
    
                navigate(-1);
            } catch (error) {
                console.log("Problème lors de la modification de l'utilisateur");
            }
        }
    }


    useEffect(() => {
        if(client.auth.me === null || !client.auth.me.isSuperAdmin) {
            navigate('/login');
        }
        
        if(id && user && (name === user.name || name === '') && (firstname === user.firstname || firstname === '')) {
            setName(user ? user.name : '');
            setFirstname(user ? user.firstname : '');
            setRoles(user ? user.roles : []);
        }

    }, [client.auth.me, client.users.cache, id, navigate, name, firstname, user]);

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
                <div className={CommonStyles.itemsContainer}>
                    <div className={AdminEditUserPageStyles.container}>
                        <input className={AdminEditUserPageStyles.addName} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom" />
                        <input className={AdminEditUserPageStyles.addName} type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="Prénom" />
                        <SelectRoles value={roles} onChange={(v) => setRoles([...v])} />
                        <button onClick={handleClickEditUser} className={AdminEditUserPageStyles.submitButton}>Modifier</button>
                    </div>
                </div>
            </div>
        </div>
    )
}