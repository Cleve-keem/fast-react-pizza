import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/UseSlicer";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
