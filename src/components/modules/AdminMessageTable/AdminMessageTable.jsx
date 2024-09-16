import React, { useState } from 'react'
import EyeIcon from '../../icons/EyeIcon';
import TreeDotsIcon from '../../icons/TreeDotsIcon';
import CloseIcon from '../../icons/CloseIcon';
import Swal from 'sweetalert2';
import { AxiosAdminApi } from '../../../Axios/Axios';
import { useDispatch } from 'react-redux';
import { getMessagesData } from '../../../store/slices/Messages/messagesExtraReducers';

function AdminMessageTable({message}) {
   const [isShowModal, setShowModal] = useState(false);
   const [isShowActionModal, setShowActionModal] = useState(false);
   const dispatch = useDispatch();
   const closeModalHandler = (e) => {
      if (e.target.dataset.name == "messageContainer") {
        setShowModal(false);
      }
    };


    const deleteHandler =()=>{
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, Delete it!"
       }).then((result) => {
         if (result.isConfirmed) {
     
     
           AxiosAdminApi.delete(`/ContactComment/Delete/${message.id}`)
           .then(res=>{
             if(res.status == 200){
               dispatch(getMessagesData())
               Swal.fire({
                 title: "Deleted!",
                 icon: "success"
               });
             }
           })
     
           
         }
       });
    }



  return (
    <>
    <tr key={message.id}>
                  <th className="text-white py-4 ">
                    <div className="w-full h-full flex justify-center items-center">
                      {message.id}
                    </div>
                  </th>
                  <th className="text-white py-4 ">
                    <div className="w-full h-full flex justify-center items-center">
                      {message.fullName}
                    </div>
                  </th>
                  <th className="text-white py-4 ">
                    <div className="w-full h-full flex justify-center items-center">
                      {message.email}
                    </div>
                  </th>
                  <th className=" py-4 ">
                    <div className="w-full h-full flex justify-center items-center">
                      <button
                        onClick={() => setShowModal(true)}
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
                        <div className="absolute top-[-50%] right-2/3 rounded-lg bg-[#0000005c] px-4 py-2">
                          <button className="bg-red-500 my-1 w-20 px-4 py-2 rounded-lg" onClick={deleteHandler} >
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
                    data-name="messageContainer"
                    onClick={closeModalHandler}
                  >
                    <div
                      className="landingAdminBoxes w-[90vw] lg:w-[50vw] h-[50vh] overflow-y-auto"
                      data-name="messageBox"
                    >
                      <div className="flex justify-end items-center h-10 w-full pe-2">
                        <div onClick={() => setShowModal(false)}>
                          <CloseIcon className={"w-8 h-8 cp text-white"} />
                        </div>
                      </div>
                      <p className="px-4 text-lg text-gray-300">
                        {message.message}
                      </p>
                    </div>
                  </div>
                )}
    
    </>
  )
}

export default AdminMessageTable