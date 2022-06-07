import classes from "./Users.module.scss";
import React from "react";
import userDefault from "../../assets/userDefault.png"
import backgroundDefault from "../../assets/backgroundDefault.jpeg"
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";

const { userCard, userBackground, userImage, userInfo, userInfoDetails, name, status, followButton, unfollow,
    follow, usersCards} = classes

const Users = (props) => {
    // debugger
    // const totalPages = Math.ceil(props.totalUsersCount / props.usersOnPage)
    // let pagArray = []
    // for (let i = 1; i <= 50; i++)  // totalPages
    //     pagArray.push(i)

    return (
        <div>
            <Paginator onPageNumber={props.onPageNumber}
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
                            <img src={ u.photos.small || userDefault} className={userImage} alt=''/>
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
    )
}

export default Users