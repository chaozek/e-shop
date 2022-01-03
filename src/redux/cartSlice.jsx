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
  },
  extraReducers: {},
});
export const { addProductToCart } = cartSlice.actions;

export default cartSlice.reducer;
