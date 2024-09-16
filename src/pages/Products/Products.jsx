import React, { useEffect, useRef, useState } from "react";
import PageBgLayout from "../../components/modules/PageBgLayout/PageBgLayout";
import Skeleton from "./../../components/modules/Skeleton/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesData } from "../../store/slices/Category/categoryExtraReducer";
import {
  getProductById,
  getProductsData,
} from "../../store/slices/product/productsExtraReducers";
import PageLoader from "../../components/modules/PageLoader/PageLoader";
import { changeCategory, hideModal } from "../../store/slices/product/productSlice";
import ProductsCard from "../../components/Template/Products/ProductsCart/ProductsCart";





function Products() {
  const { categoriesData, categoriesDataLoading } = useSelector(
    (state) => state.category
  );
  const { productsData, productsDataLoading ,categoryType } = useSelector(
    (state) => state.products
  );
  const [selectedOption, setSelectedOption] = useState(categoryType);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesData());
    const data = {
      category: selectedOption,
    };
    dispatch(getProductsData(data));
  }, [selectedOption]);


  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
    dispatch(changeCategory(option))
  };
  const showProductDetailHandler = (id) => {
    const data = {
      id,
    };
    dispatch(getProductById(data));
  };

  return (
    <>
      {/* <PageLoader /> */}
      <PageBgLayout
        title={"Products"}
        height={"h-[50vh]"}
        img={"./banner1.jpg"}
        DesktopImg={'./banner11.jpg'}
      />
      <div className="bg-slate-900 py-10 h-auto grid grid-cols-1 lg:grid-cols-4">
        {!categoriesDataLoading ? (
          <div className="w-3/4 md:w-5/6 mx-auto lg:col-span-1 bg-[#d3d4d834] mt-10  rounded-lg pt-5 h-fit">
            <form>
              {categoriesData.map((category, index) => (
                <div key={index}>
                  <label className="flex gap-2 px-5 text-white text-lg font-semibold capitalize cp">
                    <input
                      type="checkbox"
                      name={category.title}
                      checked={selectedOption.toLowerCase() === category.title.toLowerCase()}
                      onChange={() => handleCheckboxChange(category.title)}
                      className="cp"
                    />
                    {category.title}
                  </label>
                  <br />
                </div>
              ))}
            </form>
          </div>
        ) : (
          <Skeleton count={1} />
        )}

        <div className="lg:col-span-3  lg:h-[90vh] lg:overflow-y-scroll mt-5">
          {!productsDataLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 px-4">
              {productsData.map((product, index) => (              
               <ProductsCard {...product} key={index} showProductDetailHandler={showProductDetailHandler} />
              ))}
            </div>
          ) : (
            <Skeleton count={3} />
          )}
        </div>
      </div>

    </>
  );
}

export default Products;
