import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOurCompanyData } from '../../../store/slices/AboutUs/aboutUsExtraReducer';
import AdminPanelTitles from '../../../components/modules/AdminPanelTitle/AdminPanelTitle';
import Swal from 'sweetalert2';
import { AxiosAdminApi } from '../../../Axios/Axios';

function OurCompany() {

   const [description1,setDescription1]=useState()
   const [description2,setDescription2]=useState()
   const [description3,setDescription3]=useState()

   const dispatch = useDispatch();
   const { ourCompanyDataLoading,ourCompanyData } = useSelector(
     (data) => data.AboutUs
   );

   useEffect(() => {
      dispatch(getOurCompanyData());
    }, []);
    useEffect(() => {
       setDescription1(ourCompanyData.description)
       setDescription2(ourCompanyData.description2)
       setDescription3(ourCompanyData.description3)
     }, [ourCompanyData]);

     const submitHandler = ()=>{
      const data = {
        description:description1,
        description2,
        description3
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


          AxiosAdminApi.post('/AboutUsSection/InsertOrUpdateOurCompany',data)
          .then(res=>{
            if(res.status == 200){
              dispatch(getOurCompanyData())
              Swal.fire({
                title: "Edited!",
                // text: "Your file has been deleted.",
                icon: "success"
              });
            }
          })

          
        }
      });


     }

  return (
    <>
      <div className="w-full ">
      <AdminPanelTitles title={"About Company"} />
      <div className="pe-10 lg:pe-20 py-7">
      <div>
            <div className="text-lg lg:text-2xl text-white">Description 1 :</div>
            <textarea
          placeholder="Description 1"
          className="px-4 py-2  rounded-lg my-2 w-full"
          cols="30"
          rows="10"
          value={description1}
          onChange={e=>setDescription1(e.target.value)}
        ></textarea>
            </div>
      
         <div>
            <div className="text-lg lg:text-2xl text-white">Description 2 :</div>
            <textarea
          placeholder="Description 2"
          className="px-4 py-2  rounded-lg my-2 w-full"
          cols="30"
          rows="10"
          value={description2}
          onChange={e=>setDescription2(e.target.value)}
        ></textarea>
            </div>
      
            <div>
            <div className="text-lg lg:text-2xl text-white">Description 3 :</div>
            <textarea
          placeholder="Description 3"
          className="px-4 py-2  rounded-lg my-2 w-full"
          cols="30"
          rows="10"
          value={description3}
          onChange={e=>setDescription3(e.target.value)}
        ></textarea>
            </div>
       
        <div className="flex justify-end items-center w-full">
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg " onClick={submitHandler}>
            Submit
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default OurCompany