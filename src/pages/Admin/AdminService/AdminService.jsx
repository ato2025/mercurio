import React, { useEffect, useState } from "react";
import AdminPanelTitles from "../../../components/modules/AdminPanelTitle/AdminPanelTitle";
import CustomBtn from "../../../components/modules/CustomBtn/CustomBtn";
import AdminPagesTable from "../../../components/modules/AdminPagesTable/AdminPagesTable";
import { useDispatch, useSelector } from "react-redux";
import { getServicesData } from "../../../store/slices/Services/servicesExtraReducers";
import CloseIcon from "../../../components/icons/CloseIcon";
import Swal from "sweetalert2";
import { AxiosAdminApi } from "../../../Axios/Axios";

function AdminService() {
  const { servicesData, servicesDataLoading } = useSelector(
    (data) => data.services
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServicesData());
  }, []);
  const [isShowModal, setIsShowModal] = useState();
  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState();
  const [title1, setTitle1] = useState();
  const [title2, setTitle2] = useState();
  const [title3, setTitle3] = useState();
  const [title3Items, setTitle3Items] = useState([]);
  const [title3Item, setTitle3Item] = useState();
  const [image, setImage] = useState();
  const [description, setDescription] = useState();
  const [homeDescription, setHomeDescription] = useState();
  const [editOrAdd, setEditOrAdd] = useState("edit");

  const addServiceHandler = () => {
    setTitle("");
    setTitle1("");
    setSubTitle("");
    setTitle3("");
    setTitle2("");
    setDescription("");
    setTitle3Items("");
    setIsShowModal(true);
    setEditOrAdd("add");
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
  const addModalSubmitHandler = () => {
    if (editOrAdd == "add") {
      const data = {
        title,
        title1,
        subtitle: subTitle,
        title2: title3,
        imageBase64: image,
        serviceItems: title3Items,
        extraTitle: title2,
        extraDescription: description,
        description: homeDescription,
      };

      Swal.fire({
        title: "Do you want to Add this Service ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Add",
        denyButtonText: `Don't Add`,
      }).then((result) => {
        if (result.isConfirmed) {
          AxiosAdminApi.post("/Service/Create", data).then((res) => {
            if (res.status == 200) {
              dispatch(getServicesData());
              Swal.fire("Added!", "", "success");
            }
          });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
      setIsShowModal(false);
    } else if (editOrAdd == "edit") {
      const data = {
        id,
        title,
        title1,
        subtitle: subTitle,
        title2: title3,
        imageBase64: image ? image : null,
        serviceUpdateItems: title3Items,
        extraTitle: title2,
        extraDescription: description,
        description: homeDescription,
      };

      Swal.fire({
        title: "Do you want to Edit this Service ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Edit",
        denyButtonText: `Don't Edit`,
      }).then((result) => {
        if (result.isConfirmed) {
          AxiosAdminApi.put("/Service/Update", data).then((res) => {
            if (res.status == 200) {
              dispatch(getServicesData());
              Swal.fire("Edited!", "", "success");
            }
          });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
      setIsShowModal(false)
    }
  };

  const editHandler = ({
    id,
    title,
    title1,
    subtitle,
    title2,
    extraTitle,
    extraDescription,
    serviceItems,
  }) => {
    setEditOrAdd("edit");
    setId(id);
    setTitle(title);
    setTitle1(title1);
    setSubTitle(subtitle);
    setTitle3(title2);
    setTitle2(extraTitle);
    setDescription(extraDescription);
    setTitle3Items(serviceItems);
    setIsShowModal(true);
  };
  const deleteService = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        AxiosAdminApi.delete(`/Service/Delete/${id}`).then((res) => {
          if (res.status == 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Service has been deleted.",
              icon: "success",
            }).then((res) => {
              if (res.isConfirmed) {
                dispatch(getServicesData());
              }
            });
          }
        });
      }
    });
  };

  return (
    <>
      <div className="w-full ">
        <AdminPanelTitles title={"Services"} />
        <div className="pe-10 lg:pe-20 py-7">
          <CustomBtn title={"Add"} onclick={addServiceHandler} />
          <AdminPagesTable
            data={servicesData}
            dataLoding={servicesDataLoading}
            editFunc={editHandler}
            deleteProduct={deleteService}
          />
        </div>
      </div>
      {isShowModal && (
        <div className="w-full h-[100vh] z-[50] bg-[#00000016] absolute left-0 top-0 flex justify-center items-center  text-white">
          <div className="landingAdminBoxes px-4 py-2 w-[90vw] lg:w-[50vw] h-[80vh] overflow-y-auto">
            <div className="flex justify-end items-center">
              <div
                className="w-fit h-fit"
                onClick={() => setIsShowModal(false)}
              >
                <CloseIcon className={"w-8 h-8 cp"} />
              </div>
            </div>
            <div className="addSection">
              <div className="text-2xl rounded-lg px-4 py-2">Main Title : </div>
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

            <div className="img64NewProduct">
              <div className="text-2xl mt-4 mb-2">Select Service Icon :</div>
              <input type="file" onChange={(e) => base64Convertor(e)} />
            </div>

            <div className="addSection">
              <div className="text-2xl rounded-lg px-4 py-2">
                First Paragraph Title :{" "}
              </div>
              <div>
                <input
                  type="text"
                  className=" px-4 py-2 rounded-lg text-gray-700"
                  placeholder="Enter Title ..."
                  value={title1}
                  onChange={(e) => setTitle1(e.target.value)}
                />
              </div>
            </div>

            <div className="NewProductDescription">
              <div className="text-2xl mt-4 mb-2">
                Second Paragraph Description :
              </div>
              <textarea
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                className="rounded-lg px-4 py-2 text-gray-700"
                cols="30"
                rows="10"
              ></textarea>
            </div>

            <div className="NewProductDescription">
              <div className="text-2xl mt-4 mb-2">Home Description :</div>
              <textarea
                value={homeDescription}
                onChange={(e) => setHomeDescription(e.target.value)}
                className="rounded-lg px-4 py-2 text-gray-700"
                cols="30"
                rows="10"
              ></textarea>
            </div>

            <div className="addSection">
              <div className="text-2xl rounded-lg px-4 py-2">
                Second Paragraph Title :{" "}
              </div>
              <div>
                <input
                  type="text"
                  className=" px-4 py-2 rounded-lg text-gray-700"
                  placeholder="Enter Title ..."
                  value={title2}
                  onChange={(e) => setTitle2(e.target.value)}
                />
              </div>
            </div>

            <div className="NewProductDescription">
              <div className="text-2xl mt-4 mb-2">
                {" "}
                Second paragraph Description :
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-lg px-4 py-2 text-gray-700"
                cols="30"
                rows="10"
              ></textarea>
            </div>

            <div className="addSection">
              <div className="text-2xl rounded-lg px-4 py-2">
                Third paragraph Title :{" "}
              </div>
              <div>
                <input
                  type="text"
                  className=" px-4 py-2 rounded-lg text-gray-700"
                  placeholder="Enter Title ..."
                  value={title3}
                  onChange={(e) => setTitle3(e.target.value)}
                />
              </div>
            </div>

            <div className="addSection">
              <div className="text-2xl rounded-lg px-4 py-2">
                Third paragraph Items :{" "}
              </div>
              <div>
                <input
                  type="text"
                  className=" px-4 py-2 rounded-lg text-gray-700"
                  placeholder="Enter Item ..."
                  onChange={(e) => setTitle3Item(e.target.value)}
                  value={title3Item}
                />
                <button
                  className="bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 ms-2 rounded-lg"
                  onClick={() => {
                    // const data = {
                    //   id: crypto.randomUUID(),
                    //   title: title3Item,
                    // };
                    if (title3Item) {
                      setTitle3Items((prev) => [...prev, title3Item]);
                    }
                    setTitle3Item("");
                  }}
                >
                  Add
                </button>
                <button
                  className="bg-red-700 hover:bg-red-900 text-white px-4 py-2 ms-2 rounded-lg"
                  onClick={() => {
                    setTitle3Items([]);
                  }}
                >
                  Reset
                </button>
                <div className="text-2xl rounded-lg px-4 py-2"> Items : </div>
                <div>
                  {Array.isArray(title3Items) &&
                    title3Items.map((item, index) => (
                      <div key={index}>
                        {index + 1} -- {item}
                        <button
                          className="bg-red-700 hover:bg-red-900 text-white px-2 py-1 ms-2 rounded-lg"
                          onClick={() => {
                            setTitle3Items((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center my-4">
              <button
                className="bg-blue-700 rounded-lg px-4 py-2 hover:bg-blue-500"
                onClick={addModalSubmitHandler}
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

export default AdminService;
