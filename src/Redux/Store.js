import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import MiscSlice from "./slices/MiscSlice";
import Chat from "../pages/Chat/Chat";
import { apiSlice } from "./api/api";

const Store = configureStore({
  reducer: {
    [AuthSlice.name]: AuthSlice.reducer,
    [MiscSlice.name]: MiscSlice.reducer,
    [Chat.name]: Chat.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (mid) => [...mid(), apiSlice.middleware],
  devTools: true,
});

export default Store;
