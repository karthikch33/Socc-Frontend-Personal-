import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup'
import CustomtInput from '../CustomtInput';
import { Table, Watermark } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { contact, getAllContact, updateContact } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Meta from '../Meta';


let schema = yup.object().shape({
  resolvedMessage:yup.string().required('Enter Your Message')
})

const ContactPage = () => {

  const formik = useFormik({
    initialValues:{
      resolvedMessage:''
    },
    validationSchema:schema
  })

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
  const {updateContact} = useSelector(state=>state.admin)
  const [data, setData] = useState([]);

  
  const resolveThis = (unqCode)=>{
    const sendAllData = {
      uniqueCode:unqCode,
      resolvedMessage:formik.values.resolvedMessage,
      resolvedBy: localStorage.getItem('adminData') ? JSON.parse(localStorage.getItem('adminData'))?.username : "N/A"
    }
    dispatch(updateContact(sendAllData))
    dispatch(getAllContact())
  }

  const callme=(e)=>{
    formik.values.resolvedMessage = e.target.value
  }


  useEffect(() => {
    if (Array.isArray(AllCompliants)) {
      const newData = AllCompliants.map((ele, index) => {
        if (!ele?.resolved) {
          return {
            ...ele,
            sno: index,
            rmessage: 
              <input
                type='text'
                name='resolvedMessage'
                onChange={callme}
                placeholder='Type Your Message'
              />,
            sendmail: (
              <input
                type='button'
                className='btn btn-primary'
                value='Resolve'
                onClick={() => resolveThis(ele?.uniqueCode)}
              />
            ),
          };
        }
        return null; // This line is added to handle unresolved elements
      }).filter(Boolean); // Filter out null values (unresolved elements)
      
      setData(newData.reverse());
    }
  }, [AllCompliants]);
  

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
