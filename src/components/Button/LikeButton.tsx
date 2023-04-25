import { useState } from 'react';
import { Resource } from 'rr-apilib';
import { BsHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs"

import LikeButtonStyles from '../../styles/Components/Button/LikeButtonStyles.module.css';

interface Props {
    resource: Resource;
	setResource: React.Dispatch<React.SetStateAction<Resource>>;
}

/**
 * Global bc each render
 * status always = true
 */
let waitStatus = true;

export default function LikeButton({ resource, setResource }: Props) {

    const [ isLike, setIsLike] = useState(resource.isLiked);

    async function likeClickHandle(resource: Resource, setResource: React.Dispatch<React.SetStateAction<Resource>>) {
        try {
            if (resource.client.auth.me) { 
                const newResource = resource.isLiked ? await resource.unlike() : await resource.like();
                if(newResource) {
                    setResource(newResource);
                    setIsLike(newResource.isLiked);
                }
            }
            else {
               alert("Vous devez être connecté pour aimer une ressource");
            }
        } catch(error) {
            alert("Problème lors du like");
        }
    }

    const onPress = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		
		e.preventDefault();

		if(waitStatus) {
			waitStatus = false;
			setTimeout(() => waitStatus = true, 1e3);
			await likeClickHandle(resource, setResource);
		}
	}

    return (
        <div className={LikeButtonStyles.container}>
			<p className={LikeButtonStyles.numberLike}>
                {resource.likes.cache.size.toString()}
            </p>
			<div className={LikeButtonStyles.likeBtn} onClick={onPress} >
				{ isLike ? <BsHandThumbsUpFill color='#363e3e'/> : <BsHandThumbsUp color='#363e3e'/> } 
			</div>
		</div>
    )
}