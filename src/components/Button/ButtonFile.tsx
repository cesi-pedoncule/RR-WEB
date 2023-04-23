import React from 'react'
import ButtonFileStyles from '../../styles/Components/Button/ButtonFileStyles.module.css'
import { BsArrowDown } from "react-icons/bs"

interface Props {
    text: string;
    callBack: () => void;
}

export default function ButtonFile({ text, callBack } : Props) {
    return (
        <div className={ButtonFileStyles.buttonFileContainer} onClick={callBack}>
            <p className={ButtonFileStyles.text}>{text}</p>
            <BsArrowDown />
        </div>
    )
}