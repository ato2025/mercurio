import React from "react";
import SectionsTitle from "../../../modules/SectionsTitle/SectionsTitle";
import Skeleton from "../../../modules/Skeleton/Skeleton";

function HomeWhyUs({whyUsDataLoading ,whyUsData}) {

const whyUs = [
   {title:'Experience',subTitle:'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms.'},
   {title:'Transparency',subTitle:'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms.'},
   {title:'Prices',subTitle:'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms.'},
   {title:'Versatility',subTitle:'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms.'},
   {title:'Responsibility',subTitle:'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms.'},
]


  return (
    <div className="bg-slate-900 px-10 xl:px-64 pb-10">
      <div className="py-10 ">
        <SectionsTitle title={"Why Us ?"} />
      </div>
      <div className=" w-full grid grid-cols-1 gap-0  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 px-4 py-2 rounded-lg">

      {
     !whyUsDataLoading ? whyUsData.map((item,index)=>(
      <div key={index} className={`w-full  h-56   px-4 py-2 my-3`}>
      <div className="text-white text-3xl text-nowrap"> 0{item.priority} - {item.title}</div>
      <div className={`mt-3 text-base font-semibold h-[15vh] overflow-y-auto  text-gray-300 `}>
        {item.description}
      </div>
    </div>
   )) : <Skeleton count={3} />
}
      </div>
    </div>
  );
}

export default HomeWhyUs;
