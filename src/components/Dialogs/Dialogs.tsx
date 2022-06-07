import classes from './Dialogs.module.scss'
import React, {FC} from "react";
import DialogItem from './DialogsItem/DialogItem';
import Message from './Message/Message';
import {Icon} from "@iconify/react";
import {Formik} from "formik";

const AddMessageForm = (props: any) => {
    const onSendMessage = (values: any, {setSubmitting, resetForm}: any) => {
        props.sendMessage(values.messageText)
        setSubmitting(false)
        resetForm()
    }

    return (
        <Formik
            initialValues={{messageText: ''}}
            onSubmit={onSendMessage}>
            {({values, handleChange, handleSubmit, isSubmitting,}) => (
                <form onSubmit={handleSubmit} className={classes.form}>
                    <textarea name="messageText" className={classes.textarea} placeholder='Write a message...'
                        onChange={handleChange} value={values.messageText}
                    />
                    <div className={classes.createPostBtn}>
                        <button type="submit" disabled={isSubmitting}>
                            <i className={classes.badge}>
                                <Icon className={classes.createPostImg} icon="akar-icons:send"/></i>
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    )
}

const Dialogs = (props: any) => {

    const dialogsElements = props.contactsList.map((d: any) => <DialogItem key={d.id} id={d.id} name={d.name}/>)
    const messagesElements = props.messages.map((m: any) => <Message key={m.id} id={m.id} message={m.message}/>)


    return (
        <div className={classes.dialogsContainer}>
            <div className={classes.senders}>{dialogsElements}</div>
            <div className={classes.chats}>
                {messagesElements}
                <AddMessageForm sendMessage={props.sendMessage}/>
            </div>
        </div>
    )
}

export default Dialogs
