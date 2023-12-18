import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminServices from "./sessionService";
import { toast } from "react-toastify";


const initialState = {
    isError:false,
    isLoading:false,
    isSuccess:false,
    AlreadyRegistered:"",
    AllSessions:"",
    Session:"",
    LoginData:'',
    EmailToken:'',
    message:"",
}

export const sessionRegister = createAsyncThunk('session/register',async(registerData,thunkAPI)=>{
    try {
        return await adminServices.registerSessionService(registerData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const GetSessions = createAsyncThunk('session/allsession',async(thunkAPI)=>{
    try {
        // return await adminServices.SessionsService();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const GetSession = createAsyncThunk('session/getsession',async(sessionId,thunkAPI)=>{
    try {
        return await adminServices.SessionService(sessionId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const adminLogin = createAsyncThunk('admin/adminlogin',async(loginData,thunkAPI)=>{
    try {
        return await adminServices.adminLoginService(loginData)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const emailTokenSuperUser = createAsyncThunk('admin/emailtokensuperuser',async(emailToken,thunkAPI)=>{
    try {
        return await adminServices.superUserMailGenerator(emailToken)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const deleteEmailTokenSuperUser = createAsyncThunk('admin/deleteSuperUserToken',async(emailToken,thunkAPI)=>{
    try {
        return await adminServices.deleteSuperUserToken(emailToken)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})


export const getEmailTokenSuperUser = createAsyncThunk('admin/getSuperUserToken',async(emailToken,thunkAPI)=>{
    try {
        return await adminServices.getSuperUserToken(emailToken)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const adminRegister = createAsyncThunk('admin/adminRegister',async(registerData,thunkAPI)=>{
    try {
        return await adminServices.adminRegisterService(registerData)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

const sessionSlice = createSlice({
    name:'session',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(sessionRegister.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(sessionRegister.fulfilled,(state,action)=>{
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.AlreadyRegistered = action.payload
        })
        .addCase(sessionRegister.rejected,(state,action)=>{
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false
            state.message = action.error
        })
        builder.addCase(GetSessions.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(GetSessions.fulfilled,(state,action)=>{
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.AllSessions = action.payload
        })
        .addCase(GetSessions.rejected,(state,action)=>{
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false
            state.message = action.error
        })
        builder.addCase(GetSession.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(GetSession.fulfilled,(state,action)=>{
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.Session = action.payload
        })
        .addCase(GetSession.rejected,(state,action)=>{
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false
            state.message = action.error
        })
        builder.addCase(adminLogin.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(adminLogin.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.LoginData = action.payload
            if(action.payload?.status === 201)
            {
                toast.success("Login Sucess")
                localStorage.setItem('adminData',JSON.stringify(action.payload))
            }
            else if(action.payload?.status === 305)
            {
                toast.info("Admin User Not Found")
            }
            else if(action.payload?.status === 404)
            {
                toast.error("Password Not Matched")
            }

        })
        .addCase(adminLogin.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message =action.error
        })
        builder.addCase(emailTokenSuperUser.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(emailTokenSuperUser.fulfilled,(state,action)=>{
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            toast.success('Token Generated ')
        })
        .addCase(emailTokenSuperUser.rejected,(state,action)=>{
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false
            state.message = action.error
        })
        builder.addCase(deleteEmailTokenSuperUser.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(deleteEmailTokenSuperUser.fulfilled,(state,action)=>{
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
        })
        .addCase(deleteEmailTokenSuperUser.rejected,(state,action)=>{
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false
            state.message = action.error
        })
        builder.addCase(getEmailTokenSuperUser.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(getEmailTokenSuperUser.fulfilled,(state,action)=>{
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.EmailToken = action.payload
            if(action.payload?.status === 404)
            toast.error('Token Entered Invalid')
        })
        .addCase(getEmailTokenSuperUser.rejected,(state,action)=>{
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false
            state.message = action.error
        })
        builder.addCase(adminRegister.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(adminRegister.fulfilled,(state,action)=>{
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            if(action.payload?.status === 201)
            {
                toast.success('Admin Register Successfull')
            }
            else if(action.payload?.status === 409)
            {
                toast.info(action.payload?.message)
            }
            else if(action.payload?.status === 501)
            {
                toast.error(action.payload?.message)
            }
        })
        .addCase(adminRegister.rejected,(state,action)=>{
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false
            state.message = action.error
        })
    }
})


export default sessionSlice.reducer