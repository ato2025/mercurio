import React from "react";
import { useDispatch } from "react-redux";
import { getProductById } from "../../../store/slices/product/productsExtraReducers";
import { Navigate, useNavigate } from "react-router-dom";

function SearchReasultItem({ id, title, thumbnail }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div
        data-id="searchBar"
        className=" grid grid-cols-6 border-b px-4 py-2 border-gray-700 cp hover:bg-gray-500 text-white"
        onClick={() => {
          const data = {
            id,
          };
          navigate("/products");
          dispatch(getProductById(data));
        }}
      >
        {/* <div className="flex justify-start items-center ps-4" >{title}</div> */}
        <div className="col-span-2 overflow-hidden h-full">
          <img
            src={`data:image/jpg;base64,${thumbnail}`}
            className="w-full h-full"
            alt=""
          />
        </div>
        <div className="col-span-4 flex justify-start ms-3 items-center text-base">
          {title}
        </div>
      </div>
    </>
  );
}

export default SearchReasultItem;
