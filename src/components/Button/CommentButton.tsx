import CommentButtonStyles from "../../styles/Components/Button/CommentButtonStyles.module.css";
import { BsChat } from "react-icons/bs"

interface Props {
	commentNumber: number;
}

export default function CommentButton({ commentNumber }: Props) {
    return (
        <div className={CommentButtonStyles.container}>
            <p className={CommentButtonStyles.numberComment}>{commentNumber.toString()}</p>
            <BsChat className={CommentButtonStyles.commentBtn} />
        </div>
    )
}