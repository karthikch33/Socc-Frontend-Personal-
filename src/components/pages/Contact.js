import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup'
import CustomtInput from '../CustomtInput';
import { Table, Watermark } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { contact, getAllContact } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Meta from '../Meta';


let schema = yup.object().shape({
  name:yup.string().required('Enter Your Name'),
  collegeId:yup.string().required('Enter Your College Id'),
  email:yup.string().required('Enter Your Email'),
  message:yup.string().required('Enter Something')
})

const ContactPage = () => {

  const columns = [
    {
      title: 'S NO',
      dataIndex: 'sno',
    },
    {
      title: 'Student Id',
      dataIndex: 'collegeId',
    },
    {
      title: 'Student Name',
      dataIndex: 'name',
    },
    {
      title: 'Student Email',
      dataIndex: 'email',
    },
    {
      title:'Student Message',
      dataIndex:'message'
    },
    {
      title:'Resolved Message',
      dataIndex:'rmessage'
    },
    {
      title:'Resolved',
      dataIndex:'sendmail'
    }
  ];

  useEffect(()=>{
    dispatch(getAllContact())
  },[])

  const {AllCompliants} = useSelector(state=>state.auth)
  const [data, setData] = useState([]);



  useEffect(()=>{
    if (Array.isArray(AllCompliants)) {
      const newData = AllCompliants?.map((ele, index) => ({
        ...ele,
        sno:index,
        rmessage:<input type='text' placeholder='Type Your Message'/>,
        sendmail:<input type='button' className='btn btn-primary' value="Resolved"/>
      }));
      setData(newData.reverse());
    }
  },[AllCompliants])

  const dispatch = useDispatch()
  return (
    <Watermark content={''}>
      <Meta title={"Contact"}/>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <h2 className="text-center mb-4">Complaints</h2>
          <Table columns={columns} dataSource={data} />;
        </div>
      </div>
    </div>
    </Watermark>
  );
};

export default ContactPage;
