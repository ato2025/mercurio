import { createSlice } from '@reduxjs/toolkit'
import { getMessagesData } from './messagesExtraReducers'



const MessagesSlice = createSlice({
  name: 'Messages',
  initialState:{
   MessagesDataLoading:false,
   MessagesData:[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMessagesData.pending, (state) => {

        state.MessagesDataLoading = true
      })
      .addCase(
         getMessagesData.fulfilled,(state, {payload}) => {
        
          state.MessagesDataLoading = false
          state.MessagesData = payload
        },
      )
      .addCase(getMessagesData.rejected, (state) => {
        state.MessagesDataLoading = false
      })
  },
})

export default MessagesSlice.reducer