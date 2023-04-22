import { useState } from "react";
import SearchBarStyles from "../../styles/Components/Input/SearchBarStyles.module.css";

interface Props {
    value?: string;
    onChangeSearch: (text: string) => void;
}

export default function SearchBar({ value, onChangeSearch }: Props) {
    
    const [message, setMessage] = useState(value || '');

    const onChangeSearchEvent = (event: any) => {
        setMessage(event.target.value);
        onChangeSearch(event.target.value);
    };
    
    return (
        <div className={SearchBarStyles.inputBackground}>
            <input
                type="text"
                value={message}
                className={SearchBarStyles.inputComponent}
                placeholder="Rechercher"
                onChange={onChangeSearchEvent}
            />
        </div>
    )
}