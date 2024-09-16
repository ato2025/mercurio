import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosApi } from "../../../Axios/Axios";


export const getHomeCategoriesData  = createAsyncThunk('HomePage/getHomeCategoriesData', async () => {
   const response = await AxiosApi.get('/Category/GetAllWithImage').then(res=>{
      if(res.status == 200){
         return res
      }
   })
   return response.data;
 });


 export const getHomeWhyUsData  = createAsyncThunk('HomePage/getHomeWhyUsData', async () => {
   const response = await AxiosApi.get('/WhyUs/GetAll').then(res=>{
      if(res.status == 200){
         return res
      }
   })
   return response.data;
 });

 export const getOverviewData  = createAsyncThunk('HomePage/getOverviewData', async () => {
   const response = await AxiosApi.get('/OverView/Get').then(res=>{
      if(res.status == 200){
         return res
      }
   })
   return response.data;
 });

 export const getHomeServiceData  = createAsyncThunk('HomePage/getHomeServiceData', async () => {
   const response = await AxiosApi.get('/Service/GetAllSummary').then(res=>{
      if(res.status == 200){
         return res
      }
   })
   return response.data;
 });