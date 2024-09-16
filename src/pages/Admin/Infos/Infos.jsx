import React, { useEffect, useState } from "react";
import AdminPanelTitles from "../../../components/modules/AdminPanelTitle/AdminPanelTitle";
import { useDispatch, useSelector } from "react-redux";
import { getInfosData } from "../../../store/slices/Infos/InfosExtraReducers";
import Swal from "sweetalert2";
import { AxiosAdminApi } from "../../../Axios/Axios";

function Infos() {
  const dispatch = useDispatch();

  const {id, phone , lat, lan, email, address } = useSelector(
    (data) => data.Infos.InfosData
  );

const [phonee,setPhone] = useState()
const [emaill,setEmail] = useState()
const [latitude,setLatitude] = useState()
const [longitude,setLongitude] = useState()
const [addresss,setAddress] = useState()

useEffect(()=>{
  dispatch(getInfosData());
},[])
useEffect(()=>{
  setPhone(phone)
setEmail(email)
setLatitude(lat)
setLongitude(lan)
setAddress(address)
},[phone])


const submitHandler = ()=>{
  const data = {
    phone: phonee,
    fax: "",
    twitter: "",
    whatsApp: "",
    address: addresss,
    email: emaill,
    lan: Number(longitude),
    lat: Number(latitude),
    id
  }


  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Edit it!"
  }).then((result) => {
    if (result.isConfirmed) {


      AxiosAdminApi.put('/ContactUs/Update',data)
      .then(res=>{
        if(res.status == 200){
          dispatch(getInfosData())
          Swal.fire({
            title: "Edited!",
            icon: "success"
          });
        }
      })

      
    }
  });





}

  return (
    <div className="w-full ">
      <AdminPanelTitles title={"Infos"} />
      <div className="pe-10 lg:pe-20 py-7 px-4">
        <div>
        <div className="text-lg lg:text-2xl text-white">Phone :</div>
          <input
            type="text"
            className="my-4 rounded-lg px-4 py-2"
            placeholder="Phone"
            value={phonee}
            onChange={(e)=>setPhone(e.target.value)}
          />{" "}
          <br />
        </div>
        <div className="text-lg lg:text-2xl text-white">Email :</div>
        <input
          type="email"
          className="my-4 rounded-lg px-4 py-2"
          placeholder="Email"
          value={emaill}
            onChange={(e)=>setEmail(e.target.value)}
        />{" "}
        <br />
        <div className="text-lg lg:text-2xl text-white">Latitude :</div>
        <input
          type="text"
          className="my-4 rounded-lg px-4 py-2"
          placeholder="Latitude"
          value={latitude}
          onChange={(e)=>setLatitude(e.target.value)}
        />{" "}
        <br />
        <div className="text-lg lg:text-2xl text-white">Longitude :</div>
        <input
          type="text"
          className="my-4 rounded-lg px-4 py-2"
          placeholder="Longitude"
          value={longitude}
          onChange={(e)=>setLongitude(e.target.value)}
        />{" "}
        <br />
        <div className="text-lg lg:text-2xl text-white mb-2">Address :</div>
        <textarea
          placeholder="Address"
          className=" rounded-lg px-4 py-2"
          cols="30"
          rows="10"
          value={addresss}
          onChange={(e)=>setAddress(e.target.value)}
        ></textarea>
        <div className="w-full flex justify-end items-center">
          <button className="bg-blue-600 px-4 py-2 rounded-lg text-white my-4 " onClick={submitHandler}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Infos;
