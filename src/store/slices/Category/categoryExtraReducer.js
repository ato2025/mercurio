import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { AxiosApi } from "../../../Axios/Axios";


export const getCategoriesData  = createAsyncThunk('category/getCategoriesData ', async () => {
   const response = await AxiosApi.get('/Category/GetAll').then(res=>{
      if(res.status == 200){
         return res
      }
   })
   return response.data;
 });
