import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  NotificationCount: 0,
  member: null,
  chatAlert: [],
  OnlineUser: [],
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
        state.chatAlert[index].count += 1;
      } else {
        state.chatAlert.push({
          chatId: action.payload.chatId,
          count: 1,
          sender: action.payload.sender,
        });
      }
    },

    setchatIntial: (state, action) => {
      state.chatAlert = action.payload;
    },

    ResetchatAlert: (state, action) => {
      state.chatAlert = state.chatAlert.filter(
        (item) => item.chatId !== action.payload
      );
    },
    setmember: (state, action) => {
      state.member = action.payload;
    },
    setOnlineUser: (state, action) => {
      state.OnlineUser = action.payload;
    },
  },
});

export const {
  setNotificationCount,
  NotificationCountIncrement,
  NotificationReset,
  setChatAlert,
  ResetchatAlert,
  setmember,
  setOnlineUser,
  setchatIntial,
} = ChatSlice.actions;
export default ChatSlice;
