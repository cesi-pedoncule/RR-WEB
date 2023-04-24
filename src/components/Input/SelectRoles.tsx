import Select from 'react-select';
import { APIUserRole } from 'rr-apilib';
import SelectRolesStyles from '../../styles/Components/Input/SelectRolesStyles.module.css';
import { useEffect } from 'react';

interface Props {
    value: APIUserRole[];
    onChange: (value: APIUserRole[]) => void
}

export default function SelectRoles({ value, onChange }: Props) {

    const roles = [
        APIUserRole.User,
        APIUserRole.Moderator,
        APIUserRole.Admin,
        APIUserRole.SuperAdmin
    ];

    return (
        <Select
            className={SelectRolesStyles.select}
            placeholder="Sélectionner des catégories"
            isMulti={true}
            value={value.map(v => { return { label: v, value: v } })}
            onChange={(v) => {
                const result = v.map(c => roles.find(r => r === c.value as APIUserRole)!);
                onChange(result);
            }}
            options={roles.map(r => { return { label: r, value: r } })}
        />
    )
}
