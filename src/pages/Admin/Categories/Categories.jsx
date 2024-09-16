import React, { useEffect, useState } from "react";
import AdminPanelTitles from "../../../components/modules/AdminPanelTitle/AdminPanelTitle";
import { useDispatch, useSelector } from "react-redux";
import { getHomeCategoriesData } from "../../../store/slices/HomePage/HomePageExtraReducer";
import CustomBtn from "../../../components/modules/CustomBtn/CustomBtn";
import AdminPagesTable from "../../../components/modules/AdminPagesTable/AdminPagesTable";
import { AxiosAdminApi } from "../../../Axios/Axios";
import Swal from "sweetalert2";
import CloseIcon from "../../../components/icons/CloseIcon";

function Categories() {
  const { categoriesData, categoriesDataLoading } = useSelector(
    (data) => data.HomePageSections
  );
  const dispatch = useDispatch();

  const [isShowModal, setIsShowModal] = useState();
  const [categoryTitle, setCategoryTitle] = useState();
  const [image, setImage] = useState();
  const [categoryId, setCategoryId] = useState();
const [editOrAdd,setEditOrAdd] = useState()

  useEffect(() => {
    dispatch(getHomeCategoriesData());
  }, []);

  const addBtnHandler = () => {
    setIsShowModal('')
setCategoryTitle('')
setEditOrAdd('add')
    setIsShowModal(true)

  
  };

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

  const editFunc = ({title, imageBase64, id}) => {
    setIsShowModal(true);
    setCategoryTitle(title);
    setImage(imageBase64);
    setCategoryId(id);
    setEditOrAdd('edit')
  };

  const SubmitHandler = () => {

    if(editOrAdd == 'edit'){
      const data = {
        title: categoryTitle,
        imageBase64: image,
        id: categoryId,
      };
      if(categoryTitle,categoryId,image){
        AxiosAdminApi.put('/Category/Update',data)
        .then(res=>{
          if(res.status ==200){
            Swal.fire({
              title: "Edited Successfully",
              // text: "That thing is still around?",
              icon: "success"
            }).then(res=>res.isConfirmed && dispatch(getHomeCategoriesData()) && setIsShowModal(false))
          }
        })
      }
    }

    if(editOrAdd == 'add'){
  const data = {
      title:categoryTitle,
      imageBase64:image
    }
    AxiosAdminApi.post('/Category/Create',data)
    .then(res=>{
      if(res.status == 200){
        Swal.fire({
          title: "Created Successfully",
          icon: "success"
        }).then(res=>res.isConfirmed && dispatch(getHomeCategoriesData()) && setIsShowModal(false))
      }
    })
    }

   
  };

const deleteProduct = (id)=>{
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


      AxiosAdminApi.delete(`/Category/Delete/${id}`)
      .then(res=>{
        try{
        if(res.status == 200){
          Swal.fire({
            title: "Deleted!",
            text: "Your Category has been deleted.",
            icon: "success"
          }).then(res=>{
            if(res.isConfirmed){
              dispatch(getHomeCategoriesData());
            }
          })
        }}catch{
          if(res.status == 413){
            Swal.fire({
              title: "Image size shuld be lower tahn 500kb",
              // text: "That thing is still around?",
              icon: "info"
            });
          }
        }
      })
           
    }
  });
}


  return (
    <>
      <div className="w-full ">
        <AdminPanelTitles title={"Categories"} />
        <div className="pe-10 lg:pe-20 py-7">
          <CustomBtn title={"Add"} onclick={addBtnHandler} />
          <AdminPagesTable
            editFunc={editFunc}
            data={categoriesData}
            dataLoding={categoriesDataLoading}
            deleteProduct ={deleteProduct }
          />
        </div>
      </div>

      {isShowModal && (
        <div
          className="w-full h-[100vh] z-[50] bg-[#00000016] absolute left-0 top-0 flex justify-center items-center  text-white"
          
        >
          <div className="landingAdminBoxes px-4 py-2 w-[90vw] lg:w-[50vw] h-fit">
            <div className="flex justify-end items-center">
              <div className="w-fit h-fit" onClick={()=>setIsShowModal(false)}>
              <CloseIcon className={'w-8 h-8 cp'}/>
              </div>
              </div>
            <div className=" text-2xl">Category Name :</div>
            <div className="my-2">
              <input
                type="text"
                className="rounded-lg px-4 py-2 text-gray-700"
                placeholder="Category Name"
                value={categoryTitle}
                onChange={(e) => {
                  setCategoryTitle(e.target.value);
                }}
              />
            </div>
            <div className="my-2">
              <input type="file" onChange={(e) => base64Convertor(e)} />
            </div>
            <div className="flex justify-end items-center">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={SubmitHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Categories;
