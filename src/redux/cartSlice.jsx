import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { original } from "immer";
import { useDispatch } from "react-redux";
import axios from "axios";

const cartSlice = createSlice({
  name: "cartItems",
  initialState: {
    cartItems:
      localStorage.getItem("cartItems") !== null
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    shippingAddress:
      localStorage.getItem("shippingAddress") !== null
        ? JSON.parse(localStorage.getItem("shippingAddress"))
        : {},
    paymentMethod: "paypal",
    status: null,
    error: null,
  },

  reducers: {
    addProductToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (x) => x.name === action.payload.name
      );
      if (existingItem) {
        state.cartItems = original(state.cartItems).map((item) =>
          item.name === original(existingItem).name ? action.payload : item
        );
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeProductFromCart: (state, action) => {
      let oldArr = original(state.cartItems);
      let newArr = (oldArr = oldArr.filter((item) => action.payload !== item));
      state.cartItems = newArr;
      localStorage.setItem("cartItems", JSON.stringify(newArr));
    },
    removeAllProducts: (state, action) => {
      localStorage.removeItem("cartItems");
      state.cartItems = [];
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    addShippingAddress: (state, action) => {
      console.log(action.payload, "FFF");
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
  },

  extraReducers: {},
});
export const {
  addProductToCart,
  removeProductFromCart,
  removeAllProducts,
  addShippingAddress,
  setPaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
