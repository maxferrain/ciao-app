import {usersAPI} from "../api/api";

const SET_USERS = 'SET-USERS'
const TOGGLE_FOLLOW = 'TOGGLE-FOLLOW'
const SET_ACTIVE_PAGE = 'SET-ACTIVE-PAGE'
const SET_ALL_USERS_COUNT = 'SET-ALL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const FOLLOWING_IS_FETCHING = 'FOLLOWING-IS-FETCHING'

const initialState = {
    users: [],
    totalUsersCount: null,
    pageSelected: 1,
    usersOnPage: 12,
    portionSize: 10,
    isFetching: false,
    isFollowingFetching: []
}

const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {...state, users: action.newUsers}
        case TOGGLE_FOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId)
                        return {...u, followed: !u.followed}
                    else return u
                })
            }
        case SET_ACTIVE_PAGE:
            return {
                ...state,
                pageSelected: action.pageSelected
            }
        case  SET_ALL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: !state.isFetching
            }
        case FOLLOWING_IS_FETCHING:
            return {
                ...state,
                isFollowingFetching: action.isFollowingFetching
                    ? [...state.isFollowingFetching, action.userId]
                    : state.isFollowingFetching.filter(u => u !== action.userId)
            }
        default:
            return state
    }
}

export const setUsers = (users) => ({type: SET_USERS, newUsers: users})
export const toggleFollow = (userId) => ({type: TOGGLE_FOLLOW, userId})
export const selectActivePage = (pageSelected) => ({type: SET_ACTIVE_PAGE, pageSelected})
export const setUsersCount = (totalUsersCount) => ({type: SET_ALL_USERS_COUNT, totalUsersCount})
export const toggleIsFetching = () => ({type: TOGGLE_IS_FETCHING})
export const followingIsFetching = (isFollowingFetching, userId) => ({type: FOLLOWING_IS_FETCHING, isFollowingFetching, userId})

export const requestUsers = (usersOnPage, pageSelected) => (dispatch) => {
    dispatch(toggleIsFetching())
    usersAPI.setUsers(usersOnPage, pageSelected)
        .then(data => {
            dispatch(setUsers(data.items))
            dispatch(setUsersCount(data.totalCount))
            dispatch(toggleIsFetching())
            dispatch(selectActivePage(pageSelected))
        })
}

export const followThunk = (userId) => (dispatch) => {
    dispatch(followingIsFetching(true, userId))
    usersAPI.follow(userId)
        .then(data => {
            console.log(data)
            if (!data.resultCode) {
                dispatch(toggleFollow(userId))
                dispatch(followingIsFetching(false, userId))
            }
        })
}

export const unfollowThunk = (userId) => (dispatch) => {
    dispatch(followingIsFetching(true, userId))
    usersAPI.unfollow(userId)
        .then(data => {
            console.log(data)
            if (!data.resultCode) {
                dispatch(toggleFollow(userId))
                dispatch(followingIsFetching(false, userId))
            }
        })
}


export default UsersReducer