import { Link } from "react-router-dom";

import navBar from "../styles/Components/NavBarStyles.module.css";

export default function Navbar() {
    
    return (
        <div className={navBar.root}>
            <div className={navBar.linkContainer}>
                <Link className={navBar.link} to={"/resources"}>
                    <img className={navBar.logo} src="../Ressources.png" alt="Ressources"/>
                    <p>Ressources</p>
                </Link>
                <Link className={navBar.link} to={"/categories"}>
                    <img className={navBar.logo} src="../Catalogue.png" alt="Catalogue"/>
                    <p>Catégories</p>
                </Link>
                <Link className={navBar.link} to={"/share"}>
                    <img className={navBar.logo} src="../Partage.png" alt="Partage"/>
                    <p>Partager</p>
                </Link>
                <Link className={navBar.link} to={"/"}>
                    <img className={navBar.logo} src="../Profile.png" alt="Profil"/>
                    <p>Profil</p>
                </Link>
            </div>
        </div>
    )
}