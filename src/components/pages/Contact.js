import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomtInput from '../CustomtInput';
import { Table, Watermark } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { contact, getAllContact, updateContact } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Meta from '../Meta';
import cookies from '../cookies'
import { Link } from 'react-router-dom';

let schema = yup.object().shape({
  resolvedMessage: yup.string().required('Enter Your Message')
});

const ContactPage = () => {
  const formik = useFormik({
    initialValues: {
      resolvedMessage: ''
    },
    validationSchema: schema
  });

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
      title: 'Student Message',
      dataIndex: 'message'
    },
    {
      title: 'Resolved Message',
      dataIndex: 'rmessage'
    },
    {
      title: 'Resolved',
      dataIndex: 'sendmail'
    }
  ];

  useEffect(() => {
    dispatch(getAllContact());
  }, []);

  const { AllCompliants } = useSelector((state) => state.auth);
  const { updatedContact } = useSelector((state) => state.admin);
  const [data, setData] = useState([]);

  const resolveThis = (unqCode) => {
   const currentadmin = cookies.get('adminData')?.username
        const sendAllData = {
      uniqueCode: unqCode,
      resolvedMessage: formik.values.resolvedMessage,
      resolvedBy: cookies.get('adminData')?.status === 201
        ? currentadmin
        : 'N/A'
    };
    dispatch(updateContact(sendAllData));
    dispatch(getAllContact());
  };

  const callme = (e) => {
    formik.values.resolvedMessage = e.target.value;
  };

  useEffect(() => {
    if (Array.isArray(AllCompliants)) {
      const newData = AllCompliants
        .map((ele, index) => {
          if (!ele?.resolved) {
            return {
              ...ele,
              sno: index,
              rmessage: (
                <input
                  type='text'
                  name='resolvedMessage'
                  onChange={callme}
                  placeholder='Type Your Message'
                />
              ),
              sendmail: (
                <input
                  type='button'
                  className='btn btn-primary'
                  value='Resolve'
                  onClick={() => resolveThis(ele?.uniqueCode)}
                />
              )
            };
          }
          return null; // This line is added to handle unresolved elements
        })
        .filter(Boolean); // Filter out null values (unresolved elements)

      setData(newData.reverse());
    }
  }, [AllCompliants]);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newData = AllCompliants?.filter((ele, index) => {
      return ele?.collegeId.toLowerCase().includes(searchValue);
    }).map((filteredElement, filteredIndex) => {
      return {
        ...filteredElement,
        sno: filteredIndex,
        rmessage: (
          <input
            type='text'
            name='resolvedMessage'
            onChange={callme}
            placeholder='Type Your Message'
          />
        ),
        sendmail: (
          <input
            type='button'
            className='btn btn-primary'
            value='Resolve'
            onClick={() => resolveThis(filteredElement?.uniqueCode)}
          />
        )
      };
    });
    setData(newData);
  };
  
  return (
    <Watermark content={''}>
      <Meta title={'Contact'} />
            <h2 className='text-center mb-4'>Complaints</h2>
      <div className='container-xxl mt-5'>
        <div className="row">
          <div className="col-12">
            <label htmlFor="" className='me-4'>Search</label>
            <input type='text' onChange={(e)=>handleSearch(e)} placeholder='Search By Id'/>
          </div>
        </div>
            <div className="row">
          <div className="col-12 d-flex justify-content-end">
           <Link to={'/contactresolved'} > <label htmlFor="" className='text-end'style={{cursor:'pointer'}} >Resolved Complients</label></Link>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-md-12'>
            <Table columns={columns} dataSource={data} scroll={{ x: true }} />
          </div>
        </div>
      </div>
    </Watermark>
  );
};

export default ContactPage;
