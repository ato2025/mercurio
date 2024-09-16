import { createSlice } from "@reduxjs/toolkit";
import {
  getHomeCategoriesData,
  getHomeServiceData,
  getHomeWhyUsData,
  getOverviewData,
} from "./HomePageExtraReducer";

const HomePageSlice = createSlice({
  name: "HomePage",
  initialState: {
    categoriesDataLoading: false,
    categoriesData: [],
    whyUsDataLoading: false,
    whyUsData: [],
    overviewDataLoading: false,
    overviewData: [],
    homeServicesDataLoading: false,
    homeServicesData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomeCategoriesData.pending, (state) => {
        state.categoriesDataLoading = true;
      })
      .addCase(getHomeCategoriesData.fulfilled, (state, { payload }) => {
        state.categoriesDataLoading = false;
        state.categoriesData = payload;
      })
      .addCase(getHomeCategoriesData.rejected, (state) => {
        state.categoriesDataLoading = false;
      })

      .addCase(getHomeWhyUsData.pending, (state) => {
        state.whyUsDataLoading = true;
      })
      .addCase(getHomeWhyUsData.fulfilled, (state, { payload }) => {
        state.whyUsDataLoading = false;
        state.whyUsData = payload.reverse();
      })
      .addCase(getHomeWhyUsData.rejected, (state) => {
        state.whyUsDataLoading = false;
      })

      .addCase(getOverviewData.pending, (state) => {
        state.overviewDataLoading = true;
      })
      .addCase(getOverviewData.fulfilled, (state, { payload }) => {
        state.overviewDataLoading = false;
        state.overviewData = payload;
      })
      .addCase(getOverviewData.rejected, (state) => {
        state.overviewDataLoading = false;
      })

      .addCase(getHomeServiceData.pending, (state) => {
        state.homeServicesDataLoading = true;
      })
      .addCase(getHomeServiceData.fulfilled, (state, { payload }) => {
        state.homeServicesDataLoading = false;
        state.homeServicesData = payload;
      })
      .addCase(getHomeServiceData.rejected, (state) => {
        state.homeServicesDataLoading = false;
      });
  },
});

export default HomePageSlice.reducer;
