import React from 'react'
import { Navigate } from 'react-router-dom'
import cookies from './cookies'
import { toast } from 'react-toastify'

const PrivateRoutesAdminR = ({children}) => {
    const getTokenFromCookie = cookies.get('adminData')
    const getEmailTextFromCookie = cookies.get('email')
    return getTokenFromCookie !== undefined ? getEmailTextFromCookie !== undefined ? children :(<>{toast.error('Super User Permission Required')}<Navigate to={'/home'} replace={true}/></>): (<>{toast.error('Login Required')}<Navigate to={'/'} replace={true}/></>)
}   

export default PrivateRoutesAdminR