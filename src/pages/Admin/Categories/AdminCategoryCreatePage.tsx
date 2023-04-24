import { useState } from 'react'
import { CategoryBuilder, Client } from "rr-apilib";
import { useNavigate, useParams } from 'react-router-dom';
import Switch from "react-switch";

import CommonStyles from "../../../styles/CommonStyles.module.css";
import CategoryCardStyles from "../../../styles/Components/Card/CategoryCardStyles.module.css";
import EditButton from '../../../components/Button/EditButton';

interface Props {
    client: Client;
}

export default function AdminCategoryCreatePage({ client }: Props) {

    const navigate = useNavigate();
    const [ data, setData ] = useState<CategoryBuilder>(new CategoryBuilder());

    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>

                <div className={CategoryCardStyles.container}>
                    <input
                        className={CategoryCardStyles.nameInput}
                        type="text"
                        value={data.name}
                        onChange={(v) => {
                            data.setName(v.target.value);
                            setData(new CategoryBuilder(data));
                        }}
                    />

                    <div className={CategoryCardStyles.switchInput}>
                        <Switch
                            onChange={() => {
                                data.setIsVisible(!data.isVisible);
                                setData(new CategoryBuilder(data));
                            }}
                            checked={data.isVisible}
                        />
                        <p>{`Visible / Invisible`}</p>
                    </div>

                    <div className={CategoryCardStyles.cardAdminButtonContainer}>
                        <EditButton 
                            callBack={async () => {
                                const cat = await client.categories.create(data);
                                navigate(`/admin/categories/${cat.id}`);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}