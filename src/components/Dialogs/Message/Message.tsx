import classes from './../Dialogs.module.scss'
import {FC} from "react";

type MessagePropsType = {
    message: string,
    id: number
}


const Message = (props: MessagePropsType) => {
    return (
        <div className={props.id % 2 === 0 ? classes.myMessageItems : classes.notMineMessageItems}>
            <span className={classes.messageItem}>{props.message}</span>
        </div>
    )
}

export default Message
