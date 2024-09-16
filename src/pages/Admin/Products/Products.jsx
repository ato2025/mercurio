import React, { useEffect, useState } from "react";
import AdminPanelTitles from "../../../components/modules/AdminPanelTitle/AdminPanelTitle";
import CustomBtn from "../../../components/modules/CustomBtn/CustomBtn";
import AdminPagesTable from "../../../components/modules/AdminPagesTable/AdminPagesTable";
import { useDispatch, useSelector } from "react-redux";
import { getProductsData } from "../../../store/slices/product/productsExtraReducers";
import CloseIcon from "../../../components/icons/CloseIcon";
import { getHomeCategoriesData } from "../../../store/slices/HomePage/HomePageExtraReducer";
import { AxiosAdminApi } from "../../../Axios/Axios";
import Swal from "sweetalert2";

function AdminProducts() {
  const { productsData, productsDataLoading } = useSelector(
    (data) => data.products
  );
  const { categoriesData} = useSelector(
    (data) => data.HomePageSections
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
       category: "All",
    };
    dispatch(getProductsData(data));
    dispatch(getHomeCategoriesData());
 }, []);
  const [isShowModal, setIsShowModal] = useState();
  const [title, setTitle] = useState();
  const [categoryId, setCtegoryId] = useState(-1);
  const [image, setImage] = useState();
  const [thumbImage, setthumbImage] = useState();
  const [description, setDescription] = useState();
  const [editOrAdd,setEditOrAdd] = useState('edit')


const [productId,setProductId] = useState()
  const addProductsHandler = () => {
    setIsShowModal(true);
    setEditOrAdd('add')
  };

  const base64Convertor = (event,type) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64 = e.target.result.split(",")[1];
        type == 'main' && setImage(base64);
        type == 'tumb' && setthumbImage(base64)
        
      };

      reader.readAsDataURL(file);
    }
  };

  const modalSubmitHandler = ()=>{


if(editOrAdd == 'add'){
  const data = {
    title,
    categoryId ,
    imageBase64 : image,
    description,
    thumbnail: thumbImage      
}
AxiosAdminApi.post('/Product/Create',data)
.then(res=>{
  if(res.status == 200){
    Swal.fire({
      title: "Created Successfully",
      icon: "success"
    }).then(res=>res.isConfirmed &&  dispatch(getProductsData({category: "All",})) && setIsShowModal(false)) && setEditOrAdd('edit')
  }
})
}else if(editOrAdd == 'edit'){
 const data = {
    title ,
    categoryId ,
    imageBase64:image,
    description ,
    thumbnail:thumbImage ,
    id: productId,
  }

AxiosAdminApi.put('/Product/Update',data)
.then(res=>{
  if(res.status === 200){
     
    Swal.fire({
      title: "Edited Successfully",
      icon: "success"
    }).then(res=>res.isConfirmed &&  dispatch(getProductsData({category: "All",})) && setIsShowModal(false)) 
  }
})



}


  }

  const editHandler = ({title,imageBase64,id,description,categoryId,thumbnail})=>{
    setTitle(title)
    setCtegoryId(categoryId)
    setImage(imageBase64)
    setDescription(description)
    setthumbImage(thumbnail)
    setProductId(id)
    setIsShowModal(true)

  }

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
  
  
        AxiosAdminApi.delete(`/Product/Delete/${id}`)
        .then(res=>{
          if(res.status == 200){
            Swal.fire({
              title: "Deleted!",
              text: "Your Product has been deleted.",
              icon: "success"
            }).then(res=>{
              if(res.isConfirmed){
                dispatch(getProductsData({category: "All"}))
              }
            })
          }
        })
  
        
      }
    });

   


  }

  return (
    <>
      <div className="w-full ">
        <AdminPanelTitles title={"Products"} />
        <div className="pe-10 lg:pe-20 py-7">
          <CustomBtn title={"Add"} onclick={addProductsHandler} />
          <AdminPagesTable
            data={productsData}
            dataLoding={productsDataLoading}
            editFunc={editHandler}
            deleteProduct ={deleteProduct }
          />
        </div>
      </div>

      {isShowModal && (
        <div className="w-full h-[100vh] z-[50] bg-[#00000016] absolute left-0 top-0 flex justify-center items-center  text-white">
          <div className="landingAdminBoxes px-4 py-2 w-[90vw] lg:w-[50vw] h-fit">
            <div className="flex justify-end items-center">
              <div
                className="w-fit h-fit"
                onClick={() => setIsShowModal(false)}
              >
                <CloseIcon className={"w-8 h-8 cp"} />
              </div>
            </div>
            <div className="addSection">
              <div className="text-2xl rounded-lg px-4 py-2">Title : </div>
              <div>
                <input
                  type="text"
                  className=" px-4 py-2 rounded-lg text-gray-700"
                  placeholder="Enter Title ..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="createProductCategoryBox">
              <div className="text-2xl mt-4 mb-2">Select Category :</div>
              <select
                onChange={(e) => {
                  setCtegoryId(e.target.value);
                }}
                value={categoryId}
                className="text-gray-700 my-2 rounded-lg px-4 py-2"
              >
                <option value="-1">Select Category</option>
          
                {categoriesData.map((item) => (
                  <option className="text-gray-700" value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="img64NewProduct">
            <div className="text-2xl mt-4 mb-2">Select Main Pic :</div>
              <input type="file" onChange={(e) => base64Convertor(e,'main')} />
            </div>
            <div className="NewProductDescription">
            <div className="text-2xl mt-4 mb-2">Description :</div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-lg px-4 py-2 text-gray-700"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="thumb64NewProduct">
            <div className="text-2xl mt-4 mb-2">Select Tumbnail Image :</div>
              <input type="file" onChange={(e) => base64Convertor(e,'thumb')} />
            </div>

<div className="flex justify-end items-center my-4">
  <button className="bg-blue-700 rounded-lg px-4 py-2 hover:bg-blue-500" onClick={modalSubmitHandler}>Submit</button>
</div>



          </div>
        </div>
      )}
    </>
  );
}

export default AdminProducts;
