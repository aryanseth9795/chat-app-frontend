import React from "react";
import { Stack } from "@mui/material";
import ChatItem from "../Common/ChatItem";
const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineusers = [],
  newMessageAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  index = 0,
  sameSender,
  handleDeleteChat,
}) => {
  return (
    <Stack width={w}>
      {chats.map((data, i) => {
        const { _id, avatar, name, groupchat, members, username } = data;
        const newMessageAlerts = newMessageAlert.find(
          ({ chatId }) => chatId === _id
        );


       
        const isOnline = members.some((memeber) =>
        
          onlineusers.includes(memeber)
        );
        return (
          <ChatItem
            index={index}
            newMessageAlerts={newMessageAlerts}
            isOnline={isOnline}
            key={_id}
            avatar={avatar}
            username={username}
            name={name}
            _id={_id}
            groupchat={groupchat}
            sameSender={sameSender}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
