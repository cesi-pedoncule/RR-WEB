import { useEffect, useState } from "react";
import CommonStyles from "../styles/CommonStyles.module.css";
import { Client, Resource } from "rr-apilib";
import SearchBar from "../components/Input/SearchBar";

interface Props {
    client: Client;
}

export default function ResourcesPage ({ client }: Props) {
    
    const [resources, setResources] = useState<Resource[]>([]);

    const handleChangeSearch = (text: string) => {
        
    }
    
    const fetchResources = async () => {
        setResources(Array.from((await client.resources.fetchAll()).values()));
    }

    useEffect(() => {
        fetchResources();
    }, [client])
    
    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <h1>ResourcesPage</h1>
                <SearchBar onChangeSearch={handleChangeSearch} />
                <div className={CommonStyles.itemsContainer}>
                    {resources.map((r, i) => {
                        return (
                            <div key={i}>
                                <h5>{r.title}</h5>
                                {r.description && (
                                    <p>{r.description}</p>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}