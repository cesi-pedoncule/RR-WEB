import Select from 'react-select';
import { Category, Client } from 'rr-apilib';

import SelectCategoriesStyles from '../../styles/Components/Input/SelectCategoriesStyles.module.css';

interface Props {
    value: Category[];
    client: Client;
    onChange: (value: Category[]) => void
}

export default function SelectCategories({ client, value, onChange }: Props) {

    const opt = client.categories.cache.filter((category) => category.isVisible).map(cat => {
        return {
            value: cat.id,
            label: cat.name
        }
    });

    return (
        <Select
            value={value.map(v => {
                return {
                    value: v.id,
                    label: v.name
                }
            })}
            onChange={(v) => {
                const result = v.map(c => client.categories.cache.get(c.value)!);
                onChange(result);
            }}
            isMulti={true}
            options={opt}
            className={SelectCategoriesStyles.select}
            placeholder="Sélectionner des catégories"
            theme={(theme) => ({
                ...theme,
                borderRadius: 20,
                colors: {
                ...theme.colors,
                  text: '#363e3e',
                  primary25: '#03989E',
                  primary: '#03989E',
                  neutral0: '#eaf0f0',
                  neutral10: '#cad5d5',
                  neutral30: '#03989E',
                  neutral40: '#363e3e',
                  neutral80: '#363e3e',
                },
            })}
        />
    )
}
