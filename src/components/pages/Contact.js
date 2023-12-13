import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup'
import CustomtInput from '../CustomtInput';
import { Watermark } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { contact } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Meta from '../Meta';


let schema = yup.object().shape({
  name:yup.string().required('Enter Your Name'),
  collegeId:yup.string().required('Enter Your College Id'),
  email:yup.string().required('Enter Your Email'),
  message:yup.string().required('Enter Something')
})

const ContactPage = () => {

  const dispatch = useDispatch()
  const {ContactSuccess} = useSelector(state=>state.auth)


  const formik = useFormik({
    initialValues:{
      collegeId:'',
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema:schema,
    onSubmit:(values)=>{
        dispatch(contact(values))
        formik.resetForm()
    }
  })

  return (
    <Watermark content={'Contact Socc'}>
      <Meta title={"Contact"}/>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Contact Us</h2>
          <form className="p-4 border rounded" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <CustomtInput name="collegeId" type="text" value={formik.values.collegeId} placeholder="Your Id" onChange={formik.handleChange('collegeId')} />
              <div className="error">
              {
                formik.touched.collegeId && formik.errors.collegeId
              }
              </div>
            </div>

            <div className="form-group">
            <CustomtInput name="name" type="text" value={formik.values.name} placeholder="Your Name" onChange={formik.handleChange('name')} />
            <div className="error">
              {
                formik.touched.name && formik.errors.name
              }
              </div>
            </div>

            <div className="form-group">
            <CustomtInput name="email" type="email" value={formik.values.email} placeholder="Your Email" onChange={formik.handleChange('email')} />
            <div className="error">
              {
                formik.touched.email && formik.errors.email
              }
              </div>
            </div>

            <div className="form-group my-4">
              <label htmlFor="message ">Message:</label>
              <textarea
                className="form-control my-4"
                name="message"
                rows="4"
                placeholder="Your Message"
                value={formik.values.message}
                onChange={formik.handleChange('message')}
                required
              ></textarea>
               <div className="error">
              {
                formik.touched.message && formik.errors.message
              }
              </div>
              <label htmlFor="" className='text-danger d-none'>*Don't Send UnWanted Messages</label>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
    </Watermark>
  );
};

export default ContactPage;
