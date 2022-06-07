import classes from './ProfileInfo.module.scss'
import backgroundProfile from '../../../assets/backgroundProfile.png'
import {useEffect, useState} from "react";

const {profileInfoContainer, backgroundImg, avaImg} = classes

const ProfileInfo = (props: any) => {
    const [editMode, toggleEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)


    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const onSetStatus = () => {
        toggleEditMode(!editMode)
        props.setMyStatus(status)
    }

    const onChangeStatus = () => {
        toggleEditMode(!editMode)
    }

    return (
        <div className={profileInfoContainer}>
            <img className={backgroundImg} src={backgroundProfile} alt=""/>
            <div>
                <img className={avaImg} src={props.profile.photos.large} alt=''/>
                <div>
                    <div>{props.profile.fullName}</div>
                    <div>{props.profile.aboutMe}</div>
                    <div>{props.profile.contacts.vk}</div>
                    <div>{props.profile.contacts.github}</div>
                    <div>
                        {editMode
                            ? <input autoFocus={true} onBlur={onSetStatus} value={status}
                                     onChange={(e) => {setStatus(e.target.value)}}/>
                            : <div onDoubleClick={onChangeStatus}>{props.status || 'Tap to Change Status'}</div>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfileInfo
