import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import CloseIcon from "../../components/icons/CloseIcon";
import { AxiosAdminApi } from "../../Axios/Axios";
import AdminTableRow from "../../components/modules/AdminTableRow/AdminTableRow";
import AdminPanelTitles from "../../components/modules/AdminPanelTitle/AdminPanelTitle";
import AdminPanelUserRow from "../../components/modules/AdminPanelUserRow/AdminPanelUserRow";
import { useDispatch, useSelector } from "react-redux";
import { getUsersData } from "../../store/slices/Users/UsersExtraReducers";
import Swal from "sweetalert2";

function UsersPanel() {
  const [user, setUser] = useState();
  const [image, setImage] = useState();
  const [fName, setFName] = useState();
  const [lName, setLName] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const [userPassword,setUserPassword] = useState('')
  const [userPassword2,setUserPassword2] = useState('')
  const { usersDataLoading, usersData } = useSelector((state) => state.users);


  useEffect(() => {
    dispatch(getUsersData());
    try {
      const decodedToken = jwtDecode(localStorage.getItem("userKey"));
      setUser(decodedToken);
    } catch (error) {}
  }, []);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const addUserModalHandler = () => {
    setShowAddUserModal(true);
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

  const setUpUser = () => {
    const data = {
      firstName: fName,
      lastName: lName,
      userName: userName,
      password: password,
      userType: 2,
      imageBase64: image,
    };
    AxiosAdminApi.post("/Account/Create", data).then((res) => {
      if (res.status == 200) {
        dispatch(getUsersData());
        setFName('')
        setLName('')
        setPassword('')
        setUserName('')
        setShowAddUserModal(false)
        Swal.fire({
          title: "User Added",
          icon: "success"
        });
      }
    });
  };

  const userChangingPasswordHandler =()=>{
    if(userPassword.length > 0 && (userPassword == userPassword2)){
      const data ={
        userName: user.Email,
        password: userPassword
      }
      AxiosAdminApi.patch("/Account/ChangePasswordAdmin", data).then(
        (res) => {
          if (res.status == 200) {
            setUserPassword('')
            setUserPassword2('')
            Swal.fire({
              title: "Changed Successfuly",
              icon: "success",
            });
          }
        }
      );
    }else{
      Swal.fire({
        title: "please Enter Valid Password",
        icon: "info",
      });
    }

  }





  return (
    <>
    {
    user && user.Type == 'Admin' ? (
<>
<div>
        <div className="text-2xl md:text-4xl lg:text-6xl text-white py-10 px-4">
          Users
        </div>
        <div className="flex justify-end items-center px-10  lg:px-40">
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-900 text-2xl text-white rounded-lg"
            onClick={addUserModalHandler}
          >
            Add
          </button>
        </div>
        <div className="py-20">
          <table className="w-full h-[50vh]">
            <tr className="text-white flex my-5">
              <th className="w-[33%] flex justify-center items-center">#</th>
              <th className="w-[33%] flex justify-center items-center">
                Name
              </th>
              <th className="w-[33%] flex justify-center items-center">
                Password
              </th>
              <th className="w-[33%] flex justify-center items-center">
                Delete
              </th>
            </tr>
            {usersData &&
              usersData.map((user, index) => (
                <>
                  <AdminPanelUserRow key={index} user={user} />
                </>
              ))}
          </table>
        </div>
      </div>
      {showAddUserModal && (
        <div className="w-full h-[100vh] z-[50] bg-[#00000016] absolute left-0 top-0 flex justify-center items-center  text-white">
          <div className="landingAdminBoxes px-4 py-2 w-[90vw] lg:w-[50vw] h-fit">
            <div className="flex justify-end items-center">
              <div
                className="w-fit h-fit"
                onClick={() => setShowAddUserModal(false)}
              >
                <CloseIcon className={"w-8 h-8 cp"} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="w-full flex justify-center md:justify-start items-center">
                <input
                  type="text"
                  className="w-1/2 rounded-lg px-4 py-2 my-5 outline-0 text-gray-900 hover:text-white hover:bg-[#4892c338] focus:bg-[#4892c338]"
                  placeholder="First Name"
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-center md:justify-start items-center">
                <input
                  type="text"
                  className="w-1/2 rounded-lg px-4 py-2 my-5 outline-0 hover:bg-[#4892c338] focus:bg-[#4892c338] text-gray-900 hover:text-white"
                  placeholder="Last Name"
                  value={lName}
                  onChange={(e) => setLName(e.target.value)}
                />
              </div>

              <div className="w-full flex justify-center md:justify-start items-center">
                <input
                  type="email"
                  className="w-1/2 rounded-lg px-4 py-2 my-5 outline-0 hover:bg-[#4892c338] focus:bg-[#4892c338] text-gray-900 hover:text-white"
                  placeholder="Email"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-center md:justify-start items-center">
                <input
                  type="text"
                  className="w-1/2 rounded-lg px-4 py-2 my-5 outline-0 hover:bg-[#4892c338] focus:bg-[#4892c338] text-gray-900 hover:text-white"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-5 text-2xl">Upload User Picture :</div>
            <div className="w-full flex justify-center md:justify-start items-center">
              <input
                type="file"
                className="w-1/2 rounded-lg px-4 py-2 my-5 outline-0 hover:bg-[#4892c338] focus:bg-[#4892c338]"
                placeholder="First Name"
                onChange={(e) => base64Convertor(e)}
              />
            </div>

            <div className="flex justify-end items-center">
              <button
                className="text-lg px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded-lg"
                onClick={setUpUser}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
</>
     ):(
     <>
      <div className="text-white text-2xl lg:text-4xl mt-10">Change Password</div>
      <div>
        <input type="text" className=" rounded-lg  px-4 py-2 my-5" placeholder="Enter Password" value={userPassword} onChange={e=>setUserPassword(e.target.value)} />
      </div>
      <div>
        <input type="text" className=" rounded-lg  px-4 py-2 my-5" placeholder="Confirm Password" value={userPassword2} onChange={e=>setUserPassword2(e.target.value)} />
      </div>
      <div>
        <button className="text-white bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg" onClick={userChangingPasswordHandler}>Change Password</button>
      </div>
     </>
     )
    }
    
    </>
  );
}

export default UsersPanel;
