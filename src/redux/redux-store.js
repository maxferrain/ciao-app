import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import DialogsReducer from "./dialogs-reducer";
import ProfileReducer from "./profile-reducer";
import UsersReducer from "./users-reducer";
import {AuthReducer} from "./auth-reducer";
import {AppReducer} from "./app-reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    dialogsPage: DialogsReducer,
    profilePage: ProfileReducer,
    usersPage: UsersReducer,
    auth: AuthReducer,
    app: AppReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore (rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store
window.store = store