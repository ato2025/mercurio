import { createSlice } from '@reduxjs/toolkit'
import { getInfosData } from './InfosExtraReducers'



const InfosSlice = createSlice({
  name: 'Infos',
  initialState:{
   InfosDataLoading:false,
   InfosData:[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInfosData.pending, (state) => {

        state.InfosDataLoading = true
      })
      .addCase(
         getInfosData.fulfilled,(state, {payload}) => {
        
          state.InfosDataLoading = false
          state.InfosData = payload
        },
      )
      .addCase(getInfosData.rejected, (state) => {
        state.InfosDataLoading = false
      })
  },
})

export default InfosSlice.reducer