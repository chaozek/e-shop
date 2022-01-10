import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";
export const createProduct = createAsyncThunk(
  "newProduct/createProduct",
  async (id) => {
    const userSignin = JSON.parse(localStorage.getItem("userInfo")).token;

    try {
      const product = await axios.post(
        `http://localhost:5000/products/create`,
        {},
        {
          headers: {
            authorization: `Bearer ${userSignin}`,
          },
        }
      );
      return product.data;
    } catch (error) {
      return error;
    }
  }
);

const newProductSlice = createSlice({
  name: "newProduct",
  initialState: {
    product: {},
    status: null,
    error: null,
  },
  reducers: {
    araseNewArray: (state, action) => {
      state.status = "";
    },
  },
  extraReducers: {
    [createProduct.pending]: (state) => {
      state.status = "loading";
    },
    [createProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.status = "success";
    },
    [createProduct.rejected]: (state) => {
      state.status = "failed";
    },
  },
});
export const { araseNewArray } = newProductSlice.actions;

export default newProductSlice.reducer;
