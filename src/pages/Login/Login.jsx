import React, { useEffect, useState } from "react";
import { AxiosApi } from "../../Axios/Axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import EyeIcon from "../../components/icons/EyeIcon";
import EyeIcon2 from "../../components/icons/EyeIcon2";

function Login() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const [passwordInputType ,setPasswordInputType] = useState('password')

  const setPasswordInputTypeHandler = ()=>{
    if(passwordInputType == 'password'){
      setPasswordInputType('text')
    }else if(passwordInputType == 'text'){
      setPasswordInputType('password')
    }
  }


  const navigate = useNavigate()
const loginHandler =()=>{
const data = {
  userName,password
}
AxiosApi.post('/Account/Authenticate',data)
.then(res=>{
  if(res.status == 200){
    localStorage.setItem('userKey',res.data)
    Swal.fire({
      title: "Logged In",
      text: "WelCome To Mercurio",
      icon: "success",
      confirmButtonText: 'Login',
      customClass: {
        confirmButton: 'sweetConfirmBtn'
      }
    }).then(res=>res.isConfirmed && navigate('/'))
  }
  
}).catch(err=>{
  
    Swal.fire({
      text: "UserName Or Password is not valid",
      icon: "error",
      confirmButtonText: 'Try Again',
      customClass: {
        confirmButton: 'sweetConfirmBtn'}})
      

})
}
 const  forgetPasswordHandler = ()=>{
   Swal.fire({
    title: "Input email address",
    input: "email",
    inputLabel: "Your email address",
    inputPlaceholder: "Enter your email address"
  })
  .then(e=>{
    const data = {
      gamil:e.value
    }
    AxiosApi.patch(`/Account/SendPassByEmail/${e.value}`)
    .then(res=>{
      if(res.status == 200){
         Swal.fire({
          title: "Input email address",
          input: "text",
          inputLabel: "Enter Code",
          inputPlaceholder: "Code ... "
        })
        .then(event=>{
          setPassword(event.value)
          setUserName(e.value)
          loginHandler()
        })
        
      }
    })
    .catch(err=>{
      Swal.fire({
        title: "Invalid Information",
        icon: "error"
      });
    })
    
  })
}


  return (
   <>
   <div className="w-full h-[100vh] relative">
              <img src="./pic1.jpg" className="w-full h-[100vh] " alt="" />
              <div className="w-full h-full absolute left-0 top-0 flex flex-col justify-center items-center">
                <div className="w-[90%] md:w-[40%] h-1/3 bg-[#80808084] rounded-xl flex flex-col px-5 py-10">
                  <input
                    type="text"
                    className=" w-[90%] my-3 px-3 rounded-lg py-2 outline-0 hover:bg-sky-100 hover:border-blue-400 focus:border-blue-400 focus:bg-sky-100 focus:border-2 hover:border-2"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter Username ..."
                  />
                  <div className="w-[90%] relative">
                  <input
                    type={passwordInputType}
                    className="  my-3 px-3 w-full rounded-lg py-2 outline-0 hover:bg-sky-100 hover:border-blue-400 focus:border-blue-400 focus:bg-sky-100 focus:border-2 hover:border-2"
                    placeholder="Enter Password ..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e)=>{
                      if(e.keyCode == 13){
                        loginHandler()
                      }
                    }}
                  />
                  <div className="w-fit h-fit absolute right-2 top-5 " onClick={setPasswordInputTypeHandler}>
                    <EyeIcon2 />
                  </div>
                  </div>
                  <button className="text-blue-700 w-fit" onClick={forgetPasswordHandler}>Forget your Password ?</button>
                  <button className="bg-blue-500 w-fit px-4 py-2 rounded-lg text-white ms-auto me-[10%] hover:bg-blue-700" onClick={loginHandler}>
                    Login
                  </button>
                </div>
              </div>
            </div>
   </>
  );
}

export default Login;
