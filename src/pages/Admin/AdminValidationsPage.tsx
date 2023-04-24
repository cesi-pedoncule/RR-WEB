import { useEffect, useState } from "react";
import { APIValidationState, Client } from "rr-apilib";

import CommonStyles from "../../styles/CommonStyles.module.css";
import SearchBar from "../../components/Input/SearchBar";
import { useNavigate } from "react-router-dom";
import ResourceCardWithoutUser from "../../components/Card/ResourceCardWithoutUser";
import ErrorModal from "../../components/Modal/ErrorModal";

interface Props {
    client: Client;
}

export default function AdminValidationsPage ({ client }: Props) {

    const navigate = useNavigate();

    const [ search, setSearch ] = useState('');
    const [ isOpenModal, setIsOpenModal ] = useState(false);

    useEffect(() => {
        if(client.auth.me === null || !client.auth.me.isModerator) {
            navigate('/login');
        }
    }, [client, navigate])

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                
                <h1 className={CommonStyles.title}>Ressources à valider</h1>
                
                <SearchBar value={search} onChangeSearch={(text) => setSearch(text)} />
                
                <div className={CommonStyles.itemsContainer}>
                    {client.resources.cache.map((resource, id) => {
                        if ((resource.validations.getLastValidationState()?.state === APIValidationState.Pending || !resource.validations.getLastValidationState()) && 
                            resource.title.toLowerCase().includes(search.toLowerCase())) 
                        {
                            return (
                                <ResourceCardWithoutUser key={id} resource={resource} setIsOpenModal={setIsOpenModal} moderation={true} />
                            )
                        }
                    })}
                </div>
                {isOpenModal && <ErrorModal setIsOpenModal={setIsOpenModal} message="Erreur lors de la suppression" />}
            </div>
        </div>
    )
}