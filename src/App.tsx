import React, { useEffect, useState } from 'react';
import { Client, Resource } from 'rr-apilib';

export default function App() {

    const [client, setClient] = useState(new Client());
    const [ressources, setRessources] = useState<Resource[]>([]);

    async function getRessources() {
        return (await client.resources.fetchAll()).map(r => r);
    }

    useEffect(() => {
        // console.log("client change")

        getRessources()
            .then(res => setRessources(res))

    }, [client])
    
    return (
        <div className="App">
            {ressources.map((r, i) => {
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
    );
}