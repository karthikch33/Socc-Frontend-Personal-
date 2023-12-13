import React, { useState } from 'react';
import { Modal } from 'antd';
const ProfileModal = (props) => {
  const {open,name,id,mail,year,linkedIn,handleCancel,img} = props
  return (
    <>
      <Modal
        title="Profile Data"
        open={open}
        onOk={handleCancel}
        onCancel={handleCancel}
        bodyStyle={{ backgroundColor: 'white' }}
      >
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-center mb-4">
            <img src={img} alt="" className='img-fluid' width={300} height={300} style={{borderRadius:"20px"}}/>
          </div>
        </div>
        <div className='row'>
            <div className="col-12 d-flex justify-content-between">
              <label htmlFor="" className='fs-5'>Name</label>
              <p>{name}</p>
            </div>
        </div>
        <div className='row'>
            <div className="col-12 d-flex justify-content-between">
              <label htmlFor="" className='fs-5'>Id</label>
              <p>{id}</p>
            </div>
        </div>
        <div className='row'>
            <div className="col-12 d-flex justify-content-between">
              <label htmlFor="" className='fs-5'>Year</label>
              <p>{year}</p>
            </div>
        </div>
        <div className='row'>
            <div className="col-12 d-flex justify-content-between">
              <label htmlFor="" className='fs-5'>Mail</label>
              <p>{mail}</p>
            </div>
        </div>
        <div className='row'>
            <div className="col-12 d-flex justify-content-between">
              <label htmlFor="" className='fs-5'>LinkedIn</label>
              <a href={linkedIn}>Linked In</a>
            </div>
        </div>
      </Modal>
    </>
  );
};
export default ProfileModal;