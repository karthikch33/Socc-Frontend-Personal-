import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Button, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { attendance, attendanceSave, resetState } from '../features/auth/authSlice';
import {useLocation, useNavigate} from 'react-router-dom'
import { GetSession } from '../features/session/sessionSlice';



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
      title: 'Present',
      dataIndex: 'present',
      render: (text, record) => (
        <Checkbox
          checked={text}
          onChange={(e) => handleCheckboxChange(record, 'present', e.target.checked)}
        />
      ),
    },
    {
      title: 'Absent',
      dataIndex: 'absent',
      render: (text, record) => (
        <Checkbox
          checked={text}
          onChange={(e) => handleCheckboxChange(record, 'absent', e.target.checked)}
        />
      ),
    },
  ];

  const location = useLocation()
  const getLocation = location.pathname.split('/')[2]
  const {Session} = useSelector(state=>state.admin)
  const {AttendanceSave} = useSelector(state=>state.auth)
  const [alert,setAlert] = useState(false)

  useEffect(()=>{
    if(getLocation !== undefined)
     dispatch(GetSession(getLocation))
  },[getLocation])

  useEffect(() => {
    const eventNamePayload = { EventName: Session?.sessiontitle };
    dispatch(attendance(eventNamePayload));
  }, [Session]);

  useEffect(()=>{
    if(AttendanceSave === 200)
    {
      setAlert(true)
      setTimeout(()=>{
        setAlert(false)
        navigate('/attendance')
      },2000)
      setTimeout(()=>{
        dispatch(resetState())
      },4000)
    }
  },[AttendanceSave])

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { AttendanceRegister } = useSelector((state) => state.auth);

  useEffect(() => {
    if(AttendanceRegister?.data?.status === 306)
    {
        navigate('/attendance')
    }
    if (Array.isArray(AttendanceRegister?.data?.findRegisterd)) {
      const newData = AttendanceRegister?.data?.findRegisterd?.map((ele, index) => ({
        ...ele,
        sno: index + 1,
        present: false,
        absent: false,
      }));
      setData(newData);
    }
  }, [AttendanceRegister]);


  const handleCheckboxChange = (record, field, value) => {
    const newData = data.map((item) =>
      item.registerid === record.registerid ? { ...item, [field]: value } : item
    );
    setData(newData);
  };

  const handleSubmitAttendance = () => {
    dispatch(attendanceSave(data))

  };

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
     {alert &&  <Alert message="Attendance Submitted" type="success"/>}
      <div className="row">
        <div className="col-12">
          <Table columns={columns} dataSource={data} />;
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center mt-3">
          <Button type="primary" onClick={handleSubmitAttendance}>
            Submit Attendance
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Attendance;
