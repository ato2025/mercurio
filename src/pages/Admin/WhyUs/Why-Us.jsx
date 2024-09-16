import React, { useEffect, useState } from "react";
import AdminPanelTitles from "../../../components/modules/AdminPanelTitle/AdminPanelTitle";
import CustomBtn from "../../../components/modules/CustomBtn/CustomBtn";
import { useDispatch, useSelector } from "react-redux";
import { getHomeWhyUsData } from "../../../store/slices/HomePage/HomePageExtraReducer";
import AdminPagesTable from "../../../components/modules/AdminPagesTable/AdminPagesTable";
import Skeleton from "../../../components/modules/Skeleton/Skeleton";

import WhyUsRow from "./component/WhyUsRow";
import { AxiosAdminApi } from "../../../Axios/Axios";
import Swal from "sweetalert2";
import CloseIcon from "../../../components/icons/CloseIcon";

function WhyUS() {
  const { whyUsDataLoading, whyUsData } = useSelector(
    (data) => data.HomePageSections
  );
  const dispatch = useDispatch();

  const [title, setTitle] = useState();
  const [priorty, setPriorty] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    dispatch(getHomeWhyUsData());
  }, []);

  const addHomeWhyUsHandler = () => {
    setIsShowModal(true);
  };
  const [isShowModal, setIsShowModal] = useState();

  const addNewWhyUs = () => {
    const data = {
      priority: priorty,
      title,
      description,
    };

    AxiosAdminApi.post("/WhyUs/Create", data).then((res) => {
      if (res.status == 200) {
        Swal.fire({
          title: "Created Successfully",
          icon: "success",
        }).then(
          (res) =>
            res.isConfirmed &&
            dispatch(getHomeWhyUsData()) &&
            setIsShowModal(false)
        );
      }
    });
  };

  return (
    <>
      <div className="w-full ">
        <AdminPanelTitles title={"Home Why Us"} />
        <div className="pe-10 lg:pe-20 py-7">
          <CustomBtn title={"Add"} onclick={addHomeWhyUsHandler} />
          {/* <AdminPagesTable data={whyUsData} dataLoding={whyUsDataLoading} /> */}
          <table className="w-full h-full bg-[#8080804b]   rounded-lg   ">
            <tr className="w-full border-b border-gray-500 sticky bg-[#04040499] top-0 left-0">
              <th className="text-white py-4 ">Id</th>
              <th className="text-white py-4">Name</th>
              <th className="text-white py-4 ">Description </th>
              <th className="text-white py-4">Action</th>
            </tr>
            {whyUsDataLoading ? (
              <Skeleton count={3} />
            ) : (
              whyUsData.map((item) => (
                <>
                  <WhyUsRow item={item} />
                </>
              ))
            )}
          </table>
        </div>
      </div>
      {isShowModal && (
        <div className="w-full h-[100vh] z-[50] bg-[#00000016] absolute left-0 top-0 flex justify-center items-center  text-white">
          <div className="landingAdminBoxes px-4 py-2 w-[90vw] lg:w-[50vw] h-fit">
          <div className="flex justify-end items-center">
              <div className="w-fit h-fit" onClick={()=>setIsShowModal(false)}>
              <CloseIcon className={'w-8 h-8 cp'}/>
              </div>
              </div>
            <div className="text-white text-2xl">Title :</div>
            <div>
              <input
                type="text"
                className="rounded-lg px-4 py-2 my-5 text-gray-700"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="text-white text-2xl">Priorty :</div>
            <div>
              <input
                type="number"
                className="rounded-lg text-gray-700 px-4 py-2 my-5"
                placeholder="Priorty"
                value={priorty}
                onChange={(e) => setPriorty(e.target.value)}
              />
            </div>

            <div className="text-white text-2xl">Description :</div>
            <div>
              <textarea
                placeholder="Description"
                className="rounded-lg text-gray-700 px-4 py-2 my-5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="10"
              ></textarea>
            </div>

            <div className="flex justify-end items-center px-4 py-4">
              <button
                className="bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
                onClick={addNewWhyUs}
              >
                {" "}
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WhyUS;
