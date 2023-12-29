import React, { useEffect } from 'react'
import SwiperContainer from '../SwiperContainer'
import Banner from './Banner'
import Platforms from './Platforms'
import Hexagon from './Hexagon'
import HexagonData from '../static/HexagonData'
import Meta from '../Meta'
import { useDispatch } from 'react-redux'
import { GetSessions } from '../features/session/sessionSlice'
import TimerComponentForServer from './TimerComponentForServer'


const Home = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(GetSessions())    
  },[])
  return (  
    <>
    <Meta title="Home | SOCC Official"/>
    <div className='contianer-xxl'>
    <div className="row">
            <div className="col-12">
              <Banner/>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <h3 className='text-center fs-1 fw-bolder my-5'>Popular Languages</h3>
              <div className='d-flex flex-wrap justify-content-center'>
              {
                HexagonData.map((element,i)=>{
                 return <div className='col-lg-4 col-md-6 col-sm-12 mb-4'>
                 <Hexagon key={i} language={element?.language} logo={element?.logo}/>
                 </div>
                })
              }
              {/* <TimerComponentForServer/> */}
               </div>
            </div>
        </div>
          
        <div className="row">
          <div className="col-12">
            <h3 className='text-center fs-1 fw-bolder my-5'>Coding Platforms </h3>
              <Platforms/>
          </div>
        </div>
              
        <div className="row" >
            <div className="col-12">
              <h3 className='text-center fs-1 fw-bolder my-5'>Memories</h3>
                    <SwiperContainer/>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home