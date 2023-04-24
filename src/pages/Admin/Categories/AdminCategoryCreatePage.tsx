import { useState } from 'react'
import { CategoryBuilder, Client } from "rr-apilib";
import { useNavigate } from 'react-router-dom';
import Switch from "react-switch";
import CommonStyles from "../../../styles/CommonStyles.module.css";
import AdminCategoryCreatePageStyles from "../../../styles/Page/Admin/Category/AdminCategoryCreatePageStyles.module.css";

interface Props {
    client: Client;
}

export default function AdminCategoryCreatePage({ client }: Props) {

    const navigate = useNavigate();
    const [ data, setData ] = useState<CategoryBuilder>(new CategoryBuilder());

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <div className={AdminCategoryCreatePageStyles.container}>
                    <input
                        className={AdminCategoryCreatePageStyles.addNameCategory}
                        type="text"
                        value={data.name}
                        placeholder='Titre de la catégorie'
                        onChange={(v) => {
                            data.setName(v.target.value);
                            setData(new CategoryBuilder(data));
                        }}
                    />

                    <div className={AdminCategoryCreatePageStyles.switchContainer}>
                        <Switch
                            onChange={() => {
                                data.setIsVisible(!data.isVisible);
                                setData(new CategoryBuilder(data));
                            }}
                            onColor='#03989E'
                            checked={data.isVisible}
                        />
                        <p className={CommonStyles.switchText}>Visible / Invisible</p>
                    </div>
                    <div className={AdminCategoryCreatePageStyles.sendButtonContainer}>
                        <button
                            onClick={async () => {
                                const cat = await client.categories.create(data);
                                navigate(`/admin/categories/${cat.id}`);
                            }}
                            className={AdminCategoryCreatePageStyles.sendButton}
                        >
                            Enregistrer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}