import { useState } from "react";
import { Comment, CommentBuilder, Resource } from "rr-apilib";
import InputTextCommentStyles from "../../styles/Components/Input/InputTextCommentStyles.module.css";
import { BiCommentAdd } from "react-icons/bi"

interface Props {
    resource: Resource;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export default function InputTextComment({resource, setComments}:Props) {
    const [ inputText, setInputText ] = useState('');
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const onClickAddComment = async () => {
        setIsLoading(true);

        try {
            if(inputText != ''){
                const builder = new CommentBuilder()
                    .setComment(inputText)
                    .setRessource(resource);

                const res = await resource.comments.create(builder);
                const comments = Array.from(res.comments.sort().values());

                setComments(comments);
            } else {
                alert("La zone de texte est vide");
            }
        } catch(error) {
            alert("Problème lors de l'ajout d'un commentaire");
        }

        setInputText('');
        setIsLoading(false);
    }

    const onChangeCommentEvent = (event: any) => {
        setInputText(event.target.value);
    };

    return (
        <div className={InputTextCommentStyles.txtFieldBackground}>
            <textarea
                value={inputText}
                className={InputTextCommentStyles.txtFieldInput}
                placeholder="Entrer un commentaire"
                onChange={onChangeCommentEvent}
            />
            <div onClick={onClickAddComment} className={InputTextCommentStyles.sendButtonInput}>
                <BiCommentAdd color="#363e3e" size={22}/>
            </div>
        </div>
    )
}