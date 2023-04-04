import { Link } from "react-router-dom";
import CommonStyles from "../styles/CommonStyles.module.css";
import LoginStyles from "../styles/Page/LoginPageStyles.module.css";

export default function LoginPage () {

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <div className={LoginStyles.container}>
                    
                    <div className={LoginStyles.root}>

                        <div className={LoginStyles.itemsContainer}>
                            <header className={LoginStyles.loginHeader}>Connexion</header>
                            <form className={LoginStyles.loginContainer}>
                                <div className={LoginStyles.loginControl}>
                                    <label className={LoginStyles.loginLabel} htmlFor="email">Email</label>
                                    <input className={LoginStyles.loginInput} type="email" id="email" name="email" required/>
                                </div>
                                <div className={LoginStyles.loginControl}>
                                    <label className={LoginStyles.loginLabel}htmlFor="mdp">Mot de passe</label>
                                    <input className={LoginStyles.loginInput} type="password" id="mdp" name="mdp" required/>
                                </div>
                                <div className={LoginStyles.loginControl}>
                                    <input className={LoginStyles.loginButton} type="submit" id="login" name="login" required/>
                                </div>
                            </form>
                        </div>

                        <div className={LoginStyles.itemsContainer}>
                            <header className={LoginStyles.loginHeader}>Inscription</header>
                            <div>
                                <form className={LoginStyles.loginContainer}>
                                    <div className={LoginStyles.loginControl}>
                                        <label className={LoginStyles.loginLabel} htmlFor="lastName-register">Nom</label>
                                        <input className={LoginStyles.loginInput} type="text" id="lastName-register" name="lastName-register" required/>
                                    </div>
                                    <div className={LoginStyles.loginControl}>
                                        <label className={LoginStyles.loginLabel} htmlFor="firstName-register">Prénom</label>
                                        <input className={LoginStyles.loginInput} type="text" id="firstName-register" name="firstName-register" required/>
                                    </div>
                                    <div className={LoginStyles.loginControl}>
                                        <label className={LoginStyles.loginLabel} htmlFor="email-register">Email</label>
                                        <input className={LoginStyles.loginInput} type="email" id="email-register" name="email-register" required/>
                                    </div>
                                    <div className={LoginStyles.loginControl}>
                                        <label className={LoginStyles.loginLabel} htmlFor="mdp-register">Mot de passe</label>
                                        <input className={LoginStyles.loginInput} type="password" id="mdp-register" name="mdp-register" required/>
                                    </div>
                                    <div className={LoginStyles.loginControl}>
                                        <label className={LoginStyles.loginLabel} htmlFor="mdp-confirm-register">Confirmer mot de passe</label>
                                        <input className={LoginStyles.loginInput} type="password" id="mdp-confirm-register" name="mdp-confirm-register" required/>
                                    </div>
                                    <div className={LoginStyles.loginControl}>
                                        <input className={LoginStyles.loginButton} type="submit" id="login-register" name="login-register" required/>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>
        </div>
    )
    
}