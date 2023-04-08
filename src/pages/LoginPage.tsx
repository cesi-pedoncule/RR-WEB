import { Client, UserBuilder } from "rr-apilib";
import CommonStyles from "../styles/CommonStyles.module.css";
import LoginStyles from "../styles/Page/LoginPageStyles.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-activity";

interface Props {
    client: Client;
}

export default function LoginPage ({ client }: Props) {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const [ newUser ] = useState<UserBuilder>(new UserBuilder());

    const onclickLoginButton = async () => {
        setIsLoading(true);

        try {
            await client.login('user0@example.com', 'password');
            localStorage.setItem('token', client.auth.token + '');
            localStorage.setItem('refresh_token', client.auth.refresh_token + '');

            navigate("/resources");

        } catch (error) {
            alert('Mauvais identifiants');
        }
        setIsLoading(false);
    }

    const onClickRegisterButton = async () => {
        try {
            setIsLoading(true);
            const user = await client.users.create(newUser);
            await client.login(newUser.email, newUser.password);
            setIsLoading(false);
        } catch (error) {
            alert("Problème lors de l'inscription");
        }

        navigate('/resources');
    }

    const checkIsAuth = async () => {
        
        if (client.auth.me != null) {
            navigate("/resources");
        } else {
            // Check if token is in storage
            const token = localStorage.getItem('token');
            const refresh_token = localStorage.getItem('refresh_token');

            if (token != null && refresh_token != null) {

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

    useEffect(() => {
        checkIsAuth();
    }, []);

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>  
                
                {
                    isLoading ? <Spinner className={LoginStyles.spinner} color="#03989E"/> : 
                    <div className={LoginStyles.formContainer}>

                        <div className={LoginStyles.form}>
                            <header className={LoginStyles.header}>Connexion</header>
                            <form className={LoginStyles.container} onSubmit={onclickLoginButton}>
                                <div className={LoginStyles.control}>
                                    <label className={LoginStyles.label} htmlFor="email">Email</label>
                                    <input className={LoginStyles.input} type="email" id="email" name="email" />
                                </div>
                                <div className={LoginStyles.control}>
                                    <label className={LoginStyles.label}htmlFor="mdp">Mot de passe</label>
                                    <input className={LoginStyles.input} type="password" id="mdp" name="mdp" />
                                </div>
                                <div className={LoginStyles.control}>
                                    <input className={LoginStyles.button} type="submit" id="login" name="login" />
                                </div>
                            </form>
                        </div>

                        <div className={LoginStyles.form}>
                            <header className={LoginStyles.header}>Inscription</header>
                            
                            <form className={LoginStyles.container} onSubmit={onClickRegisterButton}>
                                <div className={LoginStyles.control}>
                                    <label className={LoginStyles.label} htmlFor="lastName-register">Nom</label>
                                    <input className={LoginStyles.input} type="text" id="lastName-register" name="lastName-register" required/>
                                </div>
                                <div className={LoginStyles.control}>
                                    <label className={LoginStyles.label} htmlFor="firstName-register">Prénom</label>
                                    <input className={LoginStyles.input} type="text" id="firstName-register" name="firstName-register" required/>
                                </div>
                                <div className={LoginStyles.control}>
                                    <label className={LoginStyles.label} htmlFor="email-register">Email</label>
                                    <input className={LoginStyles.input} type="email" id="email-register" name="email-register" required/>
                                </div>
                                <div className={LoginStyles.control}>
                                    <label className={LoginStyles.label} htmlFor="mdp-register">Mot de passe</label>
                                    <input className={LoginStyles.input} type="password" id="mdp-register" name="mdp-register" required/>
                                </div>
                                <div className={LoginStyles.control}>
                                    <label className={LoginStyles.label} htmlFor="mdp-confirm-register">Confirmer mot de passe</label>
                                    <input className={LoginStyles.input} type="password" id="mdp-confirm-register" name="mdp-confirm-register" required/>
                                </div>
                                <div className={LoginStyles.control}>
                                    <input className={LoginStyles.button} type="submit" id="login-register" name="login-register" required/>
                                </div>
                            </form>
                            
                        </div>

                    </div>
                }

            </div>
        </div>
    )
    
}