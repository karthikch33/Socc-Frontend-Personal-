import React from 'react'
import { Progress, Space } from 'antd';
import { FaPen } from "react-icons/fa"
const Profile = () => {
  return (
    <div className='container-xxl' style={{minHeight:"80vh"}}>
      <div className="row">
        <div className="col-12">
          <h3 htmlFor="" className='fs-1 text-white ls-normal' >PROFILE</h3>
        </div>
      </div>
      <div className="row position-relative">
        <div className="col-12" style={{height:"80px"}}>
        <img src="https://images.pexels.com/photos/573130/pexels-photo-573130.jpeg?cs=srgb&dl=pexels-zulian-yuliansyah-573130.jpg&fm=jpg" alt="backgroundBanner" className='img-fluid' style={{width:"100%",height:"100%"}} height={20}/>
        </div>
        <div className='row position-absolute justify-content-center' style={{top:"20px"}}>
            <img src="http://res.cloudinary.com/dpkdi73b4/image/upload/v1701939540/uo6fzhhmmlwicq6dnsma.jpg" alt="profile" style={{width:"120px",height:"90px",borderRadius:"50%"}}/>
        </div>
        <div className='d-flex position-absolute justify-content-center' style={{top:"10px",left:"20px"}}>
        <FaPen className='fs-3 ' style={{color:"blueviolet",background:"white",borderRadius:"50%",cursor:'pointer'}}/>
        </div>

      </div>

      <div className="row mt-5 ">
        <div className="col-6 ">
          <h3 className='fs-1 text-white'>Details</h3>
          <form  className='bg-white p-4' style={{borderRadius:"20px"}} >
          <input className='form-control mt-3'type='text' placeholder='UserName'/>
          <input className='form-control mt-3'type='text' placeholder='FirstName'/>
          <input className='form-control mt-3'type='text' placeholder='LastName'/>
          <input className='form-control mt-3'type='text' placeholder='Email'/>
          <input className='form-control mt-3'type='text' placeholder='Mobile'/>
          </form>
        </div>
        <div className="col-6">
        <h3 className='fs-1 text-white'>Progress</h3>
        <form className='bg-white p-4' style={{borderRadius:"20px"}} >
        <Space wrap className='bg-white p-4 justify-content-between d-flex' >
        <Progress type="circle" percent={75} strokeColor={'yellow'}/>
        <span>Compliants</span>
        <Progress type="circle" percent={7} strokeColor={'pink'}/>
        <span>Compliants</span>
        </Space>
        <Space wrap className='bg-white p-4 justify-content-between d-flex' >
        <Progress type="circle" percent={75} />
        <span>Resolved</span>
        <Progress type="circle" percent={70}  />
        <span>Compliants</span>
        </Space>
        </form>
        </div>
      </div>

      
    </div>
  )
}

export default Profile












