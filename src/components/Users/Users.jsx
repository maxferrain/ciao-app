import classes from "./Users.module.scss";
import React, {useEffect} from "react";
import userDefault from "../../assets/userDefault.png"
import backgroundDefault from "../../assets/backgroundDefault.jpeg"
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import {Loader} from "../common/Loader/Loader";
import {connect} from "react-redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize, getPortionSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/selectors/users-selectors";
import {
    followThunk,
    requestUsers,
    selectActivePage,
    setUsers,
    setUsersCount,
    toggleFollow,
    toggleIsFetching, unfollowThunk
} from "../../redux/users-reducer";

const {
    usersContainer,
    userCard,
    userBackground,
    userImage,
    userInfo,
    userInfoDetails,
    name,
    status,
    followButton,
    unfollow,
    follow,
    usersCards
} = classes

const Users = (props) => {

    useEffect(() => {
        props.requestUsers(props.usersOnPage, props.pageSelected)
    }, [])

    const onPageNumber = (pageNumber) => {
        props.requestUsers(props.usersOnPage, pageNumber)
    }

    return (
        <div className={usersContainer}>
            {props.isFetching
                ? <Loader/>
                : <div>
                    <Paginator onPageNumber={onPageNumber}
                               pageSelected={props.pageSelected}
                               usersOnPage={props.usersOnPage}
                               totalItemsCount={props.totalUsersCount}
                               portionSize={props.portionSize}
                    />
                    <div className={usersCards}>
                        {props.users.map(u =>
                            <div key={u.id} className={userCard}>
                                <img src={u.pageBackgroundUrl || backgroundDefault}
                                     className={userBackground} alt=''/>
                                <NavLink to={`/profile/${u.id}`}>
                                    <img src={u.photos.small || userDefault} className={userImage} alt=''/>
                                </NavLink>
                                <div className={userInfo}>
                                    <div className={userInfoDetails}>
                                        <div className={name}>{u.name}</div>
                                        <div className={status}>{u.status}</div>
                                        <div>support@gmail.com</div>
                                        <div>New York , USA</div>
                                    </div>
                                    <button disabled={props.isFollowingFetching.some(id => id === u.id)}
                                            onClick={u.followed ? () => props.unfollowThunk(u.id) : () => props.followThunk(u.id)}
                                            className={`${followButton} ${u.followed ? unfollow : follow}`}>
                                        {u.followed ? 'UNFOLLOW' : 'FOLLOW'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
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
    setUsers, toggleFollow, setUsersCount,
    toggleIsFetching, requestUsers, followThunk, unfollowThunk
})(Users)