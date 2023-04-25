import { useEffect } from "react";
import { Client } from "rr-apilib";
import CommonStyles from "../../styles/CommonStyles.module.css";
import { Link, useNavigate } from "react-router-dom";

interface Props {
    client: Client;
}

export default function AdminUsersPage ({ client }: Props) {
    const navigate = useNavigate();

    useEffect(() => {
        if(client.auth.me === null || !client.auth.me.isModerator) {
            navigate('/login');
        }
    }, [client, navigate])

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <h1 className={CommonStyles.title}>Administration</h1>
                <div className={CommonStyles.itemsContainer}>
                    <div className={CommonStyles.buttonDiv}>
                        {
                            client.auth.me?.isSuperAdmin && (
                                <Link to="/admin/users" className={CommonStyles.button}>Utilisateurs</Link>
                            )
                        }
                        {
                            client.auth.me?.isAdmin && (
                                <Link to="/admin/categories" className={CommonStyles.button}>Catégories</Link>
                            )
                        }
                        {
                            client.auth.me?.isModerator && (
                                <Link to="/admin/validations" className={CommonStyles.button}>Validation de ressources</Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}