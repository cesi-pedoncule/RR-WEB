import { useState } from "react";
import SearchBarStyles from "../../styles/Components/Input/SearchBarStyles.module.css";

interface Props {
    onChangeSearch: (text: string) => void;
}

export default function SearchBar ({onChangeSearch}: Props) {
    
    const [message, setMessage] = useState('');

    const onChangeSearchEvent = (event: any) => {
        setMessage(event.target.value);
        onChangeSearch(message);
    };
    
    return (
        <div className={SearchBarStyles.inputBackground}>
            <input type="text" className={SearchBarStyles.inputComponent} placeholder="Rechercher" onChange={onChangeSearchEvent} />
        </div>
    )
}