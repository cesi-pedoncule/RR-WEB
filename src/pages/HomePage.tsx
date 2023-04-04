import { useEffect, useState } from "react";
import { Client, Resource } from "rr-apilib";

import HomeStyles from "../styles/Page/HomePageStyles.module.css";


interface Props {
    client: Client;
}

export default function HomePage ({ client }: Props) {

    const [resources, setResources] = useState<Resource[]>([]);

    const fetchResources = async () => {
        setResources(await client.resources.fetchAll());
    }

    useEffect(() => {
        fetchResources();
    }, [client])


    return (
        <div>
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