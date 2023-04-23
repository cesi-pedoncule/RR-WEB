import React, { useState } from 'react'
import InputTextCommentStyles from '../../styles/Components/Input/InputTextCommentStyles.module.css'
import { Comment, CommentBuilder, Resource } from 'rr-apilib';
import { BsSend } from "react-icons/bs"

interface Props {
    resource: Resource;
    setComments: any;
}

export default function InputTextComment({resource, setComments}:Props) {
    
    const [inputText, setInputText] = useState('');
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const onChangeTextEvent = (event: any) => {
        setInputText(event.target.value);
    };

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
                // La zone de texte est vide
            }
        } catch(error) {
            // Problème lors de l'ajout d'un commentaire
        }

        setInputText('');
        setIsLoading(false);
    }

    return (
        <div className={InputTextCommentStyles.txtFieldBackground}>
            <input className={InputTextCommentStyles.txtFieldInput} value={inputText} onChange={onChangeTextEvent}/>
            <div className={InputTextCommentStyles.buttonContainer} onClick={onClickAddComment}>
                <BsSend />
            </div>
        </div>
    )
}