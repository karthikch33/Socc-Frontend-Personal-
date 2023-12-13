import React, { useState } from 'react';
import { Image, Watermark } from 'antd';
import TeamData from '../static/TeamData';
import Meta from '../Meta';
import ProfileModal from './ProfileModal';

const previewName =(props)=>{
  const {name} = props
  return <div>
  <label htmlFor="">{name}</label>
</div>
} 





const Team = () => {
  const [open, setOpen] = useState(false);
  const [name,setName] = useState("")
  const [id,setId] = useState("")
  const [mail,setMail] = useState("")
  const [img,setImg] = useState("")
  const [year,setYear] = useState("")
  const [linkedIn,setLinkedIn] = useState("")

  const handleOk = (data) => {
    const {Iname,Iid,Imail,Iyear,IlinkedIn,img} = data
    setOpen(true);
    setName(Iname)
    setId(Iid)
    setMail(Imail)
    setLinkedIn(IlinkedIn)
    setYear(Iyear)
    setImg(img)
  };

  const handleCancel = () => {
    setOpen(false);
  };
  

  const antImageMaskInfo = document.querySelector('.container');

  if (antImageMaskInfo) {
    antImageMaskInfo.addEventListener('click', () => {
      console.log("clicked");
    });
  }

  return (
    <Watermark content="SOCC TEAM">
      <Meta title={'Team'}/>
    <div className='container'>
      <div className="row">
        <div className="col-12">
          <h3 className='text-center m-4 fst-italic fw-bolder'>Team</h3>
        </div>
      </div>
      <div className='row'>
        {TeamData.map((index) => (
          <div key={index} className='col-lg-4 col-md-6 col-sm-12 mb-4'>
            <div className='gallery-img d-flex flex-column align-items-center'>
              {/* <Image
                width={200}
                src={}
                alt={`Team Member ${index}`}
                className='img-fluid'
                preview="fasf"
              /> */}
              <img src={index?.img} alt="" className='img-fluid' style={{maxHeight:"200px",maxWidth:"200px",cursor:"pointer",borderRadius:"20px"}}onClick={()=>handleOk(index)}/>
              <span className='fs-4 fst-italic'>{index?.position}</span>
            </div>
           
          </div>
        ))}
      </div>
      <ProfileModal open={open} name={name} id={id} mail={mail} year={year} linkedIn={linkedIn} handleOk={handleOk} handleCancel ={handleCancel} img={img}/>
    </div>
    </Watermark>
  );
};

export default Team;
