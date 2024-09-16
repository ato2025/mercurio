import { combineReducers } from "@reduxjs/toolkit"
import productSlice from "./slices/product/productSlice"
import CategorySlice from "./slices/Category/CategorySlice"
import servicesSlice from "./slices/Services/servicesSlice"
import HomePageSlice from "./slices/HomePage/HomePageSlice"
import InfosSlice from "./slices/Infos/InfosSlice"
import aboutUsSlice from "./slices/AboutUs/aboutUsSlice"
import messagesSlice from "./slices/Messages/messagesSlice"
import UsersSlice from "./slices/Users/UsersSlice"


const reducers = combineReducers({
  products:productSlice,
  category:CategorySlice,
  services:servicesSlice,
  HomePageSections:HomePageSlice,
  Infos:InfosSlice,
  AboutUs:aboutUsSlice,
  messages:messagesSlice,
  users:UsersSlice
})
     
     export default reducers