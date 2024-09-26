import React, { useEffect, useState } from 'react';
import { Image } from 'antd';
import CardContainer from '../CardContainer';
import { useDispatch, useSelector } from 'react-redux';
import { GetSessions } from '../features/session/sessionSlice';
import Loading from './Loading';
import Meta from '../Meta';

const PastSessions = () => {

  const dispatch = useDispatch()
  const {AllSessions} = useSelector(state=>state.admin)

  const [sessionsData,setSessionsData] = useState([])
  const [date,setDate] = useState(null)
  
  useEffect(()=>{
    dispatch(GetSessions())    
  },[])

  useEffect(()=>{
    setSessionsData(AllSessions)
  },[AllSessions])

 useEffect(()=>{
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const today = `${year}-${month+1}-${day}`
    setDate(today)
  },[])

  const compareTwoDates = (x,y)=>{
    const date1 = new Date(x)
    const date2 = new Date(date)

    if (date1.getTime() < date2.getTime()) {
        return true
      } else if (date1.getTime() > date2.getTime()) {
        return false
      } else {
        return false
      }
  }

  const completeSessionDescription = (currentData)=>{
      return <>
      <div className="row">
        <div className="col-12">
          <div className="imgdiv d-flex justify-content-center align-items-center">
            <Image
              style={{maxHeight:"250px",maxWidth:"250px",minHeight:"250px",minWidth:"250px"}}
              src={currentData?.images}
              className='img-fluid'
          />
          </div>
        </div>
      </div>
      <div className='row'>
          <div className="col-12">
            <ul>
              <li>
            <label htmlFor="" className='fs-4'>Date : </label> 
            <span className='fs-6 mx-3'>{currentData?.date}</span>
              </li>
              <li>
                <label htmlFor="" className='fs-4'>Timings :</label>
                <span className='fs-6 mx-3'>{`${currentData?.startAt} - ${currentData?.ends}`}</span>
              </li>
              <li>
                <label htmlFor="" className='fs-4'>Venu :</label>
                <span className='fs-6 mx-3'>{currentData?.venue}</span>
              </li>
            </ul>
          </div>
      </div>
    </>
  }

  const completeOutComeDescription = (currentData)=>{

    const outcome = currentData?.outcomes || ""

    const splitOutcome = outcome.split('%%').map(str=>str.trim())
    return (
      <>
      <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            // marginTop: "20px",
            fontFamily: "monospace",
            fontSize: "24px",
            color: "#333",
          }}
        >
          Topics Specified
        </h2>
      <div style={{ overflowY: "scroll", height: "400px", padding: "20px" }}>
        
    
        <ol style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          {splitOutcome.map((item, index) => (
            <li
              key={index}
              style={{
                backgroundColor: "#fff",
                padding: "15px",
                margin: "10px 0",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "18px",
                  color: "#333",
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ol>
      </div>
      </>
    );
    
  }

  const completeHistoryDescription = (currentData)=>{
    return (
      <>
        <div className='row d-inline animated fadeIn' style={{ marginBottom: '10px' }}>
          <p className='fs-5 text-success'>
            <span style={{ fontWeight: 'bold', marginRight: '10px', color: '#28a745' }}>Points For Registration:</span>
            <span style={{ color: '#000' }}>{currentData?.silincrease?currentData?.silincrease:'N/A'}</span>
          </p>
        </div>
        <div className='row d-inline animated fadeIn' style={{ marginBottom: '10px' }}>
          <p className='fs-5 text-danger'>
            <span style={{ fontWeight: 'bold', marginRight: '10px', color: '#dc3545' }}>Penalty Points:</span>
            <span style={{ color: '#000' }}>{currentData?.sildecrease?currentData?.sildecrease:'N/A'}</span>
          </p>
        </div>
      </>
    );
  }

  const completeSessionOrganizer  = (currentData)=>{
    return (
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"400px",maxHeight:"400px"}}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "100px",
            padding: "20px",
            // backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            maxWidth: "400px",
            margin: "0 auto"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label
              htmlFor=""
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#333",
                marginRight: "10px"
              }}
            >
             Instructor:
            </label>
            <span
              style={{
                fontSize: "16px",
                color: "#007BFF",
                fontWeight: "500",
              }}
            >
              {currentData?.instructor || "N/A"}
            </span>
          </div>
    
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label
              htmlFor=""
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#333",
                marginRight: "10px"
              }}
            >
              Session Manager:
            </label>
            <span
              style={{
                fontSize: "16px",
                color: "#007BFF",
                fontWeight: "500",
              }}
            >
              {currentData?.manager || "N/A"}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label
              htmlFor=""
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#333",
                marginRight: "10px"
              }}
            >
              Strength Remaining:
            </label>
            <span
              style={{
                fontSize: "16px",
                color: "#007BFF",
                fontWeight: "500",
              }}
            >
              {currentData?.strength || 0}
            </span>
          </div>
        </div>
      </div>
    );
    
  }

  return (
    <div className='container-xxl'>
      <Meta title={'Sessions'}/>
      <div className="row">
        <div className="col-12">
          <h4 className='fs-2 fw-bold my-4'>Past Sessions</h4>
        </div>
      </div>
      {
       <div className="container">
       <div className="row">
         {Array.isArray(sessionsData) ? (
           sessionsData.map(element => {
             const sessionDescription = completeSessionDescription(element);
             const outcomeDescription = completeOutComeDescription(element);
             const historyDescription = completeHistoryDescription(element);
             const organizerDescription = completeSessionOrganizer(element);
 
             return compareTwoDates(element?.date, date) ? (
               <div key={element?._id} className="col-md-4 mb-4">
                 <CardContainer
                   sessionDescription={sessionDescription}
                   outcomeDescription={outcomeDescription}
                   sessionId={element?._id}
                   sessiontitle={element?.sessiontitle}
                   today={false}
                   history={historyDescription}
                   organizer = {organizerDescription}
                 />
               </div>
             ) : null;
           }).reverse()
         ) : (
           <Loading />
         )}
       </div>
     </div>
    } 
    </div>
  );
}

export default PastSessions;

