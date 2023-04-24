import { ChangeEvent } from 'react';
import ButtonFileStyles from '../../styles/Components/Button/ButtonFileStyles.module.css'
import { BsArrowDown } from "react-icons/bs"

interface Props {
    callBack: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ButtonFile({ callBack } : Props) {
    return (
        <div className={ButtonFileStyles.buttonFileContainer}>
            <input type="file" className={ButtonFileStyles.text} onChange={callBack}/>
            <BsArrowDown />
        </div>
    )
}