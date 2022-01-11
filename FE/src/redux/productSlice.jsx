import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";
export const getproduct = createAsyncThunk("product/getproduct", async (id) => {
  try {
    const product = await axios.get(`/api/products/${id}`);
    return product.data;
  } catch (error) {
    return error;
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
    status: null,
    error: null,
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers: {
    [getproduct.pending]: (state) => {
      state.status = "loading";
    },
    [getproduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.status = "success";
    },
    [getproduct.rejected]: (state) => {
      state.status = "failed";
    },
  },
});
export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
