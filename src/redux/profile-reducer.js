import {profileAPI} from "../api/api";
import {AuthReducer} from "./auth-reducer";

const ADD_POST = 'PROFILE/ADD-POST'
const SET_PROFILE = 'PROFILE/SET-PROFILE'
const SET_STATUS = 'PROFILE/SET-STATUS'
const SET_PROFILE_PHOTO = 'PROFILE/SET_PROFILE_PHOTO'

const initialState = {
    posts: [
        {
            id: 1,
            likesCount: 121,
            minutesAgoCreated: 28,
            postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor'
        },
        {
            id: 2,
            likesCount: 45,
            minutesAgoCreated: 28,
            postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non'
        },
        {
            id: 3,
            likesCount: 58,
            minutesAgoCreated: 25,
            postText: 'Lorem ipsum dolor sit amet'
        },
        {
            id: 4,
            likesCount: 110,
            minutesAgoCreated: 22,
            postText: 'Lorem ipsum dolor sit am'
        }
    ],
    profile: null,
    status: ''
}

const ProfileReducer = (state = initialState, action) => {
    // debugger
    switch (action.type) {
        case  ADD_POST:
            return {
                ...state, posts: [
                    ...state.posts, {id: state.posts.length + 1, likesCount: 0, minutesAgoCreated: 0, postText: action.postText}],
                newPostText: ''
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_PROFILE_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.newPhotos}
            }
        default:
            return state
    }
}

export const addPost = (postText) => ({type: ADD_POST, postText})
export const setUserProfile = (profile) => ({type: SET_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
const savePhotoSuccess = (newPhotos) => ({type: SET_PROFILE_PHOTO, newPhotos})

export const getUserProfile = (profileId) => (dispatch)  =>{
    profileAPI.setProfile(profileId)
        .then(data => dispatch(setUserProfile(data)))
}

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => dispatch(setStatus(response.data)))
}

export const setMyStatus = (status) => (dispatch) => {
    profileAPI.setStatus(status)
        .then(response => {
            if(!response.resultCode)
                dispatch(setStatus(status))
        })
}

export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profileFormData) => async (dispatch, getState) => {
    const response = await profileAPI.saveProfileInfo(profileFormData)
    if (response.data.resultCode === 0) {
        const userId = getState().auth.userId
        dispatch(getUserProfile(userId))
    }
}

export default ProfileReducer