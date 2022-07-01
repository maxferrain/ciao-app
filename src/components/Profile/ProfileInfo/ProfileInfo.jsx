import classes from './ProfileInfo.module.scss'
import backgroundProfile from '../../../assets/backgroundProfile.png'
import {useEffect, useState} from "react";
import defaultImage from '../../../assets/userDefault.png'
import ProfileDataForm from "./ProfileDataForm";
import cn from "classnames";
import Avatar from 'react-avatar-edit'


const {
    profileInfoContainer,
    userBackground,
    userImage,
    fullName,
    imageBlock,
    editProfileInfoButton,
    edit,
    imageNameBlock,
    profileStatus,
    uploader
} = classes


const ProfileInfo = (props) => {
    const [editMode, toggleEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)
    const [profileInfoEditMode, toggleProfileInfoEditMode] = useState(false)


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

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    const onFormSubmit = (profileFormData) => {
        props.saveProfile(profileFormData)
        toggleProfileInfoEditMode(false)
    }

    return (
        <div>
            <div className={profileInfoContainer}>
                <img className={userBackground} src={backgroundProfile} alt=""/>

                <div className={imageBlock}>
                    <div className={imageNameBlock}>
                        <img className={userImage} src={props.profile.photos.large || defaultImage} alt=''/>
                        <div className={fullName}>
                            <h2>{props.profile.fullName}</h2>
                            {editMode
                                ? <input autoFocus={true} onBlur={onSetStatus} value={status}
                                         onChange={(e) => {
                                             setStatus(e.target.value)
                                         }}/>
                                : <span onDoubleClick={onChangeStatus}>{props.status || 'Tap to Change Status'}</span>
                            }
                        </div>
                    </div>
                    {props.isOwner && !profileInfoEditMode &&
                        <button className={cn(editProfileInfoButton, edit)}
                                onClick={() => toggleProfileInfoEditMode(true)}>Edit Profile</button>}
                </div>

                {props.isOwner && <input type='file' onChange={onMainPhotoSelected}/>}

                <Avatar
                    width={390}
                    height={295}
                    // onCrop={this.onCrop}
                    // onClose={this.onClose}
                    src={props.profile.photos.large || defaultImage}
                />
            </div>


            <div className={profileInfoContainer}>
                {profileInfoEditMode
                    ? <ProfileDataForm profile={props.profile} onFormSubmit={onFormSubmit}/>
                    : <ProfileData isOwner={props.isOwner} profile={props.profile}
                                   toggleProfileInfoEditMode={toggleProfileInfoEditMode}/>}
            </div>
        </div>
    )
}


const ProfileData = ({profile, toggleProfileInfoEditMode, isOwner}) => {

    return (
        <div>

            <div>{profile.aboutMe}</div>
            <div>Looking For A Job: {profile.lookingForAJob ? 'Yes' : 'No'}</div>
            {profile.lookingForAJob &&
                <div>Future Job Description: {profile.lookingForAJobDescription}</div>}

            <div><p>Contacts</p>
                {Object.keys(profile.contacts)
                    .map((c, ind) => profile.contacts[c] && <div key={c}>{c}: {profile.contacts[c]}</div>)}
            </div>
        </div>
    )
}

export default ProfileInfo
