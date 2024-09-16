import { lazy } from "react";
import MainPage from "../pages/Admin/MainPage/MainPage";
import OverView from "../pages/Admin/OverView/OverView";
import Categories from "../pages/Admin/Categories/Categories";
import HomeServices from "../pages/Admin/HomeServices/HomeServices";
import WhyUS from "../pages/Admin/WhyUs/Why-Us";
import AdminProducts from "../pages/Admin/Products/Products";
import AdminService from "../pages/Admin/AdminService/AdminService";
import Infos from "../pages/Admin/Infos/Infos";
import Messages from "../pages/Admin/Messages/Messages";
import AboutUsHeader from "../pages/Admin/AboutUsHeader/AboutUsHeader";
import OurCompany from "../pages/Admin/OurCompany/OurCompany";
import PageNotFound from "../pages/404/404";
import UsersPanel from "../pages/UsersPanel/UsersPanel";







const Home = lazy(()=> import('../pages/Home/Home'))
const AboutUs = lazy(()=> import('../pages/AboutUs/AboutUs'))
const ContactUS = lazy(()=> import('../pages/ContactUs/ContactUS'))
const Products = lazy(()=> import('../pages/Products/Products'))
const Services = lazy(()=> import('../pages/Services/Services'))
const Login = lazy(()=> import('../pages/Login/Login'))

const publicRouter = [
   {path:'/',element:<Home/>},
   {path:'/products',element:<Products/>},
   {path:'/services',element:<Services/> },
   {path:'/about-us',element:<AboutUs/> },
   {path:'/contact-us',element:<ContactUS/> },
   {path:'/login',element:<Login/> },
   {path:'/*',element:<PageNotFound/> },

]

const privateRouter = [   
   {path:'/',element:<MainPage/> },  
   {path:'/admin-overview',element:<OverView/> },  
   {path:'/admin/our-products',element:<Categories /> },  
   {path:'/admin/Home/services',element:<HomeServices /> },  
   {path:'/admin/why-Us',element:<WhyUS /> },  
   {path:'/admin/products',element:<AdminProducts /> },  
   {path:'/admin/services',element:<AdminService /> },  
   {path:'/admin/infos',element:<Infos /> },  
   {path:'/admin/messages',element:<Messages /> },  
   {path:'/admin/Abot-us/Header',element:<AboutUsHeader /> },  
   {path:'/admin/our-company',element:<OurCompany /> },  
   {path:'/admin/users',element:<UsersPanel /> },  
   {path:'/*',element:<PageNotFound/> },
    
]

export  {publicRouter,privateRouter}