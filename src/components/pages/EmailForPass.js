import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from 'yup'
import { message } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { forgotpasswordverify } from "../features/session/sessionSlice";

let schema = yup.object().shape({
    token:yup.number().required('Enter Your OTP')
})

const EmailForPass = () => {
    const location =  useLocation().pathname.split('/')[2]
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {ForgotToken} = useSelector(state=>state.admin)
    const formik = useFormik({
        initialValues:{
            token:""
        },
        validationSchema:schema,
        onSubmit:(values)=>{
            console.log("i am here");
            dispatch(forgotpasswordverify({
                token:formik.values.token,
                uniqToken: location
            }))
        }
    })
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(()=>{
        if(ForgotToken?.status === 201)
        {
          messageApi.open({
            type: 'success',
            content: 'OTP Verification Successfull',
            })
          setTimeout(()=>{
            navigate(`/resetpassword/${location}`)
          },2000)
        }
        else if(ForgotToken?.status === 500)
        {
          messageApi.open({
            type: 'error',
            content: 'OTP Verification UnSuccessfull',
            })
        }
    },[ForgotToken])
  return (
    <div className="container-xxl">
      <div className="row d-flex justify-content-center align-items-md-center">
        <div className="col-6">
          <form className="p-5 my-5 CustomtInput bg-white" onSubmit={formik.handleSubmit} style={{borderRadius:"5%"}}>
            <h3 className="form-label">Password Reset Token</h3>
            <div className="row my-3">
                {contextHolder}
              <input
                type='number'
                value={formik.values.token}
                onChange={formik.handleChange('token')}
                name='token'
                className="CustomtInput"
                placeholder='OTP'
                style={{padding:"20px"}}
              />
            </div>
                <div className="error">
                        {
                            formik.touched.token && formik.errors.token
                        }
                </div>
                        <input type="submit" value={"Verify Here"} className="my-3 btn btn-primary"/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailForPass;
