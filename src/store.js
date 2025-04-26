import { useReducer } from "react";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
