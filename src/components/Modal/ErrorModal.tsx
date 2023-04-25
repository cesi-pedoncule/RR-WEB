import { useEffect } from 'react';
import ErrorModalStyles from '../../styles/Components/Modal/ErrorModalStyles.module.css';
import { BsExclamationCircle } from "react-icons/bs"

interface Props {
    message: string;
    setIsOpenModal: any;
}

export default function ErrorModal ({ message, setIsOpenModal }: Props) {
    
    const onClick = () => {
        setIsOpenModal(false);
	}

    useEffect(() => {
        setTimeout(() => {
            setIsOpenModal(false);
        }, 3000);
    }); 
    
    return (
        <span className={ErrorModalStyles.container}>
            <BsExclamationCircle color='#363e3e'/>
            <p className={ErrorModalStyles.message}>{message}</p>
            <button className={ErrorModalStyles.button} onClick={onClick}>OK</button>
        </span>
    )
}