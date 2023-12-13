import React from 'react'
import { Alert, Watermark } from 'antd';
import Marquee from 'react-fast-marquee';
import CodingCards from '../CodingCards';
import Meta from '../Meta';

const CodingChannels = () => {

  return (
    <div>
      <Meta title={'Channels'}/>
        <Alert
    banner
    message={
      <Marquee pauseOnHover gradient={false}>
        Note: Channels listed for educational purposes only.
        We make no representations or warranties regarding the accuracy, completeness, or suitability of the information provided by these channels &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp; 
      </Marquee>
    }
        />

    <div className="con">
        <div className="row">
            <div className="col-12">
                <h4 className='text-center my-4 fs-2 fw-bolder'>Web Development Channels</h4> 
            </div>
        </div>
        <div className="row">

            <div className="col-12">
                <CodingCards src="https://yt3.googleusercontent.com/m-FbG7zwy9uuelkhgj4BqkpSGuL29FCDaibjs6P5KmmACUgm5N4iAk2SbJNuHK7dBqUEvSEf=s176-c-k-c0x00ffffff-no-rj" title="Coder Dost" />
            </div>
        </div>
    </div>

    </div>
  )
}

export default CodingChannels