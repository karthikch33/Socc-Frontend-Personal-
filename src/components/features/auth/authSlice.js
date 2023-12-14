import { createSlice, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import authSerivces from "./authService";
import { toast } from "react-toastify";
import { sendEmail } from "../../Email";


const intialState = {
    isError:false,
    isSuccess:false,
    isLoading:false,
    AlreadyRegisterd:'',
    ContactSuccess:'',
    AttendanceRegister:'',
    AttendanceSave:'',
    message:""
}

export const resetState = createAction("Reset_all")

export const registrationSlice = createAsyncThunk('auth/register', async (registerData, thunkAPI) => {
    try {
        return await authSerivces.registrationService(registerData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data); 
    }
}); 

export const contact = createAsyncThunk('auth/contact',async (contactData,thunkAPI)=>{
    try {
        return await authSerivces.contactService(contactData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const feedback = createAsyncThunk('auth/feedback',async(feedBackData,thunkAPI)=>{
    try {
        return await authSerivces.feedbackService(feedBackData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const attendance = createAsyncThunk('auth/attendance',async(EventName,thunkAPI)=>{
    try {
        return await authSerivces.attendaceRegisterService(EventName)
    } catch (error) {
       return thunkAPI.rejectWithValue(error)
    }
})

export const attendanceSave = createAsyncThunk('auth/attendancesave',async(AttendedData,thunkAPI)=>{
    try {
        return await authSerivces.attendaceSaveService(AttendedData)
    } catch (error) {
       return thunkAPI.rejectWithValue(error)
    }
})

export const authSlice = createSlice({
    name:"auth",
    initialState:intialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(registrationSlice.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(registrationSlice.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.AlreadyRegisterd = action.payload
        })
        .addCase(registrationSlice.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message =action.error
        })
        .addCase(contact.pending,(state,action)=>{
            state.isError = false
            state.isLoading = true
            state.isSuccess = false
        })
        .addCase(contact.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.ContactSuccess = action.payload
            if(state.ContactSuccess && state.ContactSuccess?.success){
                toast.success('FeedBack Received And Mail Has Been Generated')
            }
            else{
                toast.error('FeedBack Submition Failed')
            }
        })
        .addCase(contact.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message =action.error
        })
        .addCase("Reset_all",()=>intialState)
        builder.addCase(feedback.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(feedback.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            if(action.payload?.error)
            {
                toast.error(action.payload?.error)
            }
            else
            {
                toast.success('FeedBack Submitted')
            }
        })
        builder.addCase(attendance.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(attendance.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.AttendanceRegister = action.payload        
        })
        .addCase(attendance.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message =action.error
        })
        builder.addCase(attendanceSave.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(attendanceSave.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.AttendanceSave = action.payload?.status
        })
        .addCase(attendanceSave.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message =action.error
        })
    }
})

export default authSlice.reducer