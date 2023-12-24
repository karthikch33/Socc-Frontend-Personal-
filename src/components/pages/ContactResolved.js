import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomtInput from '../CustomtInput';
import { Table, Watermark } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { contact, getAllContact, getAllContactResolved, updateContact } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Meta from '../Meta';
import { Link } from 'react-router-dom';

let schema = yup.object().shape({
  resolvedMessage: yup.string().required('Enter Your Message')
});

const ContactPageResolved = () => {
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
      dataIndex: 'resolvedMessage'
    },{
        title:'Resolved By',
        dataIndex:'resolvedBy'
    }
  ];

  useEffect(() => {
    dispatch(getAllContactResolved());
  }, []);

  const { AllCompliantsResolved } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (Array.isArray(AllCompliantsResolved)) {
      const newData = AllCompliantsResolved
        .map((ele, index) => {
          if (ele?.resolved) {
            return {
              ...ele,
              sno: index,
            };
          }
          return null; 
        })
        .filter(Boolean); 

      setData(newData.reverse());
    }
  }, [AllCompliantsResolved]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newData = AllCompliantsResolved?.filter((ele, index) => {
      return ele?.collegeId.toLowerCase().includes(searchValue);
    }).map((filteredElement, filteredIndex) => {
      return {
        ...filteredElement,
        sno: filteredIndex,
      };
    });
    setData(newData);
  };
  
  
  const dispatch = useDispatch();
  
  return (
    <Watermark content={''}>
      <Meta title={'Contact'} />
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-12'>
            <h2 className='text-center mb-4'>Complaints Resolved</h2>
            <div className="row">
          <div className="col-12 d-flex justify-content-end">
           <Link to={'/contact'} > <label htmlFor="" className='text-end'style={{cursor:'pointer'}} > Complients</label></Link>
          </div>
        </div>
          <div className='row'>
              <div className="col-12">
                <label htmlFor="" className='fs-3 my-3'>Search</label>
                <input type="text" className='ms-2' placeholder='Search By Id' onChange={(e)=>handleSearch(e)}/>
              </div>
          </div>
            <Table columns={columns} dataSource={data} scroll={{ x: true }} />
          </div>
        </div>
      </div>
    </Watermark>
  );
};

export default ContactPageResolved;
