import React, { useEffect } from "react";
import HomeBanner from "../../components/Template/Home/HomeBanner/HomeBanner";
import HomeOverWrite from "../../components/Template/Home/HomeOverWrite/HomeOverWrite";
import HomeServices from "../../components/Template/Home/HomeServices/HomeServices";
import HomeProducts from "../../components/Template/Home/HomeProducts/HomeProducts";
import HomeNews from "../../components/Template/Home/HomeNews/HomeNews";
import HomeWhyUs from "../../components/Template/Home/HomeWhyUs/HomeWhyUs";
import { useDispatch, useSelector } from "react-redux";
import {
  getHomeCategoriesData,
  getHomeServiceData,
  getHomeWhyUsData,
  getOverviewData,
} from "../../store/slices/HomePage/HomePageExtraReducer";
import Skeleton from "./../../components/modules/Skeleton/Skeleton";

function Home() {
  const dispatch = useDispatch();
  const {
    categoriesDataLoading,
    categoriesData,
    whyUsDataLoading,
    whyUsData,
    overviewDataLoading,
    overviewData,
    homeServicesDataLoading,
    homeServicesData,
  } = useSelector((data) => data.HomePageSections);

  useEffect(() => {
    document.title = "Mercurio Petrochemical";

    dispatch(getHomeCategoriesData());
    dispatch(getHomeWhyUsData());
    dispatch(getOverviewData());
    dispatch(getHomeServiceData());
  }, []);

  return (
    <>
      <HomeBanner />
      <HomeOverWrite
        overviewDataLoading={overviewDataLoading}
        overviewData={overviewData}
      />
      <HomeProducts
        categories={categoriesData}
        categoriesDataLoading={categoriesDataLoading}
      />
      <HomeServices
        homeServicesDataLoading={homeServicesDataLoading}
        homeServicesData={homeServicesData}
        showBg={true}
        showTitle={true}
      />
      <HomeWhyUs whyUsData={whyUsData} whyUsDataLoading={whyUsDataLoading} />
      {/* <HomeNews/> */}
    </>
  );
}

export default Home;
