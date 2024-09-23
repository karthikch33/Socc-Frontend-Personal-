import React from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import cookies from './cookies'

const PrivateRoutes = ({children}) => {
    const getTokenFromCookies = cookies.get('adminData')
    // const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('adminData'))
    return getTokenFromCookies !== undefined ? children : (<>{toast.error('Login Required')}<Navigate to={'/'} replace={true}/></>)
}

export default PrivateRoutes