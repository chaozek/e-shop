import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const products = await axios.get("http://localhost:5000/products");
      return products.data;
    } catch (error) {
      return error;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.status = "loading";
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = [...action.payload];
      state.status = "success";
    },
    [getProducts.rejected]: (state) => {
      state.status = "failed";
    },
  },
});
export const {} = productsSlice.actions;

export default productsSlice.reducer;
