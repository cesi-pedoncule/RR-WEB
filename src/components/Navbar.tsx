import { Link, useNavigate } from "react-router-dom";
import { BsBoxArrowInRight } from "react-icons/bs"
import { FiUsers } from "react-icons/fi"
import NavBarStyles from "../styles/Components/NavBarStyles.module.css";
import { APIUserRole, Client } from "rr-apilib";

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

    const onClickUsersButton = () => {
        navigate("/users")
    }

    return (
        <div className={NavBarStyles.root}>
            <div className={NavBarStyles.linkContainer}>
                <div className={NavBarStyles.usersButtonContainer} onClick={onClickUsersButton}>
                    <FiUsers size={25} color='#363e3e'/>
                </div>
                <Link className={NavBarStyles.link} to={"/resources"}>
                    <img className={NavBarStyles.logo} src="../Ressources.png" alt="Ressources"/>
                    <p>Ressources</p>
                </Link>
                <Link className={NavBarStyles.link} to={"/categories"}>
                    <img className={NavBarStyles.logo} src="../Catalogue.png" alt="Catalogue"/>
                    <p>Catégories</p>
                </Link>
                <Link className={NavBarStyles.link} to={"/share"}>
                    <img className={NavBarStyles.logo} src="../Partage.png" alt="Partage"/>
                    <p>Partager</p>
                </Link>
                <Link className={NavBarStyles.link} to={"/profile"}>
                    <img className={NavBarStyles.logo} src="../Profile.png" alt="Profil"/>
                    <p>Profil</p>
                </Link>
                {
                    client.auth.me && client.auth.me.roles.includes(APIUserRole.Admin) && 
                        <Link className={NavBarStyles.link} to={"/admin"}>
                            <img className={NavBarStyles.logo} src="../Admin.png" alt="Profil"/>
                            <p>Admin</p>
                        </Link>
                }
            </div>
            {
                client.auth.me !== null &&
                <div className={NavBarStyles.disconnectContainer} onClick={onClickDisconnect}>
                    <BsBoxArrowInRight size={25} color='#363e3e'/>
                </div>
            }
        </div>
    )
}