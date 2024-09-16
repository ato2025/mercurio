import { createSlice } from '@reduxjs/toolkit'
import { getAboutUsData, getOurCompanyData } from './aboutUsExtraReducer'



const aboutUsSlice = createSlice({
  name: 'AboutUs',
  initialState:{
   aboutUsDataLoading:false,
  aboutUsData:[],
  ourCompanyDataLoading:false,
  ourCompanyData:[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAboutUsData.pending, (state) => {

        state.aboutUsDataLoading= true
      })
      .addCase(
         getAboutUsData.fulfilled,(state, {payload}) => {
        
          state.aboutUsDataLoading = false
          state.aboutUsData = payload
        },
      )
      .addCase(getAboutUsData.rejected, (state) => {
        state.aboutUsDataLoading = false
      })


      .addCase(getOurCompanyData.pending, (state) => {

         state.ourCompanyDataLoading= true
       })
       .addCase(
          getOurCompanyData.fulfilled,(state, {payload}) => {
         
           state.ourCompanyDataLoading = false
           state.ourCompanyData = payload
         },
       )
       .addCase(getOurCompanyData.rejected, (state) => {
         state.ourCompanyDataLoading = false
       })
  },
})

export default aboutUsSlice.reducer