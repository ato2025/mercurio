import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AxiosAdminApi } from "../../../Axios/Axios";
import { getUsersData } from "../../../store/slices/Users/UsersExtraReducers";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

function AdminPanelUserRow({ user }) {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const decodedToken = jwtDecode(localStorage.getItem("userKey"));
    setCurrentUser(decodedToken);
  }, []);

  const dispatch = useDispatch();
  const deleteHandler = () => {
    if (user.userName !== currentUser.Email) {
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
          AxiosAdminApi.delete(`/Account/Delete/${user.id}`).then((res) => {
            if (res.status == 200) {
              dispatch(getUsersData());
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success",
              });
            }
          });
        }
      });
    } else if (user.userName == currentUser.Email) {
      Swal.fire({
        title: "Error",
        text: "You Can't Delete Your Accout",
        icon: "error",
      });
    }
  };

  const EditHandler = () => {
    Swal.fire({
      title: "Enter New Password",
      input: "text",
      inputLabel: "New Password",
      // inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    }).then((res) => {
      if (res.isConfirmed) {
        const data = {
          userName: user.userName,
          password: res.value,
        };
        AxiosAdminApi.patch("/Account/ChangePasswordAdmin", data).then(
          (res) => {
            if (res.status == 200) {
              Swal.fire({
                title: "Changed Successfuly",
                // text: "That thing is still around?",
                icon: "success",
              });
            }
          }
        );
      }
    });
  };

  return (
    <>
      <tr className="text-white  flex my-5">
        <th className="w-[33%] flex justify-center  items-center">
          <img
            src={`http://192.168.50.127/img/user/${user.image}`}
            className="w-14 h-14 rounded-full"
            alt=""
          />
        </th>
        <th className="w-[33%] flex justify-center items-center truncate">
          {user.firstName}
        </th>
        <th className="w-[33%] flex justify-center items-center">
          <button
            className="bg-blue-400 px-2 lg:px-4 py-2 hover:bg-blue-600 t07 rounded-lg"
            // onClick={() => setIsShowPasswordChangeModal(true)}
            onClick={() => EditHandler()}
          >
            Edit
          </button>
        </th>
        <th className="w-[33%] flex justify-center items-center">
          <button
            className="bg-red-400 px-2 lg:px-4 py-2 hover:bg-red-600 t07 rounded-lg"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </th>
      </tr>
    </>
  );
}

export default AdminPanelUserRow;
