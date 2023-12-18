import axios from 'axios'
import url from "../../utils/base_url"; 
const serverOnOrOff = async()=>{
    const response = await axios.get(`${url}auth/serveronoroff`)
    return response.data
}

const serverServices = {
    serverOnOrOff
}

export default serverServices