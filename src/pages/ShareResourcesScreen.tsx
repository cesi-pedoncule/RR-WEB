import { useEffect, useState } from "react";
import { Client, Resource } from "rr-apilib";

import CommonStyles from "../Styles/CommonStyles.module.css";

interface Props {
    client: Client;
}

export default function ShareResourceScreen ({ client }: Props) {

    const [resources, setResources] = useState<Resource[]>([]);

    const fetchUserResources = async () => {
        // setResources(client.auth.user.resources);
    }

    useEffect(() => {
        fetchUserResources();
    }, [])

    return (
        <div>
            <h1>Share Resource</h1>
        </div>
    )
}