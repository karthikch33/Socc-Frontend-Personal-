import React from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PrivateRoutes = ({children}) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('adminData'))
    return getTokenFromLocalStorage !== null ? children : (<>{toast.error('Login Required')}<Navigate to={'/'} replace={true}/></>)
}

export default PrivateRoutes