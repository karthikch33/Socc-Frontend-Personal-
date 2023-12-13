import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sessionServices from "./sessionService";


const initialState = {
    isError:false,
    isLoading:false,
    isSuccess:false,
    AlreadyRegistered:"",
    AllSessions:"",
    Session:"",
    message:"",
}

export const sessionRegister = createAsyncThunk('session/register',async(registerData,thunkAPI)=>{
    try {
        return await sessionServices.registerSessionService(registerData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const GetSessions = createAsyncThunk('session/allsession',async(thunkAPI)=>{
    try {
        return await sessionServices.SessionsService();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const GetSession = createAsyncThunk('session/getsession',async(sessionId,thunkAPI)=>{
    try {
        return await sessionServices.SessionService(sessionId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
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
    }
})


export default sessionSlice.reducer