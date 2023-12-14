import React from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PrivateRoutesAdminR = ({children}) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('adminData'))
    const getEmailFromLocalStorage = JSON.parse(localStorage.getItem('email'))
    return getTokenFromLocalStorage !== null ? getEmailFromLocalStorage !== null ? children :(<>{toast.error('Super User Permission Required')}<Navigate to={'/home'} replace={true}/></>): (<>{toast.error('Login Required')}<Navigate to={'/'} replace={true}/></>)
}   

export default PrivateRoutesAdminR