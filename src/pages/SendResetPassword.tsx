import { Client } from "rr-apilib";
import ErrorModal from "../components/Modal/ErrorModal";
import CommonStyles from "../styles/CommonStyles.module.css";
import { useState } from "react";
import SendResetPasswordStyles from "../styles/Page/SendResetPasswordStyles.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
    client: Client;
}

export default function SendResetPassword({ client }: Props) {

    const navigate = useNavigate();

    const [ isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [ messageModal, setMessageModal] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const [ isNotValidEmail, setIsNotValidEmail] = useState<boolean>(false)

    const onclickSendMail = async () => {
        if(!isNotValidEmail && email !== "") {
            try {
                await client.auth.sendResetPasswordMail(email);
                navigate("/Login");
            } catch (error) {
                setMessageModal("Une erreur s'est produite");
                setIsOpenModal(true);
                console.log(error)
            }
        } else {
            setMessageModal("Veuiller entrer un mail valide");
            setIsOpenModal(true);
            setIsNotValidEmail(true);
        }
    }

    const validateEmail = (email:string) => {
        const regex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    };

    const onBlurEmail = () => {
        setIsNotValidEmail(!validateEmail(email));
        setIsOpenModal(!validateEmail(email));
        setMessageModal('Email invalide');
    }

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>  
                {isOpenModal && <ErrorModal setIsOpenModal={setIsOpenModal} message={messageModal} />}
                {
                    <div className={SendResetPasswordStyles.formContainer}>
                        <div className={SendResetPasswordStyles.form}>
                            <header className={SendResetPasswordStyles.header}>Rénitialisation du mot de passe</header>
                            <form className={SendResetPasswordStyles.container}>
                                <div className={SendResetPasswordStyles.control}>
                                    <label className={SendResetPasswordStyles.label} htmlFor="email">Email</label>
                                    <input className={isNotValidEmail ? SendResetPasswordStyles.inputPasContent : SendResetPasswordStyles.input} type="email" id="email" name="email" onChange={(text) => setEmail(text.target.value)} onBlur={onBlurEmail}/>
                                </div>
                                <div className={SendResetPasswordStyles.control}>
                                    <input className={CommonStyles.button} type="button" value="Envoyer ma demande" id="sendMail" name="sendMail" onClick={onclickSendMail} />
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}