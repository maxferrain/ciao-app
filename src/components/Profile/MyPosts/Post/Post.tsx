import ava from '../../../../assets/profile-icon.png'
import classes from './Post.module.scss'
import {NavLink} from 'react-router-dom'
import {Icon} from '@iconify/react'
import {FC} from 'react'

type PropsType = {
    likesCount: number
    minutesAgoCreated: number
    postText: string
}

const Post = (props: PropsType) => {
    return (
        <div className={classes.container}>
            <div className={classes.postInfo}>
                <img src={ava} alt=""/>
                <div className={classes.postCreated}>
                    <NavLink to="/profile">Max Ferrain</NavLink>
                    <span>{props.minutesAgoCreated} min ago</span>
                </div>
            </div>
            <p>{props.postText}</p>
            <div className={classes.feedback}>
                <Icon icon="flat-color-icons:like" className={classes.likeImg}/>
                <span className={classes.likes}>{props.likesCount} Like</span>
            </div>
        </div>
    )
}

export default Post
