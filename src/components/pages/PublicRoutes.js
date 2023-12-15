import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoutes = ({children}) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('adminData'))
    return getTokenFromLocalStorage === null ? children : (<><Navigate to={'/home'} replace={true}/></>)
}

export default PublicRoutes