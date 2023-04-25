import { Client, UserBuilder } from "rr-apilib";
import CommonStyles from "../styles/CommonStyles.module.css";
import LoginStyles from "../styles/Page/LoginPageStyles.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

interface Props {
    client: Client;
}

export default function LoginPage ({ client }: Props) {
    const navigate = useNavigate();

    const [ newUser ] = useState<UserBuilder>(new UserBuilder());
    //login
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    //Register
    const [ passwordConfirm, setPasswordConfirm ] = useState<string>("");
    const [ isValidName, setIsValidName] = useState<boolean>(true)
    const [ isValidFirstname, setIsValidFirstname] = useState<boolean>(true)
    const [ isValidEmail, setIsValidEmail] = useState<boolean>(true)
    const [ isValidPassword, setIsValidPassword] = useState<boolean>(true)
    const [ isValidPasswordConfirm, setIsValidPasswordConfirm] = useState<boolean>(true)
    
    //login
    const onclickLoginButton = async () => {
        setIsLoading(true);

        try {
            await client.login(email, password);
            localStorage.setItem('token', client.auth.token + '');
            localStorage.setItem('refresh_token', client.auth.refresh_token + '');

            navigate("/resources");

        } catch (error) {
            alert('Mauvais identifiants');
        }
        setIsLoading(false);
    }

    const onClickRegisterButton = async () => {
        if(!validateEmail(newUser.email) || !validatePassword(newUser.password) || newUser.password !== passwordConfirm || newUser.firstname.length === 0 || newUser.name.length === 0){
            alert("Données saisies invalides");
        } else {
            try {
                setIsLoading(true);
                await client.users.create(newUser);
                await client.login(newUser.email, newUser.password);
                setIsLoading(false);
                navigate("/resources");
            } catch (error) {
                alert("Problème lors de l'inscription");
            }
        }
    }

    //Register
    const validateEmail = (email:string) => {
        const regex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    };

    const validatePassword = (password:string) => {
        return /[A-Z]/.test(password) && /[0-9]/.test(password) && /[A-Za-z0-9]{7,13}$/.test(password);
    };

    const onBlurEmail = () => {
        !validateEmail(newUser.email) && 
        alert('Email invalide');
        setIsValidEmail(validateEmail(newUser.email) )
    }

    const onBlurPassword = () => {
        !validatePassword(newUser.password) &&
        alert('Mot de passe invalide');
        setIsValidPassword(validatePassword(newUser.password))
    }

    const onBlurPasswordConfirm = () => {
        newUser.password !== passwordConfirm &&
        alert('Mot de passe différent');
        setIsValidPasswordConfirm(newUser.password === passwordConfirm)
    }

    const onBlurFirstName = () => {
        newUser.firstname.length === 0 &&
        alert('Prénom invalide');
        setIsValidFirstname(newUser.firstname.length !== 0);
    }

    const onBlurName = () => {
        newUser.name.length === 0 &&
        alert('Nom invalide');
        setIsValidName(newUser.name.length !== 0)
    }

    useEffect(() => {
        checkIsAuth();
    }, []);

    const checkIsAuth = async () => {
        
        if (client.auth.me != null) {
            navigate("/resources");
        } else {
            // Check if token is in storage
            const token = localStorage.getItem('token');
            const refresh_token = localStorage.getItem('refresh_token');

            if (token !== null && refresh_token !== null) {

                // Set token and refresh token
                client.auth.token = token;
                client.auth.refresh_token = refresh_token;

                // Try to refresh token
                try {
                    await client.auth.refresh();
                    // navigation.navigate('');
                } catch (error) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh_token');

                    client.refresh();
                }
            } 

            setIsLoading(false);
        }
    }

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>  
                
                {
                    isLoading ? 
                    <div className={CommonStyles.loader}>
                        <TailSpin height="80" width="80" color="#03989E" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="" visible={true}/>
                    </div> : 
                    <div className={LoginStyles.formContainer}>
                        <div className={LoginStyles.form}>
                            <header className={LoginStyles.header}>Connexion</header>
                            <form className={LoginStyles.container} onSubmit={onclickLoginButton}>
                                <div className={LoginStyles.control}>
                                    <label className={LoginStyles.label} htmlFor="email">Email</label>
                                    <input className={LoginStyles.input} type="email" id="email" name="email" onChange={(text) => setEmail(text.target.value)}/>
                                </div>
                                <div className={LoginStyles.control}>
                                    <label className={LoginStyles.label}htmlFor="mdp">Mot de passe</label>
                                    <input className={LoginStyles.input} type="password" id="mdp" name="mdp" onChange={(text) => setPassword(text.target.value)}/>
                                </div>
                                <div className={LoginStyles.control}>
                                    <input className={CommonStyles.button} type="submit" id="login" name="login" />
                                </div>
                            </form>
                        </div>

                        <div className={LoginStyles.form}>
                            <header className={LoginStyles.header}>Inscription</header>
                            
                            <form className={LoginStyles.container} onSubmit={onClickRegisterButton}>
                                <div className={LoginStyles.control}>
                                    <label className={LoginStyles.label} htmlFor="lastName-register">Nom</label>
                                    <input className={isValidName ? LoginStyles.input : LoginStyles.inputPasContent} type="text" id="lastName-register" name="lastName-register" onChange={(text) => newUser.setName(text.target.value)} onBlur={onBlurName}  required/>
                                </div>
                                <div className={LoginStyles.control}>
                                    <label className={LoginStyles.label} htmlFor="firstName-register">Prénom</label>
                                    <input className={isValidFirstname ? LoginStyles.input : LoginStyles.inputPasContent} type="text" id="firstName-register" name="firstName-register" onChange={(text) => newUser.setFirstname(text.target.value)} onBlur={onBlurFirstName} required/>
                                </div>
                                <div className={LoginStyles.control}>
                                    <label className={LoginStyles.label} htmlFor="email-register">Email</label>
                                    <input className={isValidEmail ? LoginStyles.input : LoginStyles.inputPasContent} type="email" id="email-register" name="email-register" onChange={(text) => newUser.setEmail(text.target.value)} onBlur={onBlurEmail} required/>
                                </div>
                                <div className={LoginStyles.control}>
                                    <label className={LoginStyles.label} htmlFor="mdp-register">Mot de passe</label>
                                    <input className={isValidPassword ? LoginStyles.input : LoginStyles.inputPasContent} type="password" id="mdp-register" name="mdp-register" onChange={(text) => newUser.setPassword(text.target.value)} onBlur={onBlurPassword} required/>
                                </div>
                                <div className={LoginStyles.control}>
                                    <label className={LoginStyles.label} htmlFor="mdp-confirm-register">Confirmer mot de passe</label>
                                    <input className={isValidPasswordConfirm ? LoginStyles.input : LoginStyles.inputPasContent} type="password" id="mdp-confirm-register" name="mdp-confirm-register" onChange={(text) => setPasswordConfirm(text.target.value)} onBlur={onBlurPasswordConfirm} required/>
                                </div>
                                <p className={LoginStyles.rulesText}>
                                    Minimum 1 majuscule <br/>
                                    Minimum 1 chiffre<br/>
                                    Entre 7-13 caractères
                                </p>
                                <div className={LoginStyles.control}>
                                    <input className={LoginStyles.button} type="submit" id="login-register" name="login-register" onClick={onClickRegisterButton} required/>
                                </div>
                            </form>
                            
                        </div>

                    </div>
                }

            </div>
        </div>
    )
    
}