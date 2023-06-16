import CommonStyles from "../styles/CommonStyles.module.css";

export default function ProfilePage () {
    
    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <h1 className={CommonStyles.textEmptyResult}>Erreur 404: Cette page n'existe pas !</h1>
            </div>
        </div>
    )
}