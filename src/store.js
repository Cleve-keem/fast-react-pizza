import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/UseSlicer";
import cartReducer from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
