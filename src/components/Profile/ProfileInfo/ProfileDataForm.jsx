import {Field, Formik} from "formik";
import React from "react";

const ProfileDataForm = ({profile, onFormSubmit}) => {
    return (
        <Formik initialValues={profile} onSubmit={onFormSubmit}>
            {({
                  values, errors, touched,
                  handleChange, handleBlur,
                  handleSubmit, isSubmitting, status
              }) => (
                <form onSubmit={handleSubmit}>

                    Name: <Field type="text" name="fullName"
                           onChange={handleChange} onBlur={handleBlur}
                           value={values.fullName} placeholder='What Is Your Name?'/>
                    <span>{touched.fullName}</span>

                    About: <Field type="text" name="aboutMe"
                           onChange={handleChange} onBlur={handleBlur}
                           value={values.aboutMe} placeholder='Write Here About You...'/>



                    <div><input type="checkbox" name="lookingForAJob"
                                onChange={handleChange} onBlur={handleBlur} value={values.lookingForAJob} checked={values.lookingForAJob}
                    /><span>Looking For A Job</span></div>

                    Job Description: <Field type="text" name="lookingForAJobDescription"
                           onChange={handleChange} onBlur={handleBlur}
                           value={values.lookingForAJobDescription} placeholder='Job Description...'/>

                    <div><p>Contacts</p>
                        {Object.keys(profile.contacts)
                            .map((c, ind) =>
                                <div key={c}>{c}:
                                <Field type="text" name="contacts"
                                       onChange={handleChange} onBlur={handleBlur}
                                       value={values.contacts[c] || undefined} placeholder='https://...'/>
                                </div>
                            )}
                    </div>

                    {/*<span>{status?.error || ''}</span>*/}
                    <button type="submit" disabled={isSubmitting}>Save</button>
                </form>
            )}
        </Formik>
    )
}

export default ProfileDataForm