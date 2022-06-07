import classes from './../Dialogs.module.scss'
import {NavLink} from 'react-router-dom'
import {FC} from "react";

type DialogPropsType = {
    id: number
    name: string
}

const DialogItem = (props: DialogPropsType) => {
    return (
        <>
            <NavLink
                to={`/dialogs/id${props.id}`}
                className={({isActive}) => isActive ? classes.active : ''}>
                {props.name}
            </NavLink>
        </>
    )
}

export default DialogItem