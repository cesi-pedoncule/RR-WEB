import { Client } from "rr-apilib";
import CommonStyles from "../styles/CommonStyles.module.css";

interface Props {
    client: Client;
}

export default function CreateResourcePage ({ client }: Props) {
    return (
        <div className={CommonStyles.container}>
            <div className={CommonStyles.content}>
                <h1>CreateResourcePage</h1>
                <div className={CommonStyles.itemsContainer}>
                    
                </div>
            </div>
        </div>
    )
}