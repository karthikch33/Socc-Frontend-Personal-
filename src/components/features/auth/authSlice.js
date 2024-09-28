import { createSlice, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import authSerivces from "./authService";
import { toast } from "react-toastify";
import { sendEmail } from "../../Email";


const intialState = {
    isError:false,
    isSuccess:false,
    isLoading:false,
    AlreadyRegisterd:'',
    AttendanceRegister:'',
    AllCompliants:'',
    AttendanceSave:'',
    updatedContact:'',
    RegisterToast:'',
    AllCompliantsResolved:'',
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



export const getAllContact = createAsyncThunk('auth/contact',async(thunkAPI)=>{
    try {
        return await authSerivces.getContactService()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getAllContactResolved = createAsyncThunk('auth/contactResolved',async(thunkAPI)=>{
    try {
        return await authSerivces.getContactResolvedService()
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

export const getAllRegistersSlice = createAsyncThunk('auth/getAllRegisters',async(EventName,thunkAPI)=>{
    try {
        return await authSerivces.getAllRegister(EventName)
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

export const updateContact = createAsyncThunk('auth/updateContact',async(resolvedData,thunkAPI)=>{
    try {
        return await authSerivces.updateContactService(resolvedData)
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
            state.RegisterToast = toast.loading("Registering For Section")
        })
        .addCase(registrationSlice.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.AlreadyRegisterd = action.payload
            
            if(action.payload && action.payload?.status === 201){
                toast.update(state.RegisterToast, {
                    render: "Registered And Confirmation Mail Generated",
                    type: toast.TYPE.SUCCESS,
                    isLoading: false,
                    autoClose: 3000,
                });
            } 
            else if(action.payload && action.payload?.status === 301){
                toast.update(state.RegisterToast, {
                    render: "Registered Error in Mail Generation",
                    type: toast.TYPE.INFO,
                    isLoading: false, 
                    autoClose: 3000,
                });
            }
            else{
                toast.update(state.RegisterToast, {
                    render: action.payload?.message,
                    type: toast.TYPE.ERROR,
                    isLoading: false, 
                    autoClose: 3000,
                });
            }       

        })
        .addCase(registrationSlice.rejected,(state,action)=>{
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
        builder.addCase(getAllRegistersSlice.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(getAllRegistersSlice.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.AllRegisters = action.payload        
        })
        .addCase(getAllRegistersSlice.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message =action.error
        })
        builder.addCase(getAllContact.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(getAllContact.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.AllCompliants = action.payload
        })
        .addCase(getAllContact.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message =action.error
        })
       .addCase(getAllContactResolved.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(getAllContactResolved.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.AllCompliantsResolved = action.payload
        })
        .addCase(getAllContactResolved.rejected,(state,action)=>{
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
        builder.addCase(updateContact.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(updateContact.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.updatedContact = action.payload?.resolved
            if(state.updatedContact === true)
            {
                toast.success('Resolved')
            }
            else
            {
                toast.error('Not Resolved')
            }
        })
        .addCase(updateContact.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message =action.error
        })
    }
})

export default authSlice.reducer