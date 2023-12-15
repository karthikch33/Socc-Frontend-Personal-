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

export const superUserMailGenerator = async(emailToken)=>{
    const response = await axios.post(`${url}admin/sendtokenforsuperuser`,{token:emailToken})
    return response.data
}

export const deleteSuperUserToken = async(emailToken)=>{
    const response = await axios.post(`${url}admin/deletetokenfromsuperuser`,{token:emailToken})
    return response.data
}

export const getSuperUserToken = async(emailToken)=>{
    const response = await axios.post(`${url}admin/gettokenfromsuperuser`,{token:emailToken})
    return response.data
}

export const adminRegisterService = async(registerData)=>{
    const respsone = await axios.post(`${url}admin/adminregisterunknown`,registerData)
    return respsone.data
}


const sessionServices = {
    registerSessionService,
    SessionsService,
    SessionService,
    adminLoginService,
    superUserMailGenerator,
    deleteSuperUserToken,
    getSuperUserToken,
    adminRegisterService
}

export default sessionServices