import { Client } from "rr-apilib";
import CommonStyles from "../styles/CommonStyles.module.css";

interface Props {
    client: Client;
}

export default function ResourceDetailPage ({ client }: Props) {
    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <div className={CommonStyles.itemsContainer}>
                    <h1>ResourceDetailPage</h1>
                </div>
            </div>
        </div>
    )
}