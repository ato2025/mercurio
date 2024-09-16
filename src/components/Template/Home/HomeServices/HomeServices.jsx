import React from "react";
import SectionsTitle from "../../../modules/SectionsTitle/SectionsTitle";
import Skeleton from "../../../modules/Skeleton/Skeleton";

function HomeServices({homeServicesDataLoading,homeServicesData,showBg,showTitle}) {
  
  return (
    <div className={`${showBg ? 'HomeServicesContainer':''} py-7`}>
      {
        showTitle && <SectionsTitle title={'Discover Our Services'}/>
      }
      <div className="px-4 md:px-16 mt-4">
      <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 rounded-3xl px-5 servicesItemsContainer`}>
        {!homeServicesDataLoading ? homeServicesData.map((sevice, index) => (
          <div key={index} className="mx-auto w-72 my-5 px-5" data-aos={sevice.aos} >
            <img src={`data:image/jpg;base64,${sevice.imageBase64}`}  className="w-[120px]" alt="" />
            <h3 className="text-2xl my-5 font-semibold text-gray-200 text-nowrap">{sevice.title}</h3>
            <div className="font-semibold text-gray-300 w-full  h-[20vh]">{sevice.description}</div>
          </div>
        )):<Skeleton count={4} />}
      </div>
      </div>
    </div>
  );
}

export default HomeServices;
