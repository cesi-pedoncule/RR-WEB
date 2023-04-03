import { Link } from "react-router-dom";
import CommonStyles from "../Styles/CommonStyles.module.css";
import LoginStyles from "../Styles/Page/LoginPageStyles.module.css";

export default function LoginPage () {

    return (
        <div className={CommonStyles.container}>
            
            <div className={CommonStyles.content}>
                <div className={LoginStyles.container}>
                    {
                        
                        <div>
                            <div className={CommonStyles.itemsContainer}>
                                <header>Connexion</header>
                                <div className={LoginStyles.loginContainer}>
                                    <form>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" name="email" required/>
                                        <label htmlFor="mdp">Mot de passe</label>
                                        <input type="password" id="mdp" name="mdp" required/>
                                        <input className={LoginStyles.loginButton} type="submit" id="login" name="login" required/>
                                    </form>
                                </div>
                                <div className={LoginStyles.registerContainer}>
                                    <p className={LoginStyles.text}>Pas de compte ?</p>
                                    <Link to="/">Inscrivez-vous maintenant</Link>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
    
}