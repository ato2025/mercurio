import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { AxiosApi } from "../../../Axios/Axios";


export const getServicesData = createAsyncThunk('services/getServicesData ', async () => {

   const response = await AxiosApi.get('/Service/GetAll').then(res => {
      if (res.status == 200) {
         return res
      }
   })
   return response.data;
});
