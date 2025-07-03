// redux/product/productSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProductsThunk, fetchDetailProductThunk } from "./productThunk";

const productSlice = createSlice({
  name: "product",
  initialState: {
    allProducts: [],
    detailProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProductDetail: (state) => {
      state.detailProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Tất cả sản phẩm
      .addCase(fetchAllProductsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(fetchAllProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Chi tiết sản phẩm
      .addCase(fetchDetailProductThunk.pending, (state) => {
        state.loading = true;
        state.detailProduct = null;
      })
      .addCase(fetchDetailProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.detailProduct = action.payload;
      })
      .addCase(fetchDetailProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductDetail } = productSlice.actions;
export default productSlice.reducer;
