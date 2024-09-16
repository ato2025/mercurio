import React, { useEffect, useState } from 'react'
import AdminPanelTitles from '../../../components/modules/AdminPanelTitle/AdminPanelTitle'
import CustomBtn from '../../../components/modules/CustomBtn/CustomBtn'
import { getOverviewData } from '../../../store/slices/HomePage/HomePageExtraReducer';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { AxiosAdminApi } from '../../../Axios/Axios';


function OverView() {
  const dispatch = useDispatch();
  const [description,setDescription] = useState()
  const [image,setImage] = useState()

  const {
    overviewDataLoading,
    overviewData,
  } = useSelector((data) => data.HomePageSections);

  const base64Convertor = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64 = e.target.result.split(",")[1];
       setImage(base64);
      };

      reader.readAsDataURL(file);
    }
  };


  useEffect(() => {
    dispatch(getOverviewData());
  }, []);
  useEffect(()=>{
    setDescription(overviewData.description)
  },[overviewData])

const EditOverViewHandler =()=>{
  const data = {
    id: 1,
    imageBase64:image ,
    description
  }

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Edit it"
  }).then((result) => {
    if (result.isConfirmed) {
      AxiosAdminApi.put('/OverView/Update',data)
      .then(res=>{
        if(res.status == 200){
          Swal.fire({
            title: "Edited!",
            text: "Your file has been Edited.",
            icon: "success"
          });
          dispatch(getOverviewData())
        }
      })
    }
  });

  
}

  return (
    <div className='w-full '>
      <AdminPanelTitles title={'OverView'} />
      <div className='pe-10 lg:pe-20 py-7'>
      <textarea className='w-full rounded-xl px-4 py-3' placeholder='Description' cols="30" rows="10" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
      <input type="file" className='w-full bg-[#80808089] rounded-lg my-5' value={image} onChange={e=>base64Convertor(e)} />
      <CustomBtn title={'Edit'} onclick={EditOverViewHandler} />
      </div>
    </div>
  )
}

export default OverView