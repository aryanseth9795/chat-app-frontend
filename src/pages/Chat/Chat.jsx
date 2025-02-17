import React, { useRef, useState, useCallback, useEffect } from "react";
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
import { useChatDetailsQuery, useGetMessagesQuery } from "../../redux/api/api";
import { useError, useSocketEventHook } from "../../hooks/customHooks";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../../redux/slices/MiscSlice";

const Chat = ({ chatId, user }) => {
  const containerref = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [allMessages, setallMessages] = useState([]);
  const [page, setPages] = useState(2);
  const [anchorfile, setanchorfile] = useState(null);

  const dispatch = useDispatch();
  // opening file menu
  const fileMenuopener = (e) => {
    dispatch(setIsFileMenu(true));
    setanchorfile(e.currentTarget);
  };

  const socket = getSocket();

  // fetching chatDetails from server using chatId
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  // fetching messages chunk

  const oldMessageChunks = useGetMessagesQuery({ chatId, page });

  const { data, setData } = useInfiniteScrollTop(
    containerref,
    oldMessageChunks?.data?.totalpages,
    page,
    setPages,
    oldMessageChunks?.data?.messages
  );
  // console.log(data);

  // handling all error
  useError([
    { isError: chatDetails?.isError, error: chatDetails?.error },
    {
      isError: oldMessageChunks?.isError,
      error: oldMessageChunks?.error,
    },
  ]);

  const members = chatDetails?.data?.chat?.members;

  const messageSendHandle = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });

    setMessage("");
  };

  const newMessageHandler = useCallback((data) => {
    setMessages((prev) => [...prev, data.message]);
  }, []);
  const EventsObject = { [NEW_MESSAGE]: newMessageHandler };
  useSocketEventHook(socket, EventsObject);

  useEffect(() => {
    console.log("chunks", oldMessageChunks?.data?.messages);
    console.log("data", data);
    console.log("messages", messages);

    setallMessages([...data, ...messages]);
    console.log("All messages", allMessages);

    return () => {
      console.log("unmounting");

      setallMessages([]);
    };
  }, [data, messages]);

  useEffect(() => {
    return () => {
      console.log("unmounting");
      setMessage([]);
      setData([]);
      setallMessages([]);
      setPages(1);
      setMessage("");
    };
  }, [chatId]);
  // console.log(allMessages);

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
        {/* rendering new messages */}

        {allMessages &&
          allMessages.map((mes, i) => {
            return <MessageComponent message={mes} user={user} key={mes._id} />;
          })}
        {/* Rendering all messages */}

        {/* {messages &&
          messages.map((mes, i) => {
            return <MessageComponent message={mes} user={user} key={mes._id} />;
          })} */}
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
            onClick={fileMenuopener}
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

      <FileMenu anchorE1={anchorfile} chatId={chatId} />
    </>
  );
};

export default AppLayout()(Chat);
