import React, { useEffect, useState } from 'react';
import { Client, Resource } from 'rr-apilib';

export default function App() {

    const [client, setClient] = useState(new Client());
    const [resources, setResources] = useState<Resource[]>([]);

    async function getResources() {
        return (await client.resources.fetchAll()).map(r => r);
    }

    useEffect(() => {
        // console.log("client change")

        getResources()
            .then(res => setResources(res))

    }, [client])
    
    return (
        <div className="App">
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
    );
}