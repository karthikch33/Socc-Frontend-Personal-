import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { GetSession } from '../features/session/sessionSlice';
import { Typeahead } from 'react-bootstrap-typeahead';
import { getAllRegistersSlice } from '../features/auth/authSlice';

const FetchRegisters = () => {
    const formik = useFormik({
        initialValues:{
            registers:''
        }
    })
    const columns = [
        {
            title:"S NO",
            dataIndex:"sno"
        },
        {
            title:"Student Id",
            dataIndex:"registerid"
        },
        {
            title:"Student Name",
            dataIndex:"registername"
        },
        {
            title:"Student Year",
            dataIndex:"year"
        },
    ]
    const [data,setData] = useState(null);
    const {AllRegisters} = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const handleEvent = ()=>{
        dispatch(getAllRegistersSlice({sessiontitle:formik.values.registers}))
    }

    useEffect(()=>{
        if(Array.isArray(AllRegisters?.data))
        {
            setData(AllRegisters?.data.map((element,index)=>{
              return {
                ...element,
                sno:index
              }
            }))
        }
    },[AllRegisters])

  return (
    <div class="container">
    <div class="row">
        <div class="col-lg-10 col-md-12 d-flex">
            <span htmlFor="" class='text-info fs-4 text-nowrap me-3 mt-3' style={{fontFamily:"cursive"}}>Search By Event</span>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search Registers By Event" aria-label="Recipient's username" aria-describedby="basic-addon2" name='registers' value={formik.values.registers} onChange={formik.handleChange('registers')}/>
                <div class="input-group-append">
                    <button class="input-group-text btn-info text-white p-3 p-md-4" id="basic-addon2" onClick={handleEvent}><FaSearch /></button>
                </div>
            </div>
        </div>
    </div>
    <div className='row justify-content-center'>
          <div className='col-md-12'>
            <Table columns={columns} dataSource={data} scroll={{ x: true }} />
          </div>
        </div>
</div>

  )
}

export default FetchRegisters