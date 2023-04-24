import { useEffect, useState } from "react";
import { Client } from "rr-apilib";
import { useNavigate } from "react-router";
import CommonStyles from "../styles/CommonStyles.module.css";
import SearchBar from "../components/Input/SearchBar";
import ResourceCardWithoutUser from "../components/Card/ResourceCardWithoutUser";
import ErrorModal from "../components/Modal/ErrorModal";

interface Props {
    client: Client;
}

export default function ShareResourcePage ({ client }: Props) {

    const navigate = useNavigate();

    const [ search, setSearch ] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        if(client.auth.me === null) {
            navigate('/login');
        }
    })

    return (
        <div className={CommonStyles.container}>
            {
                client.auth.me !== null && 
                <div className={CommonStyles.content}>
                    
                    <h1 className={CommonStyles.title}>Mes ressources</h1>
                    
                    <SearchBar value={search} onChangeSearch={(text) => setSearch(text)} />

                    <button onClick={() => navigate('/resources/create')}>Créer</button>
                    
                    <div className={CommonStyles.itemsContainer}>
                        {
                            client.auth.me.resources.cache.map((resource, id) => {
                                if(resource.title.toLowerCase().includes(search.toLowerCase())) {
                                    return (
                                        <ResourceCardWithoutUser key={id} resource={resource} setIsOpenModal={setIsOpenModal} />
                                    )
                                }
                            })
                        }
                    </div>
                    {isOpenModal && <ErrorModal setIsOpenModal={setIsOpenModal} message="Erreur lors de la suppression" />}
                </div>
            }
        </div>
    )
}