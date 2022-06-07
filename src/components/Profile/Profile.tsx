import MyPosts from './MyPosts/MyPosts'
import classes from './Profile.module.scss'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {Loader} from "../common/Loader/Loader";

const Profile = (props: any) => {
    // debugger
    return (
        <div> {
            !props.profile
                ? <Loader/>
                : <div>
                    <ProfileInfo profile={props.profile} status={props.status} setMyStatus={props.setMyStatus}/>
                    <MyPosts posts={props.posts} addPost={props.addPost}/>
                </div>
        }
        </div>
    )
}

export default Profile
