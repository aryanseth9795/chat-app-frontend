import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isMobile: false,
  isSearch:false,
  isNotification:false
};

const MiscSlice = createSlice({
  name: "Misc",
  initialState,
  reducers: {
    setIsMenu: (state, action) => {
      state.isMobile = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setIsNotification: (state, action) => {
      state.isNotification = action.payload;
    },
  },
});
export const { setIsMenu ,setIsSearch,setIsNotification} = MiscSlice.actions;
export default MiscSlice;
