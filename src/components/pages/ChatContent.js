import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { GetAdminChat, addMessageToChat } from '../features/session/sessionSlice';
import { useLocation } from 'react-router-dom';

const ChatContent = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      writeamessage: '',
    },
  });
  const [userchat,setUserChat] = useState('');
  const [oppositechat,setOppositeChat] = useState('')
  const allMessages = [...userchat, ...oppositechat].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const getChatId = useLocation().pathname.split('/')[3]
  const { adminChat, messageAdded } = useSelector((state) => state.admin);


  useEffect(() => {
    const { userMessages = [], oppositeUserMessages = [] } = typeof adminChat === 'object' ? adminChat : {};
    setUserChat(userMessages)
    setOppositeChat(oppositeUserMessages)
  }, [adminChat]);

  useEffect(() => {
   dispatch(GetAdminChat({ username:JSON.parse(localStorage.getItem('adminData'))?.username,oppositeUsername:getChatId}));
  }, [messageAdded]);



  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dispatch(
        addMessageToChat({
          username: JSON.parse(localStorage.getItem('adminData'))?.username,
          message: formik.values.writeamessage,
          oppositeUser:getChatId,
        })
      );
      formik.setFieldValue('writeamessage', '');
    }
  };


  return (
    <div className="row">
      <div className="col-12">
        <div className="chatcontenttopleft">
          <span>{getChatId}</span>
          <span>Last Seen Recently</span>
        </div>
        <div className="chatcontenttopright"></div>
      </div>
      <div className="row messages">
        <div className="col-12 ">
        {Array.isArray(allMessages) &&
  allMessages.map((elem, i) => (
    <div key={i} className="w-100">
      {elem.sender === JSON.parse(localStorage.getItem('adminData'))?.username ? (
        <div className="text-info text-end p-1 mt-5">
          <span style={{ background: '#33393f', float: 'right', padding: '9px' }}>
            You: {elem?.content}
          </span>
        </div>
      ) : (
        <div className="text-white text-start p-1 mt-5">
          <span className="text-white text-start p-3" style={{ background: '#33393f' }}>
            {elem?.sender}: {elem?.content}
          </span>
        </div>
      )}
    </div>
  ))}
        </div>
      </div>
      <div className="message">
        <input
          type="text"
          onChange={formik.handleChange('writeamessage')}
          value={formik.values.writeamessage}
          placeholder="Write a Message"
          className="typemessage"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default ChatContent;
