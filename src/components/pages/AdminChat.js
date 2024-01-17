import React, { useEffect, useState } from 'react'
import Chat from './Chat'
import { useDispatch, useSelector } from 'react-redux';
import ChatContent from './ChatContent'
import { GetAdminChat, GetAllAdmins } from '../features/session/sessionSlice';
import { Link, useLocation } from 'react-router-dom';

const AdminChat = () => {
    const dispatch = useDispatch()
    const {adminsData}  = useSelector(state=>state.admin)
    const getChatId = useLocation().pathname.split('/')[3]
    const [adminSet,setAdminSet] = useState('')
    useEffect(()=>{
        dispatch(GetAllAdmins())
    },[])

    useEffect(()=>{
        setAdminSet(adminsData)
    },[adminsData])

    const user = localStorage.getItem('adminData') ? JSON.parse(localStorage.getItem('adminData')):""


    useEffect(()=>{
      dispatch(GetAdminChat({ username:JSON.parse(localStorage.getItem('adminData'))?.username,oppositeUsername:getChatId}));
    },[getChatId])

  return (
    <div className='contianer-xxl'>
        <div className="row">
            <div className="col-12">
                {/* <h3 className='fs-3 text-center admin-chat'>ADMIN CHAT</h3> */}
            </div>
        </div>
        <div className="row chat">
            <div className="col-6 chatleft">
                <div className='telegram'>
                    <span>We Chat</span>
                </div>
                {
                    Array.isArray(adminSet) ? (
                        adminSet.map((i, ele) => (
                          user?.username?.toString() !== i?.username?.toString() ? (
                            <Link to={`/wechat/chatcontent/${i?.username}`}>
                            <Chat key={ele} username={i?.username} img={`https://source.unsplash.com/featured/300x20${ele}`}  /></Link>
                          ) : (
                           ""
                          )
                        ))
                      ) : 
                        <label className='text-white'>No Results Found</label>
                }
            </div>
            <div className="col-6 chatright">
                    <ChatContent />
            </div>
        </div>
    </div>
  )
}

export default AdminChat