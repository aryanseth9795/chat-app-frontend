import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  NotificationCount: 0,
};
const ChatSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {
    setNotificationCount: (state, action) => {
      state.NotificationCount = action.payload;
    },

    NotificationCountIncrement: (state) => {
      state.NotificationCount += 1;
    },
    NotificationReset: (state) => {
      state.NotificationCount = 0;
    },
  },
});

export const {
  setNotificationCount,
  NotificationCountIncrement,
  NotificationReset,
} = ChatSlice.actions;
export default ChatSlice;
