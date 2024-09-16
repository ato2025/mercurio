import React from "react";
import Skeleton from "../../../modules/Skeleton/Skeleton";

function HomeOverWrite({ overviewDataLoading, overviewData }) {
  return (
    <>
      <section className="bg-slate-900 w-full ">
        <div
          className="grid grid-cols-1 md:grid-cols-2 mx-auto pt-32 w-3/4 lg:w-3/4  md:w-[90%]"
          data-aos="zoom-in"
        >
          {overviewDataLoading ? (
            <Skeleton count={2} />
          ) : (
            <>
              <div className="flex flex-col ">
                <h2 className="text-white text-4xl md:text-7xl my-5">Overview</h2>
                <p className="w-full md:w-3/4 text-white text-lg md:text-base mt-5">
                  {/* {overviewData.description} */}
                  Mercurio Petrochemical Trading L.L.C is your dedicated provider, specializing in Grease & Lubricants Trading, Chemicals Oilfield Trading, Product Oil Refined Offshore Trading, Products Oil Refined Trading, Petrochemicals Trading, and Tar & Asphalt Trading
                </p>
                <p className="w-full md:w-3/4 text-white text-lg md:text-base">
                We prioritize customer satisfaction through a deep understanding of unique client needs in the dynamic petrochemical industry. Our committed team ensures efficient service for a smooth experience, leveraging expertise in navigating the complexities of these sectors. Backed by a track record of successful transactions, we offer straightforward and results-driven collaboration
                </p>
              </div>

              <div className="!mx-auto w-[300px] h-[300x] md:w-[350px]  lg:w-[500px] md:h-[350px] lg:h-[500px] !overflow-hidden rounded-lg flex md:mt-[10vh] lg:mt-0 justify-center items-center">
                <img
                  src={`data:image/jpg;base64,${overviewData.imageBase64}`}
                  alt=""
                  className="rounded-lg my-7 md:my-0 hover:scale-125 t07 cp shadow-md shadow-slate-600"
                />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default HomeOverWrite;
