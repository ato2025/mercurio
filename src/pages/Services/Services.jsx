import React, { useEffect, useState } from "react";
import PageBgLayout from "../../components/modules/PageBgLayout/PageBgLayout";
// import HomeServices from "../../components/Template/Home/HomeServices/HomeServices";
import ServiceTitleAndDesk from "../../components/Template/Service/ServiceTitleAndDesk";
import { getServicesData } from "../../store/slices/Services/servicesExtraReducers";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "../../components/modules/Skeleton/Skeleton";
// import { AxiosApi } from "../../Axios/Axios";

function Services() {
  // const [service, setService] = useState([]);
  const dispatch = useDispatch();
  const { servicesData, servicesDataLoading } = useSelector(
    (data) => data.services
  );
  useEffect(() => {
    dispatch(getServicesData());
  }, []);

  return (
    <>
      {/* <PageBgLayout
        height={"h-[45vh]"}
        img={"./service/service.jpg"}
        title={"Services"}
        DesktopImg={'./service/serviceDesktop.jpg'}
      /> */}
      <div className={`w-full h-[50vh] relative overflow-x-hidden`}>
        <video
          loop
          autoPlay
          muted
          className="absolute w-full h-full left-0 top-0 object-cover overflow-x-hidden"
        >
          <source src="./service/serviceBg2.mp4" type="video/mp4" />
        </video>
        <div className="absolute left-0 top-0 w-full h-full bg-[#000000d9] mix-blend-multiply  ">
          <div className="text-6xl font-extrabold bg-[#2e1e1e29] text-[#fefefe] h-full text-blue flex justify-center items-center">
            Services
          </div>
        </div>
      </div>
      <div className="bg-slate-900 w-full py-10 grid grid-cols-1  ">
   

        { !servicesDataLoading ? servicesData.map((item, index) => (
          <div
            key={index}
            className=" bg-[#33333392] w-[90%] mx-auto rounded-lg overflow-hidden my-5 lg:my-20"
          >
            <div className={`xl:col-span-1 bg-[#ebeaea61] h-[30vh] flex justify-center items-center flex-col px-4 py-5 }`}>
              <img
                src={`data:image/jpg;base64,${item.imageBase64}`}
                className="w-[150px] mx-auto h-[150px]"
                style={{width:'150px',height:'150px'}}
                alt=""
              />
              <div className="text-white font-semibold text-2xl xl:text-xl text-nowrap">
                {item.title}
              </div>
            </div>

            <div className="xl:col-span-4 mx-10 py-5  ">
            <ServiceTitleAndDesk title={item.title1} desc={item.subtitle} />
            {
              item.extraTitle ? <ServiceTitleAndDesk title={item.extraTitle} desc={item.extraDescription} /> :null
            }
            
              <div className="text-white text-2xl font-semibold mt-5 mb-3">
                {item.title2}
              </div>
              <ul className="ps-5 h-[20vh] overflow-y-auto flex flex-wrap gap-x-10">
                {item.serviceItems.map((item, index) => (
                  <li key={index} className="text-blue-400 my-1 text-lg ">
                    {index + 1}. {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )): <Skeleton count={3} />}

      </div>
    </>
  );
}

export default Services;
