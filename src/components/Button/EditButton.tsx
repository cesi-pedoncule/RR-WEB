import EditButtonStyles from "../../styles/Components/Button/EditButtonStyles.module.css";
import { BsPencilSquare } from "react-icons/bs"

interface Props {
	callBack: () => void;
}

export default function EditButton({ callBack }: Props) {
    return (
        <div className={EditButtonStyles.buttonContainer} onClick={callBack}>
            <BsPencilSquare />
        </div>
    )
}