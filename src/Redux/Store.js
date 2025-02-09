import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";

const Store = configureStore({
  reducer: {
    [AuthSlice.name]: AuthSlice.reducer,
  },
});

export default Store;
