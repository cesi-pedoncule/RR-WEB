import { useEffect, useState } from "react";
import CommonStyles from "../Styles/CommonStyles.module.css";
import { Client, Resource } from "rr-apilib";

interface Props {
    client: Client;
}

export default function ResourcesPage ({ client }: Props) {
    
    const [resources, setResources] = useState<Resource[]>([]);

    const fetchResources = async () => {
        setResources(await client.resources.fetchAll());
    }

    useEffect(() => {
        fetchResources();
    }, [client])
    
    return (
        <div>
            <h1>Resources</h1>
            {resources.map((r, i) => {
                return (
                    <div key={i}>
                        <h5>{r.title}</h5>
                        {r.description && (
                            <p>{r.description}</p>
                        )}
                    </div>
                )
            }
            )}
        </div>
    )
}