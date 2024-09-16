import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosAdminApi, AxiosApi } from "../../../Axios/Axios";
import Swal from "sweetalert2";


export const getMessagesData  = createAsyncThunk('Infos/getMessagesData', async () => {
   const response = await AxiosApi.get('/ContactComment/GetAll').then(res=>{
      if(res.status == 200){
         return res
      }
   })
   return response.data;
 });

 export const sendMessagesData = createAsyncThunk('product/sendMessagesData ', async (data) => {

   const response = await AxiosAdminApi.post('/ContactComment/Create', data).then(res => {
      if (res.status == 200) {
         Swal.fire({
            title: "Successfully",
            text: "Message Sent Successfully",
            icon: "success",
            confirmButtonText: 'Ok',
            customClass: {
              confirmButton: 'sweetConfirmBtn'
            }
          });
         return res
      }
   })
   return response.data;
});