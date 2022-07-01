import Post from './Post/Post'
import React from 'react'
import classes from './MyPosts.module.scss'
import {Icon} from '@iconify/react'
import {Formik} from "formik";


const MyPosts = React.memo((props: any) => {

    const postsElements =
        [...props.posts]
            .reverse()
            .map((p: any) => <Post likesCount={p.likesCount} key={p.id}
                                                            minutesAgoCreated={p.minutesAgoCreated}
                                                            postText={p.postText}/>)

    const createPost = (values: any, {setSubmitting, resetForm}: any) => {
        props.addPost(values.postText)
        setSubmitting(false)
        resetForm()
    }

    return (
        <div>
            <div className={classes.createPost}>
                <Formik
                    initialValues={{postText: ''}}
                    onSubmit={createPost}>
                    {({values, handleChange, handleSubmit, isSubmitting,}) => (
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <div className={classes.createPostBtn}>
                                <button type="submit" disabled={isSubmitting || !values.postText}>
                                    <i className={classes.badge}><Icon className={classes.createPostImg} icon="feather-edit-3"/></i>
                                    Create post
                                </button>
                            </div>
                            <textarea name="postText" className={classes.textarea}  placeholder="What is on your mind?"
                              onChange={handleChange} value={values.postText}/>
                        </form>
                    )}
                </Formik>
            </div>
            {postsElements}
        </div>
    )
})

export default MyPosts
