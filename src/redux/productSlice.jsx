import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getproduct = createAsyncThunk("product/getproduct", async (id) => {
  try {
    const product = await axios.get(`http://localhost:5000/product/${id}`);
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
  reducers: {},
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
export const {} = productSlice.actions;

export default productSlice.reducer;
