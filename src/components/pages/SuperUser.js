import { useFormik } from 'formik'
import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import CustomtInput from '../CustomtInput'
import { emailTokenSuperUser } from '../features/session/sessionSlice'

const SuperUser = () => {
    const [tokenGen,setTokenGen] = useState(false)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues:{
            emailGenToken:''
        }
    })

    // const {} = useSelector(state=>state.admin)


    function generateRandomPin() {
        const pinLength = 7;
        let pin = '';
      
        for (let i = 0; i < pinLength; i++) {
          pin += Math.floor(Math.random() * 10);
        }
        return pin;
      }
      
      
      const EmailGenToken = ()=>{
          setTokenGen(true)
          const randomPin = generateRandomPin();
          console.log(randomPin);
          dispatch(emailTokenSuperUser(randomPin))
    }
  return (
    <div className='container-xxl'>
        <div className="row">
            <div className="col-12">
                <h3 className='text-center mt-4'>Super User Verification</h3>
            </div>
            <div className="col-12">
                <form className='' onSubmit={formik.handleSubmit}>
                     {tokenGen?<CustomtInput type="text" name="emailGenToken" onChange= {formik.handleChange('emailGenToken')} placeholder="Enter Email Gen Token"/>:""}   
                </form>
            </div>
            <div className="col-12">
                <button className='btn btn-warning d-flex justify-content-center' onClick={()=>EmailGenToken()}>Gen Token</button>
            </div>
        </div>
    </div>
  )
}

export default SuperUser