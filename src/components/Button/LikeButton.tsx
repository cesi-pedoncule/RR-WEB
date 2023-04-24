import { Resource } from 'rr-apilib';
import LikeButtonStyles from '../../styles/Components/Button/LikeButtonStyles.module.css';
import { BsHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs"
import { useEffect } from 'react';

interface Props {
    resource: Resource;
	setResource: (resource: Resource) => void;
}

export default function LikeButton ({ resource, setResource }: Props) {
    
    const onPress = async () => {
        if (resource.client.auth.me) { 
            const newResource = resource.isLiked ? await resource.unlike() : await resource.like();
            console.log(newResource)
			newResource && setResource(newResource);
			alert("Vous avez aimé une ressource")
        } else {
            alert("Vous devez être connecté pour aimer une ressource");
        }
	}

    return (
        <div className={LikeButtonStyles.container}>
			<p className={LikeButtonStyles.numberLike}>{resource.likes.cache.size.toString()}</p>
			<div className={LikeButtonStyles.likeBtn} onClick={onPress} >
				{ resource.isLiked ? <BsHandThumbsUpFill color='#363e3e'/> : <BsHandThumbsUp color='#363e3e'/> } 
			</div>
		</div>
    )
}