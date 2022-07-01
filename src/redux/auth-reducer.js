import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = 'SET-USER-DATA'
const SET_CAPTCHA_URL = 'SET-CAPTCHA-URL'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

export const AuthReducer = (state = initialState, action) => {
    // debugger
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
            // debugger
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}


export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, data: {userId, email, login, isAuth}})
const setCaptchaUrl = (captchaUrl) => ({type: SET_CAPTCHA_URL, data: {captchaUrl}})

export const getAuthUserData = () => (dispatch) => {
   return authAPI.me()
        .then(data => { if(!data.resultCode) {
                const {id, email, login} = data.data
                dispatch(setAuthUserData(id, email, login, true))
            }}
        )
}

export const getCaptcha = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(setCaptchaUrl(captchaUrl));
}

export const login = (email, password, rememberMe = false, setStatus, captcha) => (dispatch) => {
    authAPI.login({email, password, rememberMe, captcha})
        .then(response => {
            if(response.data.resultCode === 0) {
            dispatch(getAuthUserData())
            } else if(response.data.resultCode === 10) {
                setStatus({error: response.data.messages[0]})
                dispatch(getCaptcha())
            } else {
                setStatus({error: response.data.messages[0]})
            }}
        )
}

export const logout = () => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if(!response.data.resultCode)
                dispatch(setAuthUserData(null, null, null, false))
        })
}
