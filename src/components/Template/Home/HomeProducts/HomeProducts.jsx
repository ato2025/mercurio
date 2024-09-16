import React, { useEffect } from "react";
import SectionsTitle from "../../../modules/SectionsTitle/SectionsTitle";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeCategory } from "../../../../store/slices/product/productSlice";
import Skeleton from "../../../modules/Skeleton/Skeleton";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

function HomeProducts({ categories, categoriesDataLoading }) {
  const dispatch = useDispatch();
  return (
    <div className="w-full bg-slate-900 py-2 homeCategories">
      <SectionsTitle title={"Our Products"} />
      <div className="lg:px-20">

    
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper w-full h-[12rem] my-[10vh] lg:px-[10vw]"
        loop={true}
        slidesPerView={"auto"}
        spaceBetween={15}
      >
        {categoriesDataLoading ? (
          <Skeleton />
        ) : (
          categories.map((category) => (
            <SwiperSlide key={category.id} className="categorySwiperSlide mx-12 lg:mx-0 lg:px-10 rounded-lg">
              <Link
                className="w-full h-full bg-white !overflow-hidden relative homeCategrieBox rounded-lg mx-auto mt-5 2xl:mt-8 "
                data-aos={category.aos}
                to={"products"}
                onClick={() => {
                  dispatch(changeCategory(category.title));
                  window.scrollTo(0, 0);
                }}
              >
                <img
                  src={`data:image/jpg;base64,${category.imageBase64}`}
                  className="w-full h-full rounded-lg"
                  alt=""
                />
                <div className="absolute top-[85%] rounded-lg w-full h-full flex  justify-center items-start homeCategrieBoxTextsContainer t07">
                  <h2 className="text-white text-2xl mb-5 px-3">
                    {category.title}
                  </h2>
                </div>
              </Link>
            </SwiperSlide>
          ))
        )}
      </Swiper>
      </div>
      
    </div>
  );
}

export default HomeProducts;
