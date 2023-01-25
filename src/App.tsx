import React from 'react';
import { Client } from 'rr-apilib';

const client = new Client();

export default function App() {

    console.log(client)
    
    return (
        <div className="App">
            {client.resources.cache.map((r, i) => (
                <div key={i}>{r.title}</div>
            ))}
        </div>
    );
}