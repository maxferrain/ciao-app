import classes from "./Login.module.scss";
import {Field, Formik} from "formik";
import {connect} from "react-redux";
import {getAuthUserData, login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import {emailValidation, passwordValidation} from "../utils/validators";
import {Icon} from "@iconify/react/dist/iconify";
import React from "react";

const {
    errorField,
    container,
    loginText,
    formControl,
    loginForm,
    field,
    loginIcon,
    inputField,
    rememberMe,
    rememberMeBlock
} = classes

const LoginForm = (props) => {
    return (
        <Formik initialValues={{login: '', password: '', rememberMe: false, captcha: ''}}
                onSubmit={props.onLogin}
        >
            {({
                  values, errors, touched,
                  handleChange, handleBlur,
                  handleSubmit, isSubmitting, status
              }) => (
                <form onSubmit={handleSubmit} className={loginForm}>
                    <div className={`${field} ${errors.login ? errorField : ''}`}>
                        <Icon className={loginIcon} icon="clarity:email-line"/>
                        <Field type="email" name="login" className={inputField}
                               onChange={handleChange} onBlur={handleBlur}
                               value={values.email} validate={emailValidation} placeholder='Your Email Address'
                        />
                    </div>
                    <span>{errors.login && touched.login && errors.login}</span>

                    <div className={`${field} ${errors.password ? errorField : ''}`}>
                        <Icon className={loginIcon} icon="bytesize:lock"/>
                        <Field type="password" name="password" className={inputField}
                               onChange={handleChange} onBlur={handleBlur}
                               value={values.password} validate={passwordValidation} placeholder='Password'
                        />
                    </div>
                    <span>{errors.password && touched.password && errors.password}</span>

                    <div className={rememberMeBlock}><input type="checkbox" name="rememberMe"
                                                            onChange={handleChange} onBlur={handleBlur}
                                                            value={values.rememberMe}
                    /><span className={rememberMe}>Remember Me</span></div>

                    <span>{status?.error || ''}</span>

                    {props.captchaUrl &&
                        <div>
                            <img style={{height: '40px'}} src={props.captchaUrl}/>
                            <Field type="text" name="captcha" value={values.captcha}
                                   onChange={handleChange} onBlur={handleBlur} placeholder='Captcha Text'
                            />
                        </div>
                    }
                    <button type="submit" className={`${field} ${formControl}`} disabled={isSubmitting}>Login</button>
                </form>
            )}
        </Formik>
    )
}

const Login = (props) => {
    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }

    const onLogin = (values, {setSubmitting, setStatus, resetForm}) => {
        props.login(values.login, values.password, values.rememberMe, setStatus, values.captcha)
        setSubmitting(false);
        resetForm();
    }

    return (
        <div className={container}>
            <h1 className={loginText}>Login into <br/>your account</h1>
            <LoginForm onLogin={onLogin} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {login})(Login)