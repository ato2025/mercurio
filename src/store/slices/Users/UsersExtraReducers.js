import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosAdminApi } from "../../../Axios/Axios";

export const getUsersData = createAsyncThunk('users/getUsersData ', async () => {

   const response = await AxiosAdminApi.get("/Account/GetAll").then(res => {
      if (res.status == 200) {

         return res
      }
   })
   return response.data;
});