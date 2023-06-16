import { Client } from "rr-apilib";
import ErrorModal from "../components/Modal/ErrorModal";
import CommonStyles from "../styles/CommonStyles.module.css";
import { useState } from "react";
import ResetPassWordStyles from "../styles/Page/ResetPasswordStyles.module.css";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
    client: Client;
}

export default function ResetPassword({ client }: Props) {

    const navigate = useNavigate();
    const {token} = useParams();

    const [ isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [ messageModal, setMessageModal] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ isNotValidPassword, setIsNotValidPassword] = useState<boolean>(false)

    const onclickSendMail = async () => {
        if(!isNotValidPassword && password !== "") {
            try {
                token && await client.auth.resetPassword(token, password);
                navigate("/Login");
            } catch (error) {
                setMessageModal("Une erreur s'est produite");
                setIsOpenModal(true);
                console.log(error)
            }
        } else {
            setMessageModal("Veuiller entrer un mot de passe valide");
            setIsOpenModal(true);
            setIsNotValidPassword(true);
        }
    }

    const validatePassword = (password:string) => {
        return /[A-Z]/.test(password) && /[0-9]/.test(password) && /[A-Za-z0-9]{7,13}$/.test(password);
    };

    const onBlurPassword = () => {
        setIsNotValidPassword(!validatePassword(password));
        setIsOpenModal(!validatePassword(password));
        setMessageModal('Mot de passe invalide');
    }

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>  
                {isOpenModal && <ErrorModal setIsOpenModal={setIsOpenModal} message={messageModal} />}
                {
                    <div className={ResetPassWordStyles.formContainer}>
                        <div className={ResetPassWordStyles.form}>
                            <header className={ResetPassWordStyles.header}>Rénitialisation du mot de passe</header>
                            <form className={ResetPassWordStyles.container}>
                                <div className={ResetPassWordStyles.control}>
                                    <label className={ResetPassWordStyles.label} htmlFor="mdp-register">Mot de passe</label>
                                    <input className={isNotValidPassword ? ResetPassWordStyles.inputPasContent : ResetPassWordStyles.input} type="password" id="mdp-register" name="mdp-register" onChange={(text) => setPassword(text.target.value)} onBlur={onBlurPassword} required/>
                                    <p className={ResetPassWordStyles.rulesText}>
                                        Minimum 1 majuscule <br/>
                                        Minimum 1 chiffre<br/>
                                        Entre 7-13 caractères
                                    </p>
                                </div>
                                <div className={ResetPassWordStyles.buttonContainer}>
                                    <input className={CommonStyles.button} type="button" value="Rénitialiser le mot de passe" id="sendMail" name="sendMail" onClick={onclickSendMail} />
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}