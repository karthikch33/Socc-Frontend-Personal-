import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import CustomtInput from '../CustomtInput'
import { useFormik } from 'formik'
import { deleteEmailTokenSuperUser, emailTokenSuperUser, getEmailTokenSuperUser } from '../features/session/sessionSlice.js'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { resetState } from '../features/auth/authSlice.js'

const SuperUser = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues:{
            emailGenToken:'',
        },
        onSubmit:(values)=>{
            dispatch(getEmailTokenSuperUser(formik.values.emailGenToken))
        }
    })
    const {EmailToken} = useSelector(state=>state.admin)
    const navigate = useNavigate()

    useEffect(()=>{
        if(EmailToken?.status === 201)
        {
            toast.success('Success Login')
            dispatch(deleteEmailTokenSuperUser(formik.values.emailGenToken))
            formik.resetForm()
            navigate('/adminuserRegister')
            localStorage.setItem('email',JSON.stringify({Text:'Yes Login'}))
            dispatch(resetState())
        }
    },[EmailToken])


    function generateRandomPin() {
        const pinLength = 7;
        let pin = '';
        for (let i = 0; i < pinLength; i++) {
          pin += Math.floor(Math.random() * 10);
        }
        return pin;
    }  
      const EmailGenToken = ()=>{
          const randomPin = generateRandomPin();
          dispatch(emailTokenSuperUser(randomPin))
    }
  return (
    <div className='container-xxl'>
        <div className="row">
            <div className="col-12">
                <h3 className='text-center mt-4'>Super User Verification</h3>
            </div>
            <div className="col-12">
                <form className='' onSubmit={formik.handleSubmit}>
                  <CustomtInput type="text" name="emailGenToken" onChange= {formik.handleChange('emailGenToken')} placeholder="Enter Email Gen Token"/>
                     <div className="row">
                        <div className="col-12 d-flex justify-content-between">
                   <button type='submit' className='btn btn-primary'>Verify</button>
                        </div>   
                    </div> 
                </form>
            </div>
            <div className="col-12 d-flex justify-content-end">
            <button className='btn btn-warning' onClick={()=>EmailGenToken()}>Gen Token</button> 
            </div>
        </div>
    </div>
  )
}

export default SuperUser