import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomInput from '../CustomtInput.js';
import { useDispatch, useSelector } from 'react-redux';
import { GetSessions, adminLogin } from '../features/session/sessionSlice';
import { Link, useNavigate } from 'react-router-dom';

let schema = yup.object().shape({
  username: yup.string().required('UserName Required'),
  password: yup.string().required('Enter Password'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { LoginData } = useSelector((state) => state.admin);
  useEffect(() => {
    if (LoginData && LoginData?.status === 201) {
      navigate('/home');
      window.location.reload();
    }
  }, [LoginData]);

  useEffect(()=>{
    dispatch(GetSessions())
  },[])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(adminLogin(values));
    },
  });

  return (
    <div className='container'>
      <div className='row justify-content-center align-items-center' style={{ height: '100vh' }}>
        <div className='col-md-6'>
          <form className='marquee bg-white p-5 my-5' style={{borderRadius:"30px"}} onSubmit={formik.handleSubmit}>
            <h4 className='text-center text-success fs-2'>Admin User</h4>
            <CustomInput
              type='text'
              value={formik.values.username}
              onChange={formik.handleChange('username')}
              name='username'
              placeholder='Username'
            />
            <div className='error'>{formik.touched.username && formik.errors.username}</div>
            <CustomInput
              type='password'
              value={formik.values.password}
              onChange={formik.handleChange('password')}
              name='password'
              placeholder='Password'
            />
            <div className='error'>{formik.touched.password && formik.errors.password}</div>
            <div className='row'>
              <div className='col-12 d-flex justify-content-between my-4'>
                <Link to={'/forgotpassword'} className='text-dark'>
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button className='btn btn-primary my-4 btn-block' type='submit'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;