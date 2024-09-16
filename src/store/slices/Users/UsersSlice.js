import { createSlice } from '@reduxjs/toolkit'

import { getUsersData } from './UsersExtraReducers'



const usersSlice = createSlice({
  name: 'users',
  initialState:{
   usersDataLoading:false,
   usersData:[],

  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersData.pending, (state) => {

        state.usersDataLoading = true
      })
      .addCase(
         getUsersData.fulfilled,(state, {payload}) => {
        
          state.usersDataLoading = false
          state.usersData = payload
        },
      )
      .addCase(getUsersData.rejected, (state) => {
        state.usersDataLoading = false
      })
     
  },
})
export default usersSlice.reducer  