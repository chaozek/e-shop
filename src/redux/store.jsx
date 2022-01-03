import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import productsReducer from "./productsSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
