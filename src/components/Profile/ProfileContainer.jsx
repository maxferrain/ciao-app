import {connect} from "react-redux";
import {addPost, getStatus, getUserProfile, setMyStatus} from "../../redux/profile-reducer";
import Profile from "./Profile";
import React from "react";

import {useLocation, useNavigate, useParams,} from "react-router-dom";

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
    return ComponentWithRouterProp;
}

class ProfileContainer extends React.Component {
    componentDidMount() {
        let profileId = this.props.router.params.profileId
        if(!profileId) {
            profileId = this.props.userId //profileId = 19389
            if (!profileId) {
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(profileId)
        this.props.getStatus(profileId)
    }

    render() {
        return (
            <Profile
                profile={this.props.profile}
                status={this.props.status}
                {...this.props}
            />
        )
    }
}

const mapStateToProps = (state) => {
  return {
      posts: state.profilePage.posts,
      profile: state.profilePage.profile,
      userId: state.auth.userId,
      status: state.profilePage.status
  }
}

export default connect(mapStateToProps, {addPost, getUserProfile, getStatus, setMyStatus})(withRouter(ProfileContainer))