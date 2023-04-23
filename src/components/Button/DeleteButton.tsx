import DeleteButtonStyles from "../../styles/Components/Button/DeleteButtonStyles.module.css";
import { BsTrash } from "react-icons/bs"

interface Props {
	callBack: () => void;
}

export default function DeleteButton({ callBack }: Props) {
    return (
        <div className={DeleteButtonStyles.buttonContainer} onClick={callBack}>
            <BsTrash color='#363e3e' />
        </div>
    )
}