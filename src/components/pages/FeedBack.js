import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import CustomAlert from '../CustomAlert'
import Rating from 'react-rating-stars-component';
import Meta from '../Meta'
import { useDispatch, useSelector } from 'react-redux'
import { GetSession } from '../features/session/sessionSlice'
import { feedback } from '../features/auth/authSlice'
const FeedBack = () => {

   
    const [rating1, setRating1] = useState(0);
    const [rating2, setRating2] = useState(0);
    const [rating3, setRating3] = useState(0);
    const [rating4, setRating4] = useState(0);

    const handleRatingChange1 = (newRating) => {
        setRating1(newRating);
    };
    const handleRatingChange2 = (newRating) => {
        setRating2(newRating);
    };
    const handleRatingChange3 = (newRating) => {
        setRating3(newRating);
    };
    const handleRatingChange4 = (newRating) => {
        setRating4(newRating);
    };

    const {Session} = useSelector(state=>state.admin)
    const dispatch = useDispatch()


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
            course_content:rating1,
            teaching_methods:rating2,
            feedback_communication:rating3,
            overall_satisfaction:rating4,
            session_title:SessionContent?.sessiontitle
        },
        onSubmit:(values)=>{
            formik.values.course_content = rating1
            formik.values.teaching_methods = rating2
            formik.values.feedback_communication = rating3
            formik.values.overall_satisfaction = rating4
            formik.values.session_title = SessionContent?.sessiontitle
            dispatch(feedback(values))
        }
    })
    
  return (
    <div className='container-xxl'>
        <Meta title="Registrations"/>
        <CustomAlert/>
        <div className="row">
            <div className="col-12">
            <form action="" className='my-4 submit-form' onSubmit={formik.handleSubmit}>
    <h2 className='mb-4'>{`${Session?.sessiontitle} FeedBack `}</h2>

    <div className='star'>
        <div className="row">
            <div className="col-sm-6">
                <label htmlFor="" className='my-2 me-4'>Course Content:</label>
            </div>
            <div className="col-sm-6">
                <Rating
                    count={5}
                    onChange={handleRatingChange1}
                    size={24}
                    value={rating1}
                    color="grey"
                    activeColor="orange"
                />
            </div>
        </div>
        <p className='my-1'>Selected Rating: {rating1}</p>
    </div>

    <div className='star my-5'>
        <div className="row">
            <div className="col-sm-6">
                <label htmlFor="" className='my-2 me-4'>Teaching Methods:</label>
            </div>
            <div className="col-sm-6">
                <Rating
                    count={5}
                    onChange={handleRatingChange2}
                    size={24}
                    value={rating2}
                    color="grey"
                    activeColor="orange"
                />
            </div>
        </div>
        <p className='my-1'>Selected Rating: {rating2}</p>
    </div>

    <div className='star my-5'>
        <div className="row">
            <div className="col-sm-6">
                <label htmlFor="" className='my-2 me-4'>Feedback and Communication:</label>
            </div>
            <div className="col-sm-6">
                <Rating
                    count={5}
                    onChange={handleRatingChange3}
                    size={24}
                    value={rating3}
                    color="grey"
                    activeColor="orange"
                />
            </div>
        </div>
        <p className='my-1'>Selected Rating: {rating3}</p>
    </div>

    <div className='star my-5'>
        <div className="row">
            <div className="col-sm-6">
                <label htmlFor="" className='my-2 me-4'>Overall Satisfaction:</label>
            </div>
            <div className="col-sm-6">
                <Rating
                    count={5}
                    onChange={handleRatingChange4}
                    size={24}
                    value={rating4}
                    color="grey"
                    activeColor="orange"
                />
            </div>
        </div>
        <p className='my-1'>Selected Rating: {rating4}</p>
    </div>

    <div className='col-12 d-flex justify-content-between my-5'>
        <Link to={'/sessions'}>
            <button className='btn btn-primary'>Go Back</button>
        </Link>
        <button className='btn btn-primary submit-button' type='submit'>Submit</button>
    </div>
</form>

            </div>
        </div>
    </div>
  )
}

export default FeedBack