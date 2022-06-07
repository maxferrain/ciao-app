import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'

const initialState = {
    initialized: false
}

export const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                initialized: true
            }
        default:
            return state
    }
}

const initializeSuccess = () => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch) => {
    // debugger
    const authDataPromise = dispatch(getAuthUserData())

    Promise.all([authDataPromise])
        .then(() => {
            // debugger
            dispatch(initializeSuccess())
        })
}
