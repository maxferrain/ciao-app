import {connect} from "react-redux";
import React from "react";
import Header from "./Header";
import {logout} from "../../redux/auth-reducer";


class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    login: state.auth.login,
    userId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {logout})(HeaderContainer)
