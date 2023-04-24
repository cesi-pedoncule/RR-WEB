import { useEffect, useState } from "react";
import { Client } from "rr-apilib";

import CommonStyles from "../../styles/CommonStyles.module.css";
import SearchBar from "../../components/Input/SearchBar";
import { Link, useNavigate } from "react-router-dom";

interface Props {
    client: Client;
}

export default function AdminUsersPage ({ client }: Props) {

    const navigate = useNavigate();

    const [ search, setSearch ] = useState('');

    useEffect(() => {
        if(client.auth.me === null || !client.auth.me.isModerator) {
            navigate('/login');
        }
    }, [client, navigate])

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                
                <h1 className={CommonStyles.title}>Administration</h1>
                
                <SearchBar value={search} onChangeSearch={(text) => setSearch(text)} />
                
                <div className={CommonStyles.itemsContainer}>
                    {
                        client.auth.me?.isSuperAdmin && (
                            <div>
                                <Link to="/admin/users">Utilisateurs</Link>
                            </div>
                        )
                    }
                    {
                        client.auth.me?.isModerator && (
                            <div>
                                <Link to="/admin/validations">Validation de ressources</Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}