import { Link, useNavigate } from "react-router-dom";
import { BsBoxArrowInRight } from "react-icons/bs"
import navBar from "../styles/Components/NavBarStyles.module.css";
import { Client } from "rr-apilib";

interface Props {
    client: Client;
}

export default function Navbar({ client }: Props) {
    
    const navigate = useNavigate();

    const onClickDisconnect = async () => {
        client?.auth.logout();
        // Remove token and refresh token from storage
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        navigate('/');
    }

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
                <Link className={navBar.link} to={"/profile"}>
                    <img className={navBar.logo} src="../Profile.png" alt="Profil"/>
                    <p>Profil</p>
                </Link>
            </div>
            <div className={navBar.disconnectContainer} onClick={onClickDisconnect}>
                <BsBoxArrowInRight />
            </div>
        </div>
    )
}