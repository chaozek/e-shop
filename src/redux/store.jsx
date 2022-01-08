import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import productReducer from "./productSlice";
import productsReducer from "./productsSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
    orderPay: orderReducer,
  },
});
