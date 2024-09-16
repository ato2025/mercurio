import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  changeCategory,
  clearSearchBoxResult,
} from "../../../store/slices/product/productSlice";
import SearchReasultItem from "../SearchReasultItem/SearchReasultItem";
import { searchProduct } from "../../../store/slices/product/productsExtraReducers";

function Navbar() {

  const {pathname}= useLocation()

  const menuItems = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "Products", path: "/products" },
    // { id: 3, title: "Projects", path: "/projects" },
    { id: 4, title: "Services", path: "/services" },
    { id: 5, title: "About Us", path: "/about-us" },
    { id: 6, title: "Contact Us", path: "/contact-us" },
  ];

  const { productSearchResult,productSearchResultLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showBars, setShowBars] = useState(true);
  const [pageOffset, setPageOffset] = useState();
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const navContainer = useRef();
  window.addEventListener("scroll", () => {
    setPageOffset(window.pageYOffset);
  });

  useEffect(() => {


    const data = {
      searchTerm: searchBoxValue,
    };

    searchBoxValue && dispatch(searchProduct(data));
    searchBoxValue.length == 0 && dispatch(clearSearchBoxResult());
  }, [searchBoxValue]);

  
  return (

  
    <>
     {
      pathname == '/login' ? (null) : (
        <div
        className="navbarWrapper w-full fixed top-0 left-0 z-[9999] "
        ref={navContainer}
        style={{ backgroundColor: `${pageOffset > 0 ? "#333" : ""}` }}
      >
        <div className=" w-full flex justify-between">
          <div className="logo flex justify-center items-center ">
            <Link to={"/"}>
              <img src="./logo.png" className="w-56" alt="" />
            </Link>
          </div>
          {showBars && (
            <div className="block lg:hidden text-white text-xl absolute top-6 right-6 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  setShowMenu(!showMenu);
                  setShowBars(false);
                }}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 hw-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
          )}

          {!showBars && (
            <div
              className={
                showMenu
                  ? "block lg:hidden text-white text-xl absolute top-6 right-6"
                  : "hidden lg:hidden text-white text-xl absolute top-6 right-6"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12"
                onClick={() => {
                  setShowMenu(!showMenu);
                  setShowBars(true);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}

          <div className="navbarItems hidden lg:flex justify-around items-center  w-[75%] ">
            {menuItems.map((item) => (
              <NavLink
                to={item.path}
                key={item.id}
                className={(itemm) =>
                  itemm.isActive
                    ? " block text-amber-700 !text-2xl font-semibold  text-center   py-3 cp"
                    : "text-lg block text-white  text-center text-xl  py-3 cp"
                }
                onClick={() => {
                  setShowMenu(false);
                  setShowBars(true);
                  window.scrollTo(0, 0);
                  if (item.path == "/products") {
                    dispatch(changeCategory("all"));
                  }
                }}
              >
                {item.title}
              </NavLink>
            ))}
            <div className="serachContainer relative">
              <input
                type="text"
                className="rounded-md w-full h-full px-3 py-1 bg-transparent outline-0 border-2 border-gray-500 text-white hover:bg-[#8080806d] focus:bg-[#8080806d] focus:border-sky-700"
                placeholder="Search ... "
                value={searchBoxValue}
                onChange={(e) => {
                  // !productSearchResultLoading && setSearchBoxValue(e.target.value);
                  setSearchBoxValue(e.target.value)
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setSearchBoxValue("");
                  }, 1000);
                }}
              />
              <button className="text-gray-600 absolute top-1 right-0 pr-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
              {productSearchResult.length > 0 && (
                <div className="searchBoxItems absolute w-full left-0 top-full h-[30vh] overflow-y-auto bg-[#fdfcfc46] rounded-lg">
                  {productSearchResult.map((item, index) => (
                    <SearchReasultItem key={index} {...item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={
            showMenu
              ? "block lg:hidden navbar-menu relative px-4 "
              : "hidden navbar-menu  relative"
          }
        >
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.id}
              className={(itemm) =>
                itemm.isActive
                  ? " mobileNavItem block text-amber-700 bg-slate-600 text-center text-xl border border-b border-gray-400 py-3 cp"
                  : " mobileNavItem block text-white bg-slate-600 text-center text-xl border border-b border-gray-400 py-3 cp"
              }
              onClick={() => {
                setShowMenu(false);
                setShowBars(true);
                window.scrollTo(0, 0);
              }}
            >
              {item.title}
            </NavLink>
          ))}
          <div className="serachContainer relative mt-1">
              <input
                type="text"
                className="rounded-md w-full h-full px-3 py-2 bg-[gray] outline-0 border-2 border-gray-500 text-white hover:bg-[#444] focus:bg-[#444] focus:border-sky-700"
                placeholder="Search ... "
                value={searchBoxValue}
                onChange={(e) => {
                  // !productSearchResultLoading && setSearchBoxValue(e.target.value);
                  setSearchBoxValue(e.target.value)
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setSearchBoxValue("");
                  }, 1000);
                }}
              />
              <button className="text-gray-600 absolute top-1 right-0 pr-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
              {productSearchResult.length > 0 && (
                <div className="searchBoxItems absolute w-full left-0 top-full h-[30vh] overflow-y-auto bg-[#333] rounded-lg" onClick={()=>{
                  setShowMenu(false);
                  setShowBars(true);
                  window.scrollTo(0, 0);
                }}>
                  {productSearchResult.map((item, index) => (
                    <SearchReasultItem  key={index} {...item} />
                  ))}
                </div>
              )}
            </div>
        </div>
      </div>
      )
    }
   
    </>
  );
}

export default Navbar;
