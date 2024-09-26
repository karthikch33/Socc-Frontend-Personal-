import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { resetPassword } from '../features/session/sessionSlice'
import { useLocation, useNavigate } from 'react-router-dom'


let schema = yup.object().shape({
  password: yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('Password is required'),
  password2:yup.string().required('REenter Password')
})

const ResetPassword = () => {
  const dispatch = useDispatch()
  const location = useLocation().pathname.split('/')[2]
  const {ResetPasswordStatus} = useSelector(state=>state.admin)
  const formik = useFormik({
    initialValues:{
      password:'',
      password2:''
    },
    validationSchema:schema,
    onSubmit:(values)=>{
      if(values?.password !== values?.password2)
       toast.error('Password Mismatched')
      else if(values?.password === values?.password2){
        dispatch(resetPassword({
          ...values,
          uniqToken:location
        }))
      }
    }
  })
  const navigate = useNavigate()
  useEffect(()=>{
    if(ResetPasswordStatus === true)
      navigate('/')
    },[ResetPasswordStatus])
  return (
    <div className='container-xxl'>
        <div className="row d-flex justify-content-center  align-items-center my-5">

          <div className="col-6 ">
              <h3 className='fs-1 my-3'>Reset Password</h3>
              <form onSubmit={formik.handleSubmit} className='form-control p-5 CustomtInput' style={{borderRadius:"5%"}}>
              <div className="row my-3">
                <input type='text' placeholder='New Password'name='password' value={formik.values.password} onChange={formik.handleChange('password')}  className='form-control p-4 CustomtInput'/>
                <div className="error">
                  {
                    formik.touched.password && formik.errors.password
                  }
                </div>
              </div>
              <div className="row my-3">
                <input type='text' placeholder='Renter Your Password' value={formik.values.password2} name='password2'onChange={formik.handleChange('password2')} className='form-control p-4 CustomtInput'/>
                <div className="error">
                  {
                    formik.touched.password2 && formik.errors.password2
                  }
                </div>
              </div>
                  <input type="submit" value={'Update'} className='btn btn-primary'/>
              </form>

          </div>
        </div>
    </div>
  )
}

export default ResetPassword