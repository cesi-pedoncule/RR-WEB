import Select from 'react-select';
import { APIUserRole, APIUserRoleType } from 'rr-apilib';
import SelectRolesStyles from '../../styles/Components/Input/SelectRolesStyles.module.css';

interface Props {
    value: APIUserRoleType[];
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
