import axios from "axios"
import url from "../../utils/base_url"

const registerSessionService = async (sessionData)=>{
    console.log(sessionData);
    const response = await axios.post(`${url}admin/sessionregister`,sessionData)
    console.log(response.data);
    return response.data
}

const SessionsService = async()=>{
    const response = await axios.get(`${url}admin/getallsessions`)
    return response.data
}

const SessionService = async(sessionId)=>{
    const response = await axios.get(`${url}admin/getsession/${sessionId}`)
    return response.data
}

export const adminLoginService = async(loginData)=>{
    const response = await axios.post(`${url}admin/adminlogin`,loginData)
    return response.data
}


const sessionServices = {
    registerSessionService,
    SessionsService,
    SessionService,
    adminLoginService
}

export default sessionServices