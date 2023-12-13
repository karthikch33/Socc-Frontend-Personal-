import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetSessions } from '../features/session/sessionSlice'
import { Table } from 'antd';
import { Link } from 'react-router-dom';

const AttendancePage = () => {


    const columns = [
        {
          title: 'S NO',
          dataIndex: 'sno',
        },
        {
          title: 'Event Image',
          dataIndex: 'images',
        },
        {
            title: 'Event Name',
            dataIndex: 'sessiontitle',
        },
        {
          title: 'Attendance',
          dataIndex: 'post',
        },
      ];

      const [data, setData] = useState([]);

      const dispatch = useDispatch()
      const {AllSessions} = useSelector(state=>state.admin)
      const [sessionsData,setSessionsData] = useState([])

      useEffect(()=>{
        dispatch(GetSessions())    
      },[])
    
      useEffect(()=>{
        setSessionsData(AllSessions)
      },[AllSessions])

      useEffect(() => {
        if (Array.isArray(sessionsData)) {
          const newData = sessionsData?.map((ele, index) => ({
            sno:index,
            sessiontitle:ele?.sessiontitle,
            images:<img src={ele?.images} className='img-fluid' style={{maxHeight:"100px",maxWidth:"80px"}} alt='Event Img'/>,
            post:<Link to={ele?._id}> <span className='text-primary' style={{cursor:"pointer"}}>Post</span></Link>
          }));
          setData(newData.reverse());
        }
      }, [sessionsData]);

   
    
  
  return (
    <div className='container-xxl'>
        <div className="row">
            <div className="col-12">
            <Table columns={columns} dataSource={data} />;
            </div>
        </div>
    </div>
  )
}

export default AttendancePage