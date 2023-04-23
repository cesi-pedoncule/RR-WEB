import { useEffect, useState } from "react";
import { Client } from "rr-apilib";

import CommonStyles from "../../styles/CommonStyles.module.css";
import SearchBar from "../../components/Input/SearchBar";
import UserCard from "../../components/Card/UserCard";
import { useNavigate } from "react-router-dom";

interface Props {
    client: Client;
}

export default function AdminUsersPage ({ client }: Props) {

    const navigate = useNavigate();

    const [ search, setSearch ] = useState('');

    useEffect(() => {
        // TODO : Check if the user is granted role admin
        // TODO : Fix this user login check
        // if(client.auth.me === null) {
        //     navigate('/login');
        // }
    })

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                
                <h1 className={CommonStyles.title}>Les utilisateurs</h1>
                
                <SearchBar value={search} onChangeSearch={(text) => setSearch(text)} />
                
                <div className={CommonStyles.itemsContainer}>
                    {client.users.cache.map((user, id) => {
                        if(`${user.name} ${user.firstname}`.toLowerCase().includes(search.toLowerCase())) {
                            return (
                                <UserCard key={id} user={user} />
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}