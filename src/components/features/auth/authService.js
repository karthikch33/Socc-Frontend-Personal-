import axios from "axios";
import url from "../../utils/base_url"; 


const registrationService = async(registerdata)=>{
    try {
        const response = await axios.post(`${url}auth/register`, registerdata);
        console.log("Server Response:", response);
        return response.data;
    } catch (error) {
        return error.response.data
    }
}

const attendaceRegisterService = async(EventName)=>{
    try {
        const response = await axios.post(`${url}auth/attendance`,EventName)
        return response
    } catch (error) {
        return error?.response?.data
    }
}

const attendaceSaveService = async(AttendedDetails)=>{
    try {
        const response = await axios.post(`${url}auth/attendancesave`,AttendedDetails)
        return response
    } catch (error) {
        return error?.response?.data
    }
}

const contactService = async(contactData)=>{
    try {
        const response = await axios.post(`${url}auth/contact`,contactData)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const feedbackService = async(FeedBackData)=>{
    try {
        const response = await axios.post(`${url}auth/feedback`, FeedBackData)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response.data);
        throw error; // Rethrow the error to propagate it
    }
    
}

const authSerivces = {
    registrationService,
    contactService,
    feedbackService,
    attendaceRegisterService,
    attendaceSaveService
}

export default authSerivces