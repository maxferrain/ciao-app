import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET-USER-DATA'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export const AuthReducer = (state = initialState, action) => {
    // debugger
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}


export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, data: {userId, email, login, isAuth}})

export const getAuthUserData = () => (dispatch) => {
    // debugger
   return authAPI.me()
        .then(data => { if(!data.resultCode) {
                const {id, email, login} = data.data
                dispatch(setAuthUserData(id, email, login, true))
            }}
        )
}

export const login = (email, password, rememberMe = false, setStatus) => (dispatch) => {
    authAPI.login({email, password, rememberMe})
        .then(response => {
            if(!response.data.resultCode) {
            dispatch(getAuthUserData())
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
