import { createSlice } from "@reduxjs/toolkit";
import { login,fetchUsers } from "./actions/auth";

const initialState ={
    users:[],
    loggedInUser:{},
    error:{ payload: null, status: false },
    loading: false,
}

const userReducer= createSlice({
    name:"users",
    initialState,
    reducers:{
        setUser(state,action){
            state.loggedInUser=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(login.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(login.fulfilled,(state,action)=>{
            state.loading=false;
            state.loggedInUser=action.payload;
            state.error={payload:null,status:false}
        })
        builder.addCase(login.rejected,(state,action)=>{
            state.loading=false;
         
        })

        builder.addCase(fetchUsers.pending,(state,action)=>{
            state.loading=true;
        })

        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.users=action.payload;
            state.error={payload:null,status:false}
        })
        builder.addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=false;
           
        })
    }

})

export const {setUser}=userReducer.actions;
export default userReducer.reducer;