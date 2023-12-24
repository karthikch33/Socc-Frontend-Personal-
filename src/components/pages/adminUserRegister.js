import React from 'react'
import CustomtInput from '../CustomtInput'
import {useFormik} from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { adminRegister } from '../features/session/sessionSlice'
import TimerComponent from './TimerComponent'


let schema = yup.object().shape({
    firstname:yup.string().required('FirstName Required'),
    lastname:yup.string().required('LastName Required'),
    email:yup.string().required('Email Required'),
    phone:yup.string().required('Phone Required'),
    username:yup.string().required('Username Required'),
    password:yup.string().required('Password Required'),
})

const AdminUserRegister = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues:{
      firstname:'',
      lastname:"",
      email:"",
      phone:"",
      username:"",
      password:"",
    },
    enableReinitialize:true,
    validationSchema:schema,
    onSubmit:(values)=>{
        dispatch(adminRegister(values))
        formik.resetForm()
    }
  })
  const callOnce = ()=>{
    formik.resetForm()
  }
  return (
    <div className='container-xxl'>
      <div className="row">
        <div className="col-12">
          <h3 className='text-center fs-3 my-4'>Admin User Registration</h3>
        </div>
      </div>
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-8 ">
            <form onSubmit={formik.handleSubmit} className='submit-form'>
                <div className="row">
                  <div className="col-12">
                    <CustomtInput type="text" placeholder="Username" name="username" onChange={formik.handleChange('username')} values={formik.values.username}/>
                    <div className="error">
                    {
                      formik.touched.username && formik.errors.username
                    }
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <CustomtInput type="text" placeholder="Firstname" name="firstname" onChange={formik.handleChange('firstname')} values={formik.values.firstname}/>
                    <div className="error">
                    {
                      formik.touched.firstname && formik.errors.firstname
                    }
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <CustomtInput type="text" placeholder="Lastname" name="lastname" onChange={formik.handleChange('lastname')} values={formik.values.lastname}/>
                    <div className="error">
                    {
                      formik.touched.lastname && formik.errors.lastname
                    }
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <CustomtInput type="text" placeholder="Email" name="email" onChange={formik.handleChange('email')} values={formik.values.email}/>
                    <div className="error">
                    {
                      formik.touched.email && formik.errors.email
                    }
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <CustomtInput type="text" placeholder="Phone" name="phone" onChange={formik.handleChange('phone')} values={formik.values.phone}/>
                    <div className="error">
                    {
                      formik.touched.phone && formik.errors.phone
                    }
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <CustomtInput type="password" placeholder="Password" name="password" onChange={formik.handleChange('password')} values={formik.values.password}/>
                    <div className="error">
                    {
                      formik.touched.password && formik.errors.password
                    }
                    </div>
                  </div>
                </div>
                <button className='btn btn-primary' type='submit'>Register As Admin</button>
            </form> 
        </div>
        <div className="col-4">
          <TimerComponent/>
          
        </div>
      </div>
    </div>
  )
}

export default AdminUserRegister