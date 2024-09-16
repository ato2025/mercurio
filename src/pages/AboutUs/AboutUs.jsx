import React, { useEffect } from "react";
import PageBgLayout from "../../components/modules/PageBgLayout/PageBgLayout";
import CounterItems from "../../components/Template/aboutUs/CounterItems/CounterItems";
import { useDispatch, useSelector } from "react-redux";
import {
  getAboutUsData,
  getOurCompanyData,
} from "../../store/slices/AboutUs/aboutUsExtraReducer";
import Skeleton from "../../components/modules/Skeleton/Skeleton";

function AboutUs() {
  const dispatch = useDispatch();
  const { aboutUsData, aboutUsDataLoading , ourCompanyDataLoading,ourCompanyData } = useSelector(
    (data) => data.AboutUs
  );

  useEffect(() => {
    dispatch(getAboutUsData());
    dispatch(getOurCompanyData());
  }, []);
  
  return (
    <>
      <PageBgLayout
        height={"h-[45vh]"}
        img={"./aboutus/aboutusMobile.jpg"}
        title={"About Us"}
        DesktopImg={"./aboutus/aboutusDesktop.jpg"}
      />

      <div className="w-full bg-slate-800 pt-10">
        {aboutUsDataLoading ? (
          <Skeleton count={2} />
        ) : (
          <div className="w-3/4 py-5 px-3 mx-auto mb-10 text-white bg-[#83c3de25] rounded-lg">
            <h1 className="text-3xl mb-5"> {aboutUsData.title} </h1>
            <p className="px-4 text-justify">{aboutUsData.description}</p>
            <p className="px-4 text-justify">{aboutUsData.description2}</p>
            <br />
          </div>
        )}

        <div className="abotUsProps ">
          {
            ourCompanyDataLoading ? <Skeleton count={3} /> : (
              <div className="w-full h-full bg-[#0e0d0d4e] py-10">
              <h2 className=" text-center text-4xl lg:text-5xl font-semibold py-8 mb-6 text-white">
                About Company
              </h2>
  
              <div className="grid grid-cols-1 lg:grid-cols-3 w-3/4 mx-auto gap-4 pb-9">
                <p
                  className="bg-[#83c3de25] px-6 py-3 rounded-lg text-blue-300  text-justify "
                  data-aos="fade-down"
                  data-aos-delay="0"
                >
                 {ourCompanyData.description}
                </p>
                <p
                  className="bg-[#83c3de25] px-6 py-3 rounded-lg text-blue-100  text-justify "
                  data-aos="fade-down"
                  data-aos-delay="500"
                >
                {ourCompanyData.description2}
                </p>
                <p
                  className="bg-[#83c3de25] px-6 py-3 rounded-lg text-blue-100  text-justify "
                  data-aos="fade-down"
                  data-aos-delay="1000"
                >
                 {ourCompanyData.description3}
                </p>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10 lg:px-36">
                <CounterItems
                  title={"Years of work experience"}
                  count={100}
                  percent={false}
                />
                <CounterItems
                  title={"Customer Satisfaction"}
                  count={94}
                  percent={true}
                />
                <CounterItems title={"Project Completed"} count={28} percent={false} />
                <CounterItems
                  title={"Staff Members"}
                  count={120}
                  percent={false}
                />
              </div>
            </div>
            )
          }
       
        </div>
      </div>
    </>
  );
}

export default AboutUs;
