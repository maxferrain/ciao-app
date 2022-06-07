import {connect} from "react-redux";
import {Navigate, Routes, Route} from "react-router-dom";
import React from "react";

// const mapStateToProps = (state) => ({isAuth: state.auth.isAuth})
//
// export const withAuthRedirect = (Component) => {
//
//     class RedirectComponent extends React.Component {
//         render() {
//             return !this.props.isAuth
//                 ? <Navigate to={'/login'} />
//                 : <Component {...this.props}/>
//         }
//     }
//     return connect(mapStateToProps)(RedirectComponent)
// }

const mapStateToProps = (state) => ({isAuth: state.auth.isAuth})

export const withAuthRedirect = (Component) => {
    const RedirectComponent = (props) => {
            return !props.isAuth
                ? <Navigate to={'/login'} />
                : <Component {...props}/>
    }

    return connect(mapStateToProps)(RedirectComponent)
}