import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChevDown from "../../icons/ChevDown";
import ChevUpIcon from "../../icons/ChevUpIcon";
import Swal from "sweetalert2";

function AsideBarItem({ title, icon, sections, openMobile ,closeMenu,togglerPositionHandler }) {
  const [isShowAsideItems, setIsShowAsideItems] = useState(false);
  const navigate = useNavigate()
  return (
    <>
      <div className="relative grid grid-cols-1 py-4 justify-start  items-center">
        <div className="flex justify-start items-center gap-3 px-2">
          <div className="w-6">{icon}</div>
          <div
            className={`text-nowrap w-2/3 truncate ${
              openMobile ? "block !lg:block" : "hidden lg:block"
            } ${!sections && 'cp'} `}
            onClick={()=>{
              !sections && navigate('/')
              closeMenu()
              if(title =='LogOut'){
                Swal.fire({
                  title: "Exit",
                  text: "Do you want to Exit ?",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonText: 'LogOut',
                  cancelButtonText:'Cancel',
                  customClass: {
                    confirmButton: 'sweetConfirmBtn'
                  }
                }).then(res=>{if(res.isConfirmed){ 
                  localStorage.clear()
                  navigate('/')
                }})
              }
            }}
          >
            {title}
          </div>
          {
            sections && (
              <div
              className={`ms-auto cp ${
                openMobile ? "block !lg:block" : "hidden lg:block"
              }`}
              onClick={() => {
                setIsShowAsideItems((prev) => !prev);
              }}
            >
              {isShowAsideItems ? <ChevUpIcon /> : <ChevDown />}
            </div>
            )
          }
         
        </div>
        {sections && (
          <div
            className={` justify-center items-start flex-col w-full ${
              isShowAsideItems ? "h-fit flex" : "h-0 hidden"
            }  overflow-hidden bg-[#00000091] px-8 my-4 `}
          >
            {sections.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="py-2 text-nowrap"
                onClick={() => {
                  closeMenu()
                  togglerPositionHandler(prev=>!prev)
                  setIsShowAsideItems((prev) => !prev);
                }}
              >
                ... {item.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AsideBarItem;
