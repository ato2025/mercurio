import React, { useState } from "react";

import TreeDotsIcon from "../../../../components/icons/TreeDotsIcon";
import CloseIcon from "../../../../components/icons/CloseIcon";
import EyeIcon from "../../../../components/icons/EyeIcon";
import { AxiosAdminApi } from "../../../../Axios/Axios";
import Swal from "sweetalert2";
import {  getHomeWhyUsData } from "../../../../store/slices/HomePage/HomePageExtraReducer";
import { useDispatch } from "react-redux";


function WhyUsRow({ item }) {


  const dispatch = useDispatch();

  const [isShowModal, setShowModal] = useState(false);
  const [isShowActionModal, setShowActionModal] = useState(false);
  const [id, setId] = useState(item.id);
  const [priority, setPriority] = useState(item.priority);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  const [modalType, setModalType] = useState();

  const closeModalHandler = (e) => {
    if (e.target.dataset.name == "itemContainer") {
      setShowModal(false);
    }
  };

  const submitEditHandler = () => {
   const data = {
    id ,
    priority ,
    title ,
    description
   }
   AxiosAdminApi.put('/WhyUs/Update',data)
   .then(res=>{
    if(res.status == 200){
      Swal.fire({
        title: "Edited Successfully",
        icon: "success"
      }).then(res=>res.isConfirmed  && setShowModal(false)&& setShowActionModal(false)) && dispatch(getHomeWhyUsData())
    }
   })
  };

  const deleteHandler = ()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {  
        AxiosAdminApi.delete(`/WhyUs/Delete/${item.id}`)
        .then(res=>{
          if(res.status == 200){
            Swal.fire({
              title: "Deleted!",
              text: "Your WhyUs Item has been deleted.",
              icon: "success"
            }).then(res=>{
              if(res.isConfirmed){
                dispatch(getHomeWhyUsData());
              }
            })
          }
        }).catch(err=>{
          Swal.fire({
            title: "Not Deleted!",
            text: "You Have Error",
            icon: "error"
          })
        })
             
      }
    });
  }

  return (
    <>
      <tr key={item.id}>
        <th className="text-white py-4 ">
          <div className="w-full h-full flex justify-center items-center">
            {item.id}
          </div>
        </th>
        <th className="text-white py-4 ">
          <div className="w-full h-full flex justify-center items-center">
            {item.title}
          </div>
        </th>
        <th className=" py-4 ">
          <div className="w-full h-full flex justify-center items-center">
            <button
              onClick={() => {
                setShowModal(true);
                setModalType("describtion");
              }}
              className="flex justify-center items-center gap-2 bg-blue-700 px-4 py-2 rounded-lg text-gray-200"
            >
              Watch <EyeIcon />
            </button>
          </div>
        </th>
        <th className="text-white py-4 ">
          <div className="w-full h-full flex justify-center items-center relative">
            <TreeDotsIcon
              onclick={() => {
                setShowActionModal((prev) => !prev);
              }}
            />
            {isShowActionModal && (
              <div className="absolute top-[-50%]  right-2/3 rounded-lg bg-[#0000005c] px-4 py-2">
                <button
                  className="bg-sky-500 my-1 w-20 px-4 py-2 rounded-lg"
                  onClick={()=>{
                    setShowModal(true);
                    setModalType("edit");
                  }}
                >
                  Edit
                </button>
                <button className="bg-red-500 my-1 w-20 px-4 py-2 rounded-lg" onClick={deleteHandler}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </th>
      </tr>
      {isShowModal && (
        <div
          className="w-[100vw] h-[100vh] z-[100] absolute left-0 top-0 bg-[#00000098] flex justify-center items-center"
          data-name="itemContainer"
          onClick={closeModalHandler}
        >
          <div
            className="landingAdminBoxes w-[90vw] lg:w-[50vw] h-[50vh] overflow-y-auto"
            data-name="itemBox"
          >
            <div className="flex justify-end items-center h-10 w-full pe-2">
              <div onClick={() => setShowModal(false)}>
                <CloseIcon className={"w-8 h-8 cp text-white"} />
              </div>
            </div>
            {modalType == "describtion" && (
              <p className="px-4 text-lg text-gray-300">{item.description}</p>
            )}
            {modalType == "edit" && (
              <>
              <div className="text-2xl text-white px-4">priority : </div>
              <div><input type="number" value={priority} onChange={(e)=>{setPriority(e.target.value)}} className="px-4 py-2 rounded-lg text-gray-700 my-4 mx-4" /> </div>

              <div className="text-2xl text-white px-4">Title : </div>
              <div><input type="tel" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="px-4 py-2 rounded-lg text-gray-700 my-4 mx-4" /> </div>

              <div className="text-2xl text-white px-4">Description : </div>
              <div>
                <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} className="px-4 py-2 rounded-lg text-gray-700 my-4 mx-4" cols="30" rows="10"></textarea>
              </div>

              <div className="flex justify-end items-center px-4 py-2">
                <button className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-sky-700" onClick={submitEditHandler}>Submit</button>
              </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default WhyUsRow;
