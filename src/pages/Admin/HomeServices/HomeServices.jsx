import React, { useEffect, useState } from "react";
import AdminPanelTitles from "../../../components/modules/AdminPanelTitle/AdminPanelTitle";
import CustomBtn from "../../../components/modules/CustomBtn/CustomBtn";
import AdminPagesTable from "../../../components/modules/AdminPagesTable/AdminPagesTable";
import { useDispatch, useSelector } from "react-redux";
import { getHomeServiceData } from "../../../store/slices/HomePage/HomePageExtraReducer";
import CloseIcon from "../../../components/icons/CloseIcon";
import Swal from "sweetalert2";
import { AxiosAdminApi } from "../../../Axios/Axios";

function HomeServices() {
  const { homeServicesDataLoading, homeServicesData } = useSelector(
    (data) => data.HomePageSections
  );
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState();
  const [categoryTitle, setCategoryTitle] = useState();
  const [categoryId, setCategoryId] = useState();
  const [image, setImage] = useState();
  const [description,setDescription] = useState()
  const [editOrAdd,setEditOrAdd] = useState()
  useEffect(() => {
    dispatch(getHomeServiceData());
  }, []);
  // const addHomeServiceHandler = () => {};

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

  const editFunc = ({title,imageBase64,id,description}) => {
    setIsShowModal(true);
    setCategoryTitle(title);
    setImage( imageBase64);
    setCategoryId(id);
    setDescription(description)
    setEditOrAdd("edit");

  };

  const SubmitHandler = () => {
    const data = {
      title: categoryTitle,
      imageBase64: image,
      id: categoryId,
      description
    };

    Swal.fire({
      title: "Do you want to Edit this Service ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Edit",
      denyButtonText: `Don't Edit`,
    }).then((result) => {
      if (result.isConfirmed) {
        AxiosAdminApi.put("/Service/UpdateSummary", data).then((res) => {
          if (res.status == 200) {
           
            Swal.fire("Edited!", "", "success");
            dispatch(getHomeServiceData())
            setIsShowModal(false)
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
        setIsShowModal(false)
      }
    });

  };

  const deleteProduct = (id) => {};

  return (
    <>
      <div className="w-full ">
        <AdminPanelTitles title={"Home Services"} />
        <div className="pe-10 lg:pe-20 py-7">
          {/* <CustomBtn title={"Add"} onclick={addHomeServiceHandler} /> */}
          <AdminPagesTable
            editFunc={editFunc}
            deleteProduct={deleteProduct}
            data={homeServicesData}
            dataLoding={homeServicesDataLoading}
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
            <div className=" text-2xl">Service Title :</div>
            <div className="my-2">
              <input
                type="text"
                className="rounded-lg px-4 py-2 text-gray-700"
                placeholder="Service Name"
                value={categoryTitle}
                onChange={(e) => {
                  setCategoryTitle(e.target.value);
                }}
              />
            </div>

            <div className=" text-2xl">Service Description :</div>
            <div className="my-2">
            <textarea placeholder="Service Description" className="rounded-lg px-4 py-2 text-gray-700"  value={description} onChange={(e)=>setDescription(e.target.value)} cols="30" rows="10"></textarea>
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

export default HomeServices;
