import { useEffect, useState } from "react";
import { Client, Resource } from "rr-apilib";

import CommonStyles from "../styles/CommonStyles.module.css";
import SearchBar from "../components/Input/SearchBar";

interface Props {
    client: Client;
}

export default function ShareResourcePage ({ client }: Props) {

    const [resources, setResources] = useState<Resource[]>([]);

    const handleChangeSearch = (text: string) => {
        
    }

    const fetchUserResources = async () => {
        // setResources(client.auth.user.resources);
    }

    useEffect(() => {
        fetchUserResources();
    }, [])

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <h1>ShareResourcePage</h1>
                <SearchBar onChangeSearch={handleChangeSearch} />
                <div className={CommonStyles.itemsContainer}>

                </div>
            </div>
        </div>
    )
}