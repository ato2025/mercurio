import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosApi } from "../../../Axios/Axios";


export const getInfosData  = createAsyncThunk('Infos/getInfosData', async () => {
   const response = await AxiosApi.get('/ContactUs/Get').then(res=>{
      if(res.status == 200){
         return res
      }
   })
   return response.data;
 });