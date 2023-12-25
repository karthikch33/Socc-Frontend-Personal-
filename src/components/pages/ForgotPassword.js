import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import { message } from 'antd';
import { forgotpassword } from "../features/session/sessionSlice";
import { useNavigate } from "react-router-dom";

let schema = yup.object().shape({
    email:yup.string().required('Email Required')
})


function randomOTPGenerator(){
    let otp = ""
    for (let index = 0; index < 7; index++) {
         otp  +=Math.floor(Math.random() * 10)
    }
    return otp;
}

const ForgotPassword = () => {
  const {ForgotTokenUser} = useSelector(state=>state.admin)
    const navigate = useNavigate()

    useEffect(()=>{
        if(ForgotTokenUser?.status === 201)
        {
          messageApi.open({
            type: 'success',
            content: 'Mail Generated To Provided Mail',
            })
          setTimeout(()=>{
            navigate(`/emailforgotpassword/${ForgotTokenUser?.uniqToken}`)
          },2000)
        }
        else if(ForgotTokenUser?.status === 404)
        {
          messageApi.open({
            type: 'error',
            content: 'Email Not Registerd in Our Database',
            })
        }
    },[ForgotTokenUser])

    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()  
    const formik = useFormik({
        initialValues:{
            email:""
        },
        validationSchema:schema,
        onSubmit:(values)=>{
            dispatch(forgotpassword({
                email:formik.values.email,
                token:randomOTPGenerator()
            }))
        }
    })
  return (
    <div className="container-xxl">
      <div className="row d-flex justify-content-center align-items-md-center">
        <div className="col-6">
          <form className="marquee p-5 my-5" onSubmit={formik.handleSubmit}>
            <h3 className="form-label">Forgot Password</h3>
            <div className="row my-3">
              <input
                type='email'
                value={formik.values.email}
                onChange={formik.handleChange('email')}
                name='email'
                placeholder='Email'
                style={{padding:"20px"}}
              />
            </div>
                <div className="error">
                        {
                            formik.touched.email && formik.errors.email
                        }
                </div>
                {contextHolder}
            <input type="submit" className="my-3 btn btn-primary"/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
