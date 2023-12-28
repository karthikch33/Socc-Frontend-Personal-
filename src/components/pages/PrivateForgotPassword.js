import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateForgotPassword = ({children}) => {
    const {ResetPasswordStatus,ForgotTokenUser,ForgotToken} = useSelector(state=>state.admin) 
    return  ResetPasswordStatus!==false || ForgotTokenUser !==null ||ForgotToken !==null  ? children : (<><Navigate to={'/'} replace={true}/></>)
}

export default PrivateForgotPassword