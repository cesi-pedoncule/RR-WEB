import { useEffect, useState } from "react";
import { APIUserRole, Client } from "rr-apilib";

import CommonStyles from "../../styles/CommonStyles.module.css";
import SearchBar from "../../components/Input/SearchBar";
import UserCard from "../../components/Card/UserCard";
import { Link, useNavigate } from "react-router-dom";

interface Props {
    client: Client;
}

export default function AdminUsersPage ({ client }: Props) {

    const navigate = useNavigate();

    const [ search, setSearch ] = useState('');

    useEffect(() => {
        if(client.auth.me === null || !client.auth.me.roles.includes(APIUserRole.Admin)) {
            navigate('/login');
        }
    }, [client])

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                
                <h1 className={CommonStyles.title}>Administration</h1>
                
                <SearchBar value={search} onChangeSearch={(text) => setSearch(text)} />
                
                <div className={CommonStyles.itemsContainer}>
                    <Link to="/admin/users">Utilisateurs</Link>
                </div>
            </div>
        </div>
    )
}