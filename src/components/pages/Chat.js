import React from 'react';

const Chat = (props) => {
  const {username,img,lastmessage} = props
  return (
    <div className='container-xxl'>
      <div className="row chatmenu">
        <div className="col-md-2 col-lg-2 m-4 chatimg">
          <img src={img} alt="" className='img-fluid' style={{ borderRadius: "50%", maxWidth: "50px", maxHeight: "50px" }} />
        </div>
        <div className="col-md-9 col-lg-9 chatcontent">
          <span className='fs-5'>{username}</span>
          <span className='fs-6'>{lastmessage}</span>
        </div>
      </div>
    </div>
  );
}

export default Chat;
