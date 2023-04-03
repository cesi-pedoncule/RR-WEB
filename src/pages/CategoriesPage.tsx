import { useEffect, useState } from "react";
import { Category, Client } from "rr-apilib";

interface Props {
    client: Client;
}

export default function CategoriesPage ({ client }: Props) {

    const [categories, setCategories] = useState<Category[]>([]);

    const fetchResources = async () => {
        setCategories(await client.categories.fetchAll());
    }

    useEffect(() => {
        fetchResources();
    }, [client])

    return (
        <div>
            <h1>Categories</h1>
            {categories.map((q, i) => {
                return (
                    <div key={i}>
                        <h5>{q.name}</h5>
                    </div>
                )
            }
            )}
        </div>
    )
}