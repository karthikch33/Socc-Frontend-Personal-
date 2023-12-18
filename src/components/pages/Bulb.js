import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TbHandFinger } from "react-icons/tb";
import { serverOnOrOff } from '../features/server/serverSlice';

const Bulb = () => {
  const dispatch =useDispatch()
  useEffect(() => {
    yourFunction()
    const intervalId = setInterval(yourFunction, 50000); 
    return () => clearInterval(intervalId);
  }, []); 

  
  const yourFunction = () => {
    dispatch(serverOnOrOff());
    console.log('server condition');
  };
  
  return (
    <div className="container-xxl text-center">
        <div className="row">
            <div className="col-12 d-flex justify-content-end " style={{background:"#f8f9fa"}}>
                <label htmlFor="">Make Sure Server Is On<TbHandFinger className='fs-3' style={{rotate:"90deg"}}/></label>
                {localStorage.getItem('server')?<div className={`bulb on`} ></div>:<div className={`bulb off`} ></div>}
             </div>
        </div>
             <div className="row">
                <div className="col-12 d-flex justify-content-end">
             <label htmlFor="" className='' style={{fontSize:"10px"}}>(Reload For Confirmation)</label>
                </div>
            </div>
    </div>
  );
};

export default Bulb;
