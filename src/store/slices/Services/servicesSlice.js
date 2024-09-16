import { createSlice } from '@reduxjs/toolkit'
import { getServicesData } from './servicesExtraReducers'



const servicesSlice = createSlice({
  name: 'services',
  initialState:{
   servicesDataLoading:false,
   servicesData:[],

  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getServicesData.pending, (state) => {

        state.servicesDataLoading = true
      })
      .addCase(
         getServicesData.fulfilled,(state, {payload}) => {
        
          state.servicesDataLoading = false
          state.servicesData = payload
        },
      )
      .addCase(getServicesData.rejected, (state) => {
        state.servicesDataLoading = false
      })
     
  },
})
export default servicesSlice.reducer  