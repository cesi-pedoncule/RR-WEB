import Select from 'react-select';
import { Category, Client } from 'rr-apilib';

interface Props {
    value: Category[];
    client: Client;
    onChange: (value: Category[]) => void
}

export default function SelectCategories({ client, value, onChange }: Props) {

    const opt = client.categories.cache.map(cat => {
        return {
            value: cat.id,
            label: cat.name
        }
    });

    return (
        <Select
            placeholder="Sélectionner des catégories"
            isMulti={true}
            defaultValue={value.map(v => {
                return {
                    value: v.id,
                    label: v.name
                }
            })}
            onChange={(v) => {
                const result = v.map(c => client.categories.cache.get(c.value)!);
                onChange(result);
            }}
            options={opt}
        />
    )
}
