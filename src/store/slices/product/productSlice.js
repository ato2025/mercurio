import { createSlice } from "@reduxjs/toolkit";
import {
  getProductById,
  getProductsData,
  searchProduct,
} from "./productsExtraReducers";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsDataLoading: false,
    productsData: [],
    productDataLoading: false,
    productData: [],
    categoryType: "all",
    productSearchResult: [],
    productSearchResultLoading: false,
  },
  reducers: {
    showModal: (state) => {
      state.productDataLoading = false;
    },
    hideModal: (state) => {
      state.productDataLoading = true;
    },
    changeCategory: (state, { payload }) => {
      state.categoryType = payload;
    },
    clearSearchBoxResult: (state) => {
      state.productSearchResult = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsData.pending, (state) => {
        state.productsDataLoading = true;
      })
      .addCase(getProductsData.fulfilled, (state, { payload }) => {
        state.productsDataLoading = false;
        state.productsData = payload;
      })
      .addCase(getProductsData.rejected, (state) => {
        state.productsDataLoading = false;
      })

      .addCase(getProductById.pending, (state) => {
        state.productDataLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, { payload }) => {
        state.productDataLoading = false;
        state.productData = payload;
      })
      .addCase(getProductById.rejected, (state) => {
        state.productDataLoading = false;
      })

      .addCase(searchProduct.pending, (state) => {
        state.productSearchResultLoading = true;
      })
      .addCase(searchProduct.fulfilled, (state, { payload }) => {
        state.productSearchResultLoading = false;
        state.productSearchResult = payload;
      })
      .addCase(searchProduct.rejected, (state) => {
        state.productSearchResultLoading = false;
        state.productSearchResult = [];
      });
  },
});
export const { hideModal, changeCategory,clearSearchBoxResult } = productsSlice.actions;
export default productsSlice.reducer;
