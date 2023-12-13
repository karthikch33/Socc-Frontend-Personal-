import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import CustomtInput from '../CustomtInput'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { registrationSlice, resetState } from '../features/auth/authSlice'
import { GetSession } from '../features/session/sessionSlice'
import CustomAlert from '../CustomAlert'
import Meta from '../Meta'
const SessionRegistraion = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {AlreadyRegisterd} = useSelector(state=>state.auth)
    const {Session} = useSelector(state=>state.admin)

    let schema = yup.object().shape({
        registerid:yup.string().required('Registration Id Is Required'),
        year:yup.number().required('Select Your Year'),
        registername: yup.string().required('Name is Required')
    })

    useEffect(()=>{
             if(AlreadyRegisterd?.registerid !== undefined)
            {
                toast.success('Registration Successfull And Mail Has Been Generated')
                setTimeout(()=>{
                    navigate('/sessions')
                },3500) 
                dispatch(resetState())
            }
            else if(AlreadyRegisterd?.message === "Registration Completed For this Id"){
                toast.error("Registration Completed For This ID ")
                dispatch(resetState())
            }
    },[AlreadyRegisterd,dispatch,navigate])


    const location = useLocation()
    const getSessionId = location.pathname.split('/')[2]


    const [SessionContent,setSessionContent] = useState(Session)

    useEffect(()=>{
        if(getSessionId!==undefined)
        {
            dispatch(GetSession(getSessionId))
        }
    },[getSessionId,dispatch])

    useEffect(()=>{
        setSessionContent(Session)
    },[Session])


    const formik = useFormik({
        initialValues:{
            registerid:"",
            registername:"",
            year:'',
            date: '' ,
            venue:'' ,
            startAt:'' ,
            ends:'',
            EventReg:'',
        },
        validationSchema:schema,
        onSubmit:(values)=>{    
            formik.values.EventReg =  Session?.sessiontitle  
            dispatch(registrationSlice(values))
            formik.resetForm()
        }
    })



    if(typeof SessionContent === 'object')
    {
            formik.values.date = Session?.date
            formik.values.venue = Session?.venue
            formik.values.startAt = Session?.startAt
            formik.values.ends = Session?.ends
    }

  return (
    <div className='container-xxl'>
        <Meta title="Registrations"/>
        <CustomAlert/>
        <div className="row">
            <div className="col-12">
                {
             <form action="" className='my-4 submit-form' onSubmit={formik.handleSubmit}>
                        <h4>{`${Session?.sessiontitle} Registrations `}</h4>
                        <CustomtInput type="text" placeholder="Enter Your Id" name='registerid' onChange={formik.handleChange('registerid')} value={formik.values.registerid}/>


                        <div className="error">
                        {
                            formik.touched.registerid && formik.errors.registerid
                        }
                        </div>

                        <CustomtInput type="text" placeholder="Enter Your Name" name='registername' onChange={formik.handleChange('registername')} value={formik.values.registername}/>


                        <div className="error">
                        {
                            formik.touched.registername && formik.errors.registername
                        }
                        </div>

                        <select className='form-select CustomtInput' name='year' value={formik.values.year} onChange={formik.handleChange('year')} onBlur={formik.handleBlur('year')}>
                            <option selected value={0}>Select Your Year</option>
                            <option value={1}>First Year</option>
                            <option value={2}>Second Year</option>
                            <option value={3}>Third Year</option>
                        </select>

                        <div className="error">
                        {
                            formik.touched.year && formik.errors.year
                        }
                        </div>
                        <CustomtInput type="date" placeholder={"Date"} disabled={true} value={formik.values.date}/>

                        <CustomtInput type="time" placeholder={"Starts At"} disabled={true} value={formik.values.startAt}/>

                        <CustomtInput type="time" placeholder={"Ends"} disabled={true} value={formik.values.ends}/>

                        <CustomtInput type="text" placeholder={"Venue"}  disabled={true} value={formik.values.venue} />

                        <div className='col-12 d-flex justify-content-between'>
                        <Link to={'/sessions'}><button className='btn btn-primary'>Go Back</button></Link>
                        <button className='btn btn-primary submit-button' type='submit'>Register</button>
                        </div>
                </form>
}
            </div>
        </div>
    </div>
  )
}

export default SessionRegistraion