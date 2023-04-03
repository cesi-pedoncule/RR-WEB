import { Link } from "react-router-dom";
import CommonStyles from "../Styles/CommonStyles.module.css";
import LoginStyles from "../Styles/Page/LoginPageStyles.module.css";

export default function LoginPage () {

    return (
        <div>
            

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


            <div className={CommonStyles.container}>
            
            <div className={CommonStyles.content}>
                <div className={CommonStyles.itemsContainer}>
                    <header>Inscription</header>
                    <div>
                        <div className={LoginStyles.loginContainer}>
                            <form>
                                <label htmlFor="nom">Nom</label>
                                <input type="text" id="nom" name="nom" required/>
                                <label htmlFor="prenom">Prenom</label>
                                <input type="text" id="prenom" name="prenom" required/>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required/>
                                <label htmlFor="mdp">Mot de passe</label>
                                <input type="password" id="mdp" name="mdp" required/>
                                <label htmlFor="mdpConfirm">Confirmer Mot de passe</label>
                                <input type="password" id="mdpConfirm" name="mdpConfirm" required/>
                                <input className={LoginStyles.loginButton} type="submit" id="login" name="login" required/>
                            </form>
                        </div>
                        <div className={LoginStyles.registerContainer}>
                            <p>Déjà un compte ?</p>
                            <Link to="/">Connectez-vous maintenant</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
    )
    
}