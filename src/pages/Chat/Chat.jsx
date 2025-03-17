import { useInfiniteScrollTop } from "6pp";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, Skeleton, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileMenu from "../../components/Dialog/FileMenu";
import MessageComponent from "../../components/Dialog/MessageComponent";
import AppLayout from "../../components/Layouts/Applayouts";
import { InputBox } from "../../components/Styles/styledComponents";
import { grayColor, green } from "../../constants/color";
import {
  NEW_MESSAGE,
  REFETCH_CHATS,
  START_TYPING,
  STOP_TYPING,
  SEEN_MESSAGE,
  UPDATE_SEEN_MESSAGE,
  MARK_ALL_READ_MESSAGE,
  REFETCH_MESSAGE,
} from "../../constants/event";

import { useError, useSocketEventHook } from "../../hooks/customHooks";
import { useChatDetailsQuery, useGetMessagesQuery } from "../../Redux/api/api";
import { setIsFileMenu, setIsMenu } from "../../Redux/slices/MiscSlice";
import { getSocket } from "../../socket";
import {
  ResetchatAlert,
  setchatIntial,
  setmember,
} from "../../Redux/slices/ChatSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";

const Chat = ({ chatId, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { OnlineUser, chatAlert } = useSelector((state) => state.Chat);
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

  useEffect(() => {
    const isPresent = chatAlert.find((item) => item.chatId === chatId);

    if (isPresent?.count) {
     
      socket.emit(MARK_ALL_READ_MESSAGE, {
        chatId,
        receiver: user._id,
        sender: isPresent?.sender,
      });
      const newList = chatAlert.filter((item) => item.chatid !== chatId);
      dispatch(setchatIntial(newList));
    }
  }, [chatId]);

  // fetching chatDetails from server using chatId
  const {
    data: chatDetails,
    isLoading,
    isError: chatDetailsisError,
    error: chatDetailserror,
    refetch,
  } = useChatDetailsQuery(chatId ? { chatId } : skipToken);

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
    { isError: chatDetailsisError, error: chatDetailserror },
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
      console.log("same chat", data.chatId === chatId);
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);

      // recieving user
      if (data?.message?.sender?._id.toString() !== user?._id.toString()) {
        socket.emit(SEEN_MESSAGE, {
          chatId: data.chatId,
          messageId: data.message?._id,
          sender: data?.message?.sender?._id,
        });
      }
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

  //  avoid unnessary render loging

  const stopTypingListen = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMemberTyping(false);
    },
    [chatId]
  );
  const refetchChatDetails = useCallback(() => {
    oldMessageChunks?.refetch();
    navigate("/");
  }, []);
  const updateMessageSeen = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setMessages((prev_mess) =>
      prev_mess?.map((message) =>
        message?._id === data.messageId
          ? { ...message, status: "Seen" }
          : message
      )
    );
  }, []);

  const refetchMessage = useCallback(({ refetchId }) => {
    if (chatId === refetchId) {
      oldMessageChunks.refetch();
      setMessages([]);
      setData(oldMessageChunks?.data?.messages || []);
    }
  }, []);

  const EventsObject = {
    [NEW_MESSAGE]: newMessageHandler,
    [START_TYPING]: startTypingListen,
    [STOP_TYPING]: stopTypingListen,
    [REFETCH_CHATS]: refetchChatDetails,
    [UPDATE_SEEN_MESSAGE]: updateMessageSeen,
    [REFETCH_MESSAGE]: refetchMessage,
  };

  useSocketEventHook(socket, EventsObject);

  useEffect(() => {
    setallMessages([...data, ...messages]);
  }, [data, messages]);

  useEffect(() => {
    dispatch(ResetchatAlert(chatId));

    return () => {
      dispatch(setIsMenu(false));
      setMessage("");
      setData([]);
      setallMessages([]);
      setPages(1);
      setMessages([]);
    };
  }, [chatId]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setmember(chatDetails?.chatDetails));
    }
  }, [chatId, chatDetails]);

  useEffect(() => {
    refetch();
  }, [OnlineUser]);

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

        {memberTyping && <Typography variant="body">Typing...</Typography>}

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
