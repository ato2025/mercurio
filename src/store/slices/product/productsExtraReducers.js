import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosApi } from "../../../Axios/Axios";


export const getProductsData = createAsyncThunk('product/getproductsData ', async (data) => {

   const response = await AxiosApi.post('/Product/GetAll', data).then(res => {
      if (res.status == 200) {
         return res
      }
   })
   return response.data;
});

export const getProductById = createAsyncThunk('product/getProductById ', async (data) => {

   const response = await AxiosApi.post('/Product/GetById', data).then(res => {
      if (res.status == 200) {
         return res
      }
   })
   return response.data;
});

export const addProduct = createAsyncThunk('product/addProduct', async (data) => {

   const response = await AxiosApi.post('/Product/Create', data).then(res => {
      if (res.status == 200) {
         return res
      }
   })
   return response.data;
});

export const searchProduct = createAsyncThunk('/Product/searchProduct', async (data) => {

   const response = await AxiosApi.post('/Product/SearchProductTerm', data).then(res => {
      if (res.status == 200) {
         return res
      }
   })
   return response.data;
});