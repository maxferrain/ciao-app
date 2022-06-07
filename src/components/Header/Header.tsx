import {NavLink} from 'react-router-dom'
import logo from './../../assets/ciao-logo.svg'
import profileIcon from './../../assets/profile-icon.png'
import classes from './Header.module.scss'

const {header, searchForm, searchInput, menu} = classes

const Header = (props: any) => {
    return (
        <header className={`${header}`}>
            <NavLink to='/'><img src={logo} alt="logo"/></NavLink>
            <div className={searchForm}>
                <i className="fas fa-search"> </i>
                <input className={searchInput} type="text" placeholder="Start typing to search..."/>
            </div>
            <div className={menu}>
                {props.isAuth ?
                    <>
                        <span style={{marginRight: '8px'}}>
                            {props.login} - <button onClick={props.logout}>Logout</button></span>
                        <NavLink to="/dialogs"> <i className="far fa-comment"> </i> </NavLink>
                        <NavLink to={`/profile/${props.userId}`}> <img src={profileIcon} alt="profile"/> </NavLink>
                    </>
                    : <NavLink to="/login">Log in</NavLink>
                }

            </div>
        </header>
    )
}

export default Header
