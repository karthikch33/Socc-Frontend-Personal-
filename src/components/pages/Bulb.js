import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TbHandFinger } from "react-icons/tb";
import axios from 'axios'
import { GetSessions } from '../features/session/sessionSlice';

const Bulb = () => {
  const [isOn, setIsOn] = useState(false);
  return (
    <div className="container-xxl text-center">
        <div className="row">
            <div className="col-12 d-flex justify-content-end " style={{background:"#f8f9fa"}}>
                <label htmlFor="">Make Sure Server Is On<TbHandFinger className='fs-3' style={{rotate:"90deg"}}/></label>
             <div className={`bulb ${localStorage.getItem('server')? 'on' : 'off'}`} ></div>
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
