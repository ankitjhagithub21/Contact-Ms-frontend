import { createSlice } from '@reduxjs/toolkit'



export const authSlice = createSlice({
  name: 'auth',
  initialState:{
    isLoggedIn:false,
    user:null,
  },
  reducers: {

    setUser:(state,action)=>{
      state.user = action.payload
    },
    logoutUser:(state)=>{
      state.user=null
    }

   
  },
})


export const { setUser,logoutUser} = authSlice.actions

export default authSlice.reducer