import React, {useEffect} from 'react'
import './App.scss'
import Navbar from './components/Navbar/Navbar'
import {Navigate, Route, Routes} from 'react-router-dom'
import {connect} from 'react-redux'
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {initializeApp} from "./redux/app-reducer";
import {Loader} from "./components/common/Loader/Loader";
import withSuspend from "./hoc/withSuspend";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))

const DialogsSuspended = withSuspend(DialogsContainer)
const UsersSuspended = withSuspend(UsersContainer)

const App = (props) => {
    useEffect(() => {
        props.initializeApp()
    })

    return (
        <>
            {!props.initialized
                ? <Loader/>
                : <div className="App">
                    <HeaderContainer/>
                    <Navbar/>
                    <div className="app-wrapper-content">
                        <Routes>
                            <Route path="/" element={<Navigate to="/profile"/>}/>
                            <Route path="/dialogs/*" element={<DialogsSuspended/>}/>
                            <Route path="/profile/:profileId" element={<ProfileContainer/>}/>
                            <Route path="/profile/*" element={<ProfileContainer/>}/>
                            <Route path="/users/*" element={<UsersSuspended/>}/>
                            <Route path="/login/*" element={<Login/>}/>
                        </Routes>
                    </div>
                </div>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}

export default connect(mapStateToProps, {initializeApp})(App)