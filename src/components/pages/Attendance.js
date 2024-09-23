import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Button, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { attendance, attendanceSave, resetState } from '../features/auth/authSlice';
import {useLocation, useNavigate} from 'react-router-dom'
import { GetSession } from '../features/session/sessionSlice';
import * as XLSX from 'xlsx';



const Attendance = () => {
  const navigate = useNavigate()
  const columns = [
    {
      title: 'S NO',
      dataIndex: 'sno',
    },
    {
      title: 'Student Id',
      dataIndex: 'registerid',
    },
    {
      title: 'Student Name',
      dataIndex: 'registername',
    },
    {
      title: 'Check For Absent',
      dataIndex: 'absent',
      render: (text, record) => (
        <Checkbox
          checked={text}
          onChange={(e) => handleCheckboxChange(record, 'absent', e.target.checked)}
        />
      ),
    }
  ];

  const location = useLocation()
  const getLocation = location.pathname.split('/')[2]
  const {Session} = useSelector(state=>state.admin)
  const {AttendanceSave} = useSelector(state=>state.auth)
  const [alert,setAlert] = useState(false)
  const [firstTime,setFirstTime] = useState(true)

  useEffect(()=>{
    if(getLocation !== undefined)
     dispatch(GetSession(getLocation))
  },[getLocation])

  useEffect(() => {
    const eventNamePayload = { EventName: Session?.sessiontitle };
    if(eventNamePayload)  
      dispatch(attendance(eventNamePayload));
  }, [Session]);

  useEffect(()=>{
    if(AttendanceSave === 200)
    {
      setAlert(true)
      setTimeout(()=>{
        setAlert(false)
        dispatch(resetState())
        navigate('/attendance')
      },2000)
    }
  },[AttendanceSave])



  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { AttendanceRegister } = useSelector((state) => state.auth);

  useEffect(() => {
    if(AttendanceRegister?.data?.status === 306)
    {
      setFirstTime(false)
    }
    else
    setFirstTime(true)
    if (Array.isArray(AttendanceRegister?.data?.findRegisterd)) {
      const newData = AttendanceRegister?.data?.findRegisterd?.map((ele, index) => ({
        ...ele,
        sno: index + 1,
      }));
      setData(newData);
    }
  }, [AttendanceRegister]);

  // spread operator like fullobject and want to add another column named watch = const newobj = {...fulllobject,watch:"fastrack"}


  const handleCheckboxChange = (record, field, value) => {
    // console.log(value);
    const newData = data.map((item) =>
      item.registerid === record.registerid ? { ...item, [field]: value} : item
    );
    setData(newData);
  };

  const handleSubmitAttendance = () => {
    dispatch(attendanceSave(data))
  };

  const handleExcelSheet = ()=>{
    window.location.reload()
    const worksheet = XLSX.utils.json_to_sheet(AttendanceRegister?.data?.findFromAttendance?.Attended);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'table_data.xlsx');
  }

  return (
    <div className="container-xxl">
      <div className="row">
        <div className="col-12">
        <h3 className='fs-3 text-center my-3'>
            Attendance Register 
            {/* Event For {AttendanceRegister?.data?.findRegisterd[0]?.EventReg || ''} */}
          </h3>
        </div>
      </div>
     {alert &&  <Alert message="Attendance Submitted" type="success" className='text-center'/>}
     {firstTime !==true &&  <Alert message="Attendance Submitted for This Event Reload For Confirmation" type="info" className='text-center my-4'/>}
      <div className="row">
        <div className="col-12">
        {firstTime === true ? <Table columns={columns} dataSource={data} /> :""}  
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center mt-3">
           {firstTime === true ?<Button type="primary" onClick={handleSubmitAttendance}> Submit Attendance</Button> :""} 
           {firstTime !== true ?<Button type="" className='btn-success' onClick={handleExcelSheet}> Download Excel Sheet</Button> :""} 
        </div>
      </div>
    </div>
  )
}

export default Attendance
