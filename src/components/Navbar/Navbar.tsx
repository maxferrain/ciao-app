import classes from './Navbar.module.scss'
import {Icon} from '@iconify/react'
import {FC} from 'react'
import { NavLink } from 'react-router-dom'


const Navbar: FC = () => {
    return (
        <div className={classes.navbar}>
            <span className={classes.description}>New Feeds</span>
            <div className={classes.menu}>
                <NavLink className={({ isActive }) => isActive? classes.active: ''} to={'/profile'}>
                    <i className={`${classes.badge} ${classes.profileIcon}`}><Icon icon="ant-design:user-outlined"/></i>
                    Author Profile
                </NavLink>
                <NavLink className={({ isActive }) => isActive? classes.active: ''}  to={'/dialogs'}>
                    <i className={`${classes.badge} ${classes.messageIcon}`}><Icon icon="ant-design:message-outlined"/></i>
                    Messages
                </NavLink>
                <NavLink className={({ isActive }) => isActive? classes.active: ''}  to={'/users'}>
                    <i className={`${classes.badge} ${classes.usersIcon}`}><Icon icon="ph:users"/></i>
                    All Users
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar
