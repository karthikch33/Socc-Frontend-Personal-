import React from 'react'
import Marquee from "react-fast-marquee";
import PlatformsData from '../static/PlatformsData';
const Platforms = () => {
  return (
    <div className="container-xxl">
        <div className="row" style={{background:"#fff"}}>
            <div className="col-12">
    <div className='marquee'>
            <Marquee>
                {
                    PlatformsData.map((element,i)=>{
                       return <div className='d-flex flex-column'>
                           <a href={element?.link}>
                        <img src={element?.img} alt=""  className='marquee-img' width={200} height={150} key={i}/>
                           </a>
                        </div>
                    })
                
                }
            </Marquee>
    </div>
            </div>
        </div>
    </div>

  )
}

export default Platforms