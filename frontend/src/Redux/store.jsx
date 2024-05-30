
import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../Redux/registerSlice.jxs"

const store = configureStore({
  reducer: {
    register: registerReducer,
  },
});

export default store;
