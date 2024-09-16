import { createSlice } from '@reduxjs/toolkit'
import { getCategoriesData, getSingleCategoryData } from './categoryExtraReducer'


const categorySlice = createSlice({
  name: 'category',
  initialState:{
   categoriesDataLoading:false,
   categoriesData:[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesData.pending, (state) => {

        state.categoriesDataLoading = true
      })
      .addCase(
         getCategoriesData.fulfilled,(state, {payload}) => {
        
          state.categoriesDataLoading = false
          state.categoriesData = payload
        },
      )
      .addCase(getCategoriesData.rejected, (state) => {
        state.categoriesDataLoading = false
      })

  },
})

export default categorySlice.reducer