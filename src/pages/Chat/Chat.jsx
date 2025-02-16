import React, { useRef, useState, useCallback } from "react";
import AppLayout from "../../components/Layouts/Applayouts";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor, green } from "../../constants/color";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { InputBox } from "../../components/Styles/styledComponents";
import FileMenu from "../../components/Dialog/FileMenu";
import { sampleMessage } from "../../constants/sampledata";
import MessageComponent from "../../components/Dialog/MessageComponent";
import { getSocket } from "../../socket";
import { NEW_MESSAGE } from "../../constants/event";
import { useChatDetailsQuery } from "../../redux/api/api";
import { useError, useSocketEventHook } from "../../hooks/customHooks";

const Chat = ({ chatId, user }) => {
  const containerref = useRef(null);
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);
  const socket = getSocket();

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  useError([{ isError: chatDetails?.isError, error: chatDetails?.error }]);

  const members = chatDetails?.data?.chat?.members;

  const messageSendHandle = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });

    setMessage("");
  };

  const newMessageHandler = useCallback((data) => {
    // console.log(data);
    setMessages((prev) => [...prev, data.message]);
  }, []);
  const EventsObject = { [NEW_MESSAGE]: newMessageHandler };
  useSocketEventHook(socket, EventsObject);

  return chatDetails?.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        padding={"1rem"}
        ref={containerref}
        spacing={"1rem"}
        boxSizing={"border-box"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {/* Rendering all messages */}

        {messages &&
          messages.map((mes, i) => {
            return <MessageComponent message={mes} user={user} key={mes._id} />;
          })}
      </Stack>
      <form style={{ height: "10%" }} onSubmit={messageSendHandle}>
        <Stack
          flexDirection={"row"}
          height={"100%"}
          padding={"0.3rem"}
          position={"relative"}
          alignItems={"center"}
          spacing={"0.2rem"}
        >
          <IconButton
            sx={{ position: "absolute", rotate: "30deg", left: "1rem" }}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <IconButton
            type="submit"
            sx={{
              rotate: "-20deg",
              bgcolor: green,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu />
    </>
  );
};

export default AppLayout()(Chat);
