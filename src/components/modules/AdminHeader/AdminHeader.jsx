import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
function AdminHeader() {

const [user,setUser] = useState()
  useEffect(()=>{
    const decodedToken = jwtDecode(localStorage.getItem("userKey"));
    setUser(decodedToken);
  },[])

  return (
    <>
    <div className="w-full py-2  pe-5 adminHeader flex justify-end items-center">
            <div className="text-white ms-auto flex justify-center items-center gap-3">
             <div> Hello {user && user.FullName}</div>
              <img src={`http://192.168.50.127/img/user/${user && user.Image}`} className="w-12 h-12 rounded-full" alt="" />
              </div>
        </div>
    </>
  )
}

export default AdminHeader