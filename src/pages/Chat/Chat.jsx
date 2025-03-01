import { useInfiniteScrollTop } from "6pp";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, Skeleton, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import FileMenu from "../../components/Dialog/FileMenu";
import MessageComponent from "../../components/Dialog/MessageComponent";
import AppLayout from "../../components/Layouts/Applayouts";
import { InputBox } from "../../components/Styles/styledComponents";
import { grayColor, green } from "../../constants/color";
import { NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../../constants/event";
import { useError, useSocketEventHook } from "../../hooks/customHooks";
import { useChatDetailsQuery, useGetMessagesQuery } from "../../redux/api/api";
import { setIsFileMenu, setIsMenu } from "../../redux/slices/MiscSlice";
import { getSocket } from "../../socket";
import { ResetchatAlert, setmember } from "../../redux/slices/ChatSlice";
import { skipToken } from "@reduxjs/toolkit/query";

const Chat = ({ chatId, user }) => {
  const dispatch = useDispatch();

  // creating container Ref
  const containerref = useRef(null);
  const bottomRef = useRef(null);

  // creating all states
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [allMessages, setallMessages] = useState([]);
  const [page, setPages] = useState(1);
  const [anchorfile, setanchorfile] = useState(null);
  const [memberTyping, setMemberTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);

  // opening file menu
  const fileMenuopener = (e) => {
    dispatch(setIsFileMenu(true));
    setanchorfile(e.currentTarget);
  };

  // Auto scrolling Down
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  const socket = getSocket();

  // fetching chatDetails from server using chatId
  const {data:chatDetails,isLoading,isError,error} = 
  useChatDetailsQuery(chatId ? { chatId } : skipToken);
  // useChatDetailsQuery({chatId}, {skip: !chatId });
 


console.log(chatDetails?.chatDetails)
  // fetching messages chunk
  const oldMessageChunks = useGetMessagesQuery({ chatId, page });

  // setting up infinite scroll
  const { data, setData } = useInfiniteScrollTop(
    containerref,
    oldMessageChunks?.data?.totalpages,
    page,
    setPages,
    oldMessageChunks?.data?.messages
  );

  // handling all error
  useError([
    { isError: chatDetails?.isError, error: chatDetails?.error },
    {
      isError: oldMessageChunks?.isError,
      error: oldMessageChunks?.error,
    },
  ]);

  const members = chatDetails?.chatDetails?.members;

  const messageSendHandle = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const newMessageHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );
  const startTypingListen = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMemberTyping(true);
    },
    [chatId]
  );

  const stopTypingListen = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMemberTyping(false);
    },
    [chatId]
  );

  const EventsObject = {
    [NEW_MESSAGE]: newMessageHandler,
    [START_TYPING]: startTypingListen,
    [STOP_TYPING]: stopTypingListen,
  };
  useSocketEventHook(socket, EventsObject);

  useEffect(() => {
    setallMessages([...data, ...messages]);
  }, [data, messages]);

  useEffect(() => {
    dispatch(ResetchatAlert(chatId));

    return () => {
      dispatch(setIsMenu(false))
      setMessage("");
      setData([]);
      setallMessages([]);
      setPages(1);
      setMessages([]);
    };
  }, [chatId]);


  useEffect(()=>{
if(!isLoading){
  dispatch(setmember(chatDetails?.chatDetails?.user))
}
  },[chatId,chatDetails])
  // Chating status
  const Timerref = useRef(null);
  const messagehandler = (e) => {
    setMessage(e.target.value);

    if (!userTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setUserTyping(true);
    }
    if (Timerref.current) clearTimeout(Timerref.current);
    Timerref.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
    
      setUserTyping(false);
    }, 1000);
  };

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

        {allMessages &&
          allMessages.map((mes) => {
            return <MessageComponent message={mes} user={user} key={mes._id} />;
          })}

        {memberTyping && <Typography>Typing...</Typography>}

        {/* Auto Scrolling to bottom */}
        <div ref={bottomRef} />
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
            onChange={messagehandler}
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
