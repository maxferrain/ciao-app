import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {selectActivePage, setUsers, setUsersCount, requestUsers,
    toggleFollow, followThunk, toggleIsFetching, unfollowThunk
} from "../../redux/users-reducer";
import {Loader} from "../common/Loader/Loader";
import classes from "./Users.module.scss";
import {getCurrentPage, getFollowingInProgress, getIsFetching,
    getPageSize, getPortionSize, getTotalUsersCount, getUsers
} from "../../redux/selectors/users-selectors";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.usersOnPage, this.props.pageSelected)
    }

    onPageNumber = (pageNumber) => {
        this.props.requestUsers(this.props.usersOnPage, pageNumber)
    }

    render() {
        return (
            <div className={classes.usersContainer}>
                { this.props.isFetching
                ? <Loader/>
                : <Users
                    onPageNumber={this.onPageNumber}
                    pageSelected={this.props.pageSelected}
                    toggleFollow={this.props.toggleFollow}
                    totalUsersCount={this.props.totalUsersCount}
                    usersOnPage={this.props.usersOnPage}
                    users={this.props.users}
                    toggleFollowThunk={this.props.toggleFollowThunk}
                    isFollowingFetching={this.props.isFollowingFetching}
                    {...this.props}
                />
            }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSelected: getCurrentPage(state),
        usersOnPage: getPageSize(state),
        isFetching: getIsFetching(state),
        isFollowingFetching: getFollowingInProgress(state),
        portionSize: getPortionSize(state)
    }
}

export default connect(mapStateToProps, {
    setUsers, toggleFollow, selectActivePage, setUsersCount,
    toggleIsFetching, requestUsers, followThunk, unfollowThunk
})(UsersContainer)