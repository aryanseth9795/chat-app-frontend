import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  NotificationCount: 0,

  chatAlert: [],
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
    setChatAlert: (state, action) => {
      const index = state.chatAlert.findIndex(
        (obj) => obj.chatId === action.payload.chatId
      );

      if (index !== -1) {
        state.chatAlert[index].alertCount += 1;
      } else {
        state.chatAlert.push({ chatId: action.payload.chatId, alertCount: 1 });
      }
    },
    ResetchatAlert: (state, action) => {
      state.chatAlert = state.chatAlert.filter(
        (item) => item.chatId !== action.payload
      );
    },
  },
});

export const {
  setNotificationCount,
  NotificationCountIncrement,
  NotificationReset,
  setChatAlert,
  ResetchatAlert,
} = ChatSlice.actions;
export default ChatSlice;
