import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosApi } from "../../../Axios/Axios";


export const getAboutUsData  = createAsyncThunk('AboutUs/getAboutUsData ', async () => {
   const response = await AxiosApi.get('/AboutUsSection/GetAboutUs').then(res=>{
      if(res.status == 200){
         return res
      }
   })
   return response.data;
 });

 export const getOurCompanyData  = createAsyncThunk('AboutUs/getOurCompanyData', async () => {
   const response = await AxiosApi.get('/AboutUsSection/GetOurCompany').then(res=>{
      if(res.status == 200){
         return res
      }
   })
   return response.data;
 });