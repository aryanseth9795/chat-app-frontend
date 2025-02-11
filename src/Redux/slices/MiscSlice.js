import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isMobile: false,
  isSearch:false
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
  },
});
export const { setIsMenu ,setIsSearch} = MiscSlice.actions;
export default MiscSlice;
