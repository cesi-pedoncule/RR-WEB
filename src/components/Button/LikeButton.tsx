import { Resource } from 'rr-apilib';
import LikeButtonStyles from '../../styles/Components/Button/LikeButtonStyles.module.css';
import { BsHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs"

interface Props {
    resource: Resource;
}

export default function LikeButton ({ resource }: Props) {
    
    const onPress = () => {

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