import React, { useEffect, useState } from "react";
import PageBgLayout from "./../../components/modules/PageBgLayout/PageBgLayout";
import Map from "./../../components/modules/Map/Map";
import { useDispatch, useSelector } from "react-redux";
import { getInfosData } from "../../store/slices/Infos/InfosExtraReducers";
import Swal from "sweetalert2";
import { sendMessagesData } from "../../store/slices/Messages/messagesExtraReducers";
function ContactUS() {
  const dispatch = useDispatch();
  const { phone, lat, lan, email, address } = useSelector(
    (data) => data.Infos.InfosData
  );

  const [senderName, setSenderName] = useState();
  const [senderEmail, setSenderEmail] = useState();
  const [senderMessage, setSenderMessage] = useState();

  useEffect(() => {
    dispatch(getInfosData());
  }, []);


  const sendMessageHandler = () => {

    if (senderEmail && senderMessage && senderName) {
      const data = {
        fullName: senderName,
        email: senderEmail,
        message: senderEmail,
      };
      dispatch(sendMessagesData(data))
    }else{
      Swal.fire({
        title: "Invalid Request",
        text: "Please Fill The Boxes",
        icon: "info",
        confirmButtonText: 'Ok',
        customClass: {
          confirmButton: 'sweetConfirmBtn'
        }
      });
    }
  };

  return (
    <>
      <div className={`w-full h-[50vh] relative overflow-x-hidden`}>
        <video
          loop
          autoPlay
          muted
          className="absolute w-full h-full left-0 top-0 object-cover overflow-x-hidden"
        >
          <source src="./tower.mp4" type="video/mp4" />
        </video>
        <div className="absolute left-0 top-0 w-full h-full bg-[#0000007a] mix-blend-multiply  ">
          <div className="text-6xl font-extrabold bg-[#2e1e1e18] text-[#fefefe] h-full text-blue flex justify-center items-center">
            Contact Us
          </div>
        </div>
      </div>
      <div className="lg:flex justify-center items-center w-full  my-20">
        <div className="w-full px-4 pb-7 lg:pb-0 lg:border-0 lg:px-0 mx-auto border-b-2 border-gray-700  lg:w-[40%]  flex justify-center items-start lg:ps-[5%]  gap-7 flex-col">
          <div className="contact-title text-2xl lg:text-5xl font-semibold mb-10">
            Contacts
          </div>
          <div className="flex">
            <div className="pt-1 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 me-1 text-gray-600"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            </div>
            <div className="grid grid-cols-6 contactUs-item">
              <div className="text-2xl col-span-2 md:col-span-full  font-semibold text-nowrap lg:w-[6vw]">
                Address:
              </div>
              <div className="text-base pt-2 lg:text-xl col-span-4 ms-3 flex  items-center text-gray-500 w-[40vw] lg:w-[20vw]  ">
                {address}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center contactUs-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 me-1 text-gray-600"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>

            <div className="text-2xl font-semibold text-nowrap">Phone:</div>
            <a
              href={`tel:${phone}`}
              className="text-xl mt-1 ms-3 text-blue-500 font-semibold"
            >
              {phone}
            </a>
          </div>

          <div className="flex justify-center items-center contactUs-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 me-1 text-gray-600"
            >
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>

            <div className="text-2xl font-semibold text-nowrap">E-mail:</div>
            <a
              href={`mailto:${email}`}
              className="text-xl mt-1 ms-3 text-blue-500 font-semibold"
            >
              {email}
            </a>
          </div>
        </div>

        <div className="w-11/12 mx-auto mt-10 lg:mt-0 lg:w-[45%]">
          <div className="text-xl lg:text-5xl font-semibold capitalize">
            Send us a message
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-10">
            <div className="">
              <div className="text-xl font-semibold  mb-2">Name: </div>
              <input
                type="text"
                placeholder="Name"
                className="w-3/4 border border-t-slate-500 rounded-lg px-1 py-2 outline-none focus:border-blue-400 focus:border-2 focus:bg-[#0963ea19]"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
              />
            </div>
            <div className="">
              <div className="text-xl font-semibold  mb-2">Email: </div>
              <input
                type="email"
                placeholder="Email"
                className="w-3/4 border border-t-slate-500 rounded-lg px-1 py-2 outline-none focus:border-blue-400 focus:border-2 focus:bg-[#0963ea19]"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="text-xl font-semibold mt-5 mb-2">Message:</div>
          <div className="w-[88%] ">
            <textarea
              className="w-full  border border-t-slate-500 rounded-lg px-1 py-2 outline-none focus:border-blue-400 focus:border-2 focus:bg-[#0963ea19]"
              placeholder="Message"
              value={senderMessage}
              onChange={(e) => setSenderMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end items-center pe-[12%] mt-10">
            <button
              className="ms-auto bg-blue-500 hover:bg-blue-700 t07 text-white px-4 py-2 rounded-lg"
              onClick={sendMessageHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="w-[85%] h-[40vh]  mb-[10vh] mx-auto">
        {/* <Map height='h-[40vh]' loc={[Number(lat),Number(lan)]} /> */}
        {lat && <Map height={"h-[40vh]"} loc={[Number(lat), Number(lan)]} />}
      </div>
      
    </>
  );
}

export default ContactUS;
