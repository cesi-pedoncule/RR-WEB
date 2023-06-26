import { useState } from "react";
import { Client } from "rr-apilib";
import CommonStyles from "../../styles/CommonStyles.module.css";
import SearchBar from "../../components/Input/SearchBar";
import UserFollowCard from "../../components/Card/UserFollowCard";

interface Props {
    client: Client;
}

export default function UsersPage ({ client }: Props) {

    const [ search, setSearch ] = useState('');

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                
                <h1 className={CommonStyles.title}>Les utilisateurs</h1>
                
                <SearchBar value={search} onChangeSearch={(text) => setSearch(text)} />
                
                <div className={CommonStyles.itemsContainer}>
                    {client.users.cache.map((user, id) => {
                        if(user.name.toLowerCase().includes(search.toLowerCase())) {
                            return (
                                <UserFollowCard key={id} user={user} />
                            )
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        </div>
    )
}