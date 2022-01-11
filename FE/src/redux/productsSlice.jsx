import { createAsyncThunk, createSlice, original } from "@reduxjs/toolkit";
import axios from "axios";
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const products = await axios.get("/api/products");
      return products.data;
    } catch (error) {
      return error;
    }
  }
);
export const editProductFun = createAsyncThunk(
  "products/editProductFun",
  async (newData, { rejectWithValue }) => {
    const userSignin = JSON.parse(localStorage.getItem("userInfo")).token;
    try {
      const fetchedProduct = await axios.put(`/api/products/edit`, newData, {
        headers: {
          authorization: `Bearer ${userSignin}`,
        },
      });
      return fetchedProduct.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const removeProductFromArray = createAsyncThunk(
  "products/removeProductFromArray",
  async (id, { rejectWithValue }) => {
    const userSignin = JSON.parse(localStorage.getItem("userInfo")).token;
    try {
      const clearedArr = await axios.post(
        `/api/products/delete`,
        { id: id },
        {
          headers: {
            authorization: `Bearer ${userSignin}`,
          },
        }
      );
      //  return clearedArr.data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: null,
    message: "",
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
    [editProductFun.pending]: (state) => {
      state.status = "loading";
    },
    [editProductFun.fulfilled]: (state, action) => {
      let oldArr = original(state.products);
      (state.products = oldArr.map((product) =>
        product._id === action.payload.product._id
          ? action.payload.product
          : product
      )),
        (state.message = action.payload.message);
      state.status = "success";
    },
    [editProductFun.rejected]: (state) => {
      state.status = "failed";
    },
    [removeProductFromArray.pending]: (state) => {
      state.status = "loading";
    },
    [removeProductFromArray.fulfilled]: (state, action) => {
      let oldArr = original(state.products);
      let newArr = (oldArr = oldArr.filter(
        (item) => action.meta.arg !== item._id
      ));
      state.products = newArr;
      state.status = "success";
    },
    [removeProductFromArray.rejected]: (state) => {
      state.status = "failed";
    },
  },
});
export const {} = productsSlice.actions;

export default productsSlice.reducer;
