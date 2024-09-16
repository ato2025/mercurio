import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/modules/navbar/Navbar";
import { useRoutes } from "react-router-dom";
import { publicRouter, privateRouter } from "./router/router";
import "aos/dist/aos.css";
import Footer from "./components/modules/Footer/Footer";
import { Suspense, useEffect, useState } from "react";
import PageLoader from "./components/modules/PageLoader/PageLoader";
import AOS from "aos";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearchBoxResult,
  hideModal,
} from "./store/slices/product/productSlice";

import AdminSideBar from "./components/Template/Admin/AdminSideBar";
import AdminHeader from "./components/modules/AdminHeader/AdminHeader";

function App() {

  const isAuthenticated = Boolean(localStorage.getItem('userKey'));

  useEffect(() => {
    const handleWindowClick = (e) => {
      if (e.target.dataset.id !== "searchBar") {
        dispatch(clearSearchBoxResult());
      }
    };
    const handleWindowScroll = () => {
      setPageOffset(window.pageYOffset);
    };

    window.addEventListener("click", handleWindowClick);
    window.addEventListener("scroll", handleWindowScroll);
    AOS.init();
    dispatch(hideModal());

    return () => {
      window.removeEventListener("click", handleWindowClick);
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  const publicRoutes = useRoutes(publicRouter);
  const privateRoutes = useRoutes(privateRouter);
  const [pageOffset, setPageOffset] = useState();
  const dispatch = useDispatch();
  const { productData, productDataLoading } = useSelector(
    (state) => state.products
  );

  const closeModalHandler = (e) => {
    e.target.dataset.name && dispatch(hideModal());
  };

  return (
    <>
      {isAuthenticated ? (
        <>
        <div className="bg-slate-900">
        <AdminHeader/>
          <div className="relative  h-[100vh] w-[100vw] grid grid-cols-12">
            <div className="col-span-2">
              <AdminSideBar />
            </div>
            <div className="col-span-10 lg:ps-10  mx-auto-auto overflow-y-auto">
              {privateRoutes}
            </div>
          </div>
          </div>
        </>
      ) : (
        <section className="relative">
          <Navbar />
          <Suspense fallback={<PageLoader />}>{publicRoutes}</Suspense>
          <Footer />
          {pageOffset && (
            <div
              className="directUpContainer bg-sky-400 fixed bottom-4 right-4 px-2 py-2 rounded-full z-[99999] cp"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 directUpIcon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            </div>
          )}

          {!productDataLoading && (
            <div
              className="Modal fixed h-[100vh] w-full left-0 top-0 bg-[#302f2fd3] flex justify-center items-center z-[9999]"
              onClick={closeModalHandler}
              data-name="modalContainer"
            >
              <div className=" w-4/5 lg:w-5/12 lg:h-[35%]   bg-slate-800  rounded-lg grid grid-cols-1 lg:grid-cols-2 overflow-hidden relative">
                <div className="modalImgContainer h-[250px] lg:h-full overflow-hidden">
                  <img
                    src={`data:image/jpg;base64,${productData.imageBase64}`}
                    className="w-full h-full lg:h-full"
                    alt=""
                  />
                </div>
                <div className="modalTextContainer h-[20vh] lg:h-auto  overflow-y-scroll">
                  <h1 className="text-4xl ms-5 mt-5 font-semibold text-gray-100">
                    {productData.title}
                  </h1>
                  <p className="px-4 my-5 text-gray-100 ">
                    {productData.description}
                  </p>
                </div>

                <div
                  className="closeModal absolute top-2 lg:right-4 right-2 bg-[#80808061] rounded-lg cp"
                  onClick={() => {
                    dispatch(hideModal());
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-white  lg:w-10 lg:h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default App;
