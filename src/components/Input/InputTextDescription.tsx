import React from 'react'
import InputTextDescriptionStyles from '../../styles/Components/Input/InputTextDescriptionStyles.module.css'

interface Props {
    onChangeText: (text:string) => void;
    defaultValue: string | any;
}

export default function InputTextDescription({onChangeText, defaultValue} : Props) {
    
    const onChangeTextEvent = (event: any) => {
        onChangeText(event.target.value);
    };
    
    return (
        <textarea className={InputTextDescriptionStyles.container} placeholder={"Description de la ressource"} defaultValue={defaultValue} onChange={onChangeTextEvent}/>
    )
}