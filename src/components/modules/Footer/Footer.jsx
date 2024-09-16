import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Map from "../Map/Map";
import { useDispatch, useSelector } from "react-redux";
import { getInfosData } from "../../../store/slices/Infos/InfosExtraReducers";
import Skeleton from "../Skeleton/Skeleton";

const Footer = React.memo(() => {

  const {pathname}= useLocation()
  const dispatch = useDispatch()
  const {phone,lat,lan,email,address} = useSelector(data=>data.Infos.InfosData)

  useEffect(()=>{
    dispatch(getInfosData())
  },[])

  return (

    <>
    {
      pathname == '/login' ? null : (
        <div
        style={{ background: "#333" }}
        className="grid grid-cols-1 lg:grid-cols-3 lg:px-16"
      >
        <ul className="text-white w-full  py-6 lg:py-0 border-b border-blue-50 lg:border-0 flex justify-center gap-5 my-7 lg:gap-9 lg:ps-16 flex-col mx-auto px-5 lg:px-0">
          <li>
            <Link to={'/products'} onClick={()=>window.scrollTo(0,0)}>Products</Link>
          </li>
          <li>
            <Link to={'/services'}>Services</Link>
          </li>
          <li>
            <Link to={'/about-us'} onClick={()=>window.scrollTo(0,0)}>About Us</Link>
          </li>
          <li>
            <Link to={'/contact-us'} onClick={()=>window.scrollTo(0,0)}>Contact Us</Link>
          </li>
        </ul>
        <ul className=" flex px-5 lg:px-0  w-full gap-5  py-6 lg:py-0 border-b border-blue-50 lg:border-0 lg:gap-9 justify-center flex-col text-white mx-auto">
          <li className="flex justify-start items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            <a href={`tel:${phone}`}>Phone: {phone}</a>
            
          </li>
          <li className="flex justify-start items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <a href="mailto:info@mercurio.ae"> Mail: {email}</a>
           
          </li>
          <li className="flex justify-start items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <div>
            Address: {address}
            </div>
          </li>
        </ul>
        <div className="py-16  px-5 lg:px-0">
          { lat ? <Map height={'h-[30vh]'} loc={[Number(lat),Number(lan)]} /> : <Skeleton count={1} /> } 
        </div>
      </div>
      )
    }

    </>

  
  );
})

export default Footer;
