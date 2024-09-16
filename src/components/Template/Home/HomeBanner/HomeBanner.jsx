import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeCategory } from "../../../../store/slices/product/productSlice";
function HomeBanner() {
  


  const dispatch = useDispatch();

  return (
    <>
      <div className="w-[100vw] h-[100vh] relative overflow-x-hidden ">
        <video
          loop
          autoPlay
          muted
          className="absolute w-full h-full left-0 top-0 object-cover overflow-x-hidden"
        >
          <source src="./home/bgVid2.mp4" type="video/mp4" />
        </video>
        <div className="bannerText text-white absolute right-8 lg:right-[17%] bottom-[10%] lg:bottom-[20%] w-[50%] lg:w-[30%] flex flex-col justify-center ">
          <h1 className="text-xl lg:text-3xl my-4">
            <Typewriter
              options={{
                loop: true,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    " Welcome to Mercurio Petrochemical Trading L.L.C "
                  )
                  .pauseFor(1000)
                  .start();
              }}
            />
          </h1>
        </div>
    
      </div>

     
    </>
  );
}

export default HomeBanner;
