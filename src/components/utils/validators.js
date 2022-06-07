
export const emailValidation = (values) => {
    let error
    if (!values) error = 'Email can\'t be empty'
    else
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values))
        error = 'Invalid email address'
    return error
}

export const passwordValidation = (values) => {
    let error
    if (!values) error = 'Password can\'t be empty'
    return error
}
