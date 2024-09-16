import React from "react";
import EyeIcon from "../../../icons/EyeIcon";
import "./ProductsCart.css";
function ProductsCard({ showProductDetailHandler, id, title, imageBase64 }) {
  return (
    <>
     
          <div className="!mx-auto bg-[#a3a2a272] w-72 md:w-80 lg:w-60 xl:w-56 2xl:w-72  h-60 rounded-xl hover:rounded-b-none productCart overflow-hidden  hover:overflow-visible t07   cp shadow-md shadow-slate-600 flex justify-center items-center flex-col  hover:-translate-y-5 my-5">
            <div className="w-full h-4/5 p-1 productCart-img-container rounded-xl !overflow-hidden">
              <img
                src={`data:image/jpg;base64,${imageBase64}`}
                className="w-full h-full object-cover rounded-lg productCart-img t07"
                alt=""
              />
            </div>
            <div className="w-full h-1/5 relative productCart-title ">
              <div className="text-white text-2xl  text-center capitalize truncate px-4 py-2">
                {title}
              </div>
              <div className="absolute w-full bg-[#fdfbfb9a] z-10 h-[3.5rem] top-[85%] rounded-b-xl left-0  flex justify-center items-center productCart-btnContainer t07">
                <button
                  className="bg-black hover:bg-blue-950 t07 rounded-lg text-white text-lg px-2 py-1 flex gap-1 justify-center items-center"
                  onClick={() => {
                    showProductDetailHandler(id);
                  }}
                >
                  <div className="mb-1">More</div>
                  <EyeIcon />
                </button>
              </div>
            </div>
     

        {/* {!productsDataLoading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 px-4">
      {productsData.map((product, index) => (
        <div
          key={index}
          className="w-60 h-64 lg:w-56 md:w-72  lg:h-56  my-10 pb-4 overflow-hidden mx-auto rounded-lg  relative cp"
          onClick={() => {
            showProductDetailHandler(product.id);
          }}
        >
          <img
            // src={product.img}
            src={`data:image/jpg;base64,${product.imageBase64}`}
            className="w-full h-full absolute top-0 left-0"
            alt=""
          />
          <div className="text-white w-full left-0 py-2 mt-2 px-3 z-10 absolute productBoxText  bottom-0 capitalize">
            {product.title}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Skeleton count={3} />
  )} */}
      </div>
      {/* <div
      className="w-60 h-64 lg:w-56 md:w-72 lg:h-56 my-10 pb-4 overflow-hidden mx-auto rounded-lg relative cp"
      onClick={() => {
        showProductDetailHandler(id);
      }}
    >
      <img
        src={`data:image/jpg;base64,${imageBase64}`}
        className="w-full h-full absolute top-0 left-0"
        alt=""
      />
      <div className="text-white w-full left-0 py-2 mt-2 px-3 z-10 absolute productBoxText bottom-0 capitalize">
        {title}
      </div>
    </div> */}
    </>
  );
}

export default ProductsCard;
