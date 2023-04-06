import { useEffect, useState } from "react";
import { Client, Resource } from "rr-apilib";

import CommonStyles from "../styles/CommonStyles.module.css";

interface Props {
    client: Client;
}

export default function ShareResourcePage ({ client }: Props) {

    const [resources, setResources] = useState<Resource[]>([]);

    const fetchUserResources = async () => {
        // setResources(client.auth.user.resources);
    }

    useEffect(() => {
        fetchUserResources();
    }, [])

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <div className={CommonStyles.itemsContainer}>
                    <h1>ShareResourcePage</h1>
                </div>
            </div>
        </div>
    )
}