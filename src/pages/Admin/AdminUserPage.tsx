import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Client, User } from "rr-apilib";

import CommonStyles from "../../styles/CommonStyles.module.css";
import SearchBar from "../../components/Input/SearchBar";
import ResourceCardWithUser from "../../components/Card/ResourceCardWithUser";

interface Props {
    client: Client;
}

export default function AdminUserPage ({ client }: Props) {

    const { id } = useParams();

    const [ user, setUser ] = useState<User>();
    const [ search, setSearch ] = useState('');

    useEffect(() => {
        if(id) {
            setUser(client.users.cache.get(id));
        }
    }, [id]);

    if(!user) {
        return (
            <div>{"Cet utilisateur n'existe pas"}</div>
        )
    }

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                
                <h1>{user.name} {user.firstname}</h1>
                
                <SearchBar value={search} onChangeSearch={(text) => setSearch(text)} />
                
                <h3>Resources</h3>
                <div className={CommonStyles.itemsContainer}>
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