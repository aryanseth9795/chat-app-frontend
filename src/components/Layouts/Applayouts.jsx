import React, { useCallback, useEffect, useState } from "react";
import Title from "../Common/Title";
import Header from "./Header";
import { Grid, Drawer, Skeleton } from "@mui/material";
import ChatList from "../Dialog/ChatList";

import Profile from "../Common/Profile.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setIsMenu } from "../../Redux/slices/MiscSlice.js";
import { useMychatListQuery } from "../../Redux/api/api.js";
import { useError, useSocketEventHook } from "../../hooks/customHooks.jsx";
import { getSocket } from "../../socket.jsx";
import { useParams } from "react-router-dom";
import {
  NEW_NOTIFICATION_ALERT,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
  ONLINE_USERS,
  REFETCH_ONLINE_USER,
} from "../../constants/event.js";
import {
  NotificationCountIncrement,
  setChatAlert,
  setOnlineUser,
} from "../../Redux/slices/ChatSlice.js";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const dispatch = useDispatch();
    const param = useParams();

    const chatId = param?.id;
    const { isMobile } = useSelector((state) => state.Misc);
    const { user } = useSelector((state) => state.Auth);
    const { chatAlert,OnlineUser } = useSelector((state) => state.Chat);

    const { data, error, isError, isLoading, refetch } = useMychatListQuery();

    const member = data?.chats?.flatMap((user) => user?.members);
   


    useEffect(() => {
      if (!isLoading) {
        socket.emit(ONLINE_USERS, { member });
        socket.emit(REFETCH_ONLINE_USER, { member });
      }
    }, [data]);

    useError([{ isError, error }]);

    const handleDeleteChat = (e) => {
      e.preventDeafult();
    };
    const drawerClose = () => {
      dispatch(setIsMenu(false));
    };

    const socket = getSocket();

    const newMessageAlert = useCallback(
      (data) => {
        if (chatId === data?.chatId) return;
        dispatch(setChatAlert(data));
      },
      [chatId]
    );
    const newnotificationAlert = useCallback(() => {
      dispatch(NotificationCountIncrement());
    }, []);

    const RefetechList = useCallback(() => {
      refetch();
    }, []);

    const OnlineUserList = useCallback(({ onlineMembersset}) => {
      dispatch(setOnlineUser(onlineMembersset))
      
    }, []);

    const RefectchOnlineUserList = useCallback(() => {
      socket.emit(REFETCH_ONLINE_USER)
    }, []);

    const socketEvents = {
      [NEW_MESSAGE_ALERT]: newMessageAlert,
      [NEW_NOTIFICATION_ALERT]: newnotificationAlert,
      [REFETCH_CHATS]: RefetechList,
      [ONLINE_USERS]: OnlineUserList,
      [REFETCH_ONLINE_USER]: RefectchOnlineUserList,
    };

    useSocketEventHook(socket, socketEvents);

    useEffect(() => {
      return () => {
        if (isMobile) drawerClose();
      };
    }, [param?.id]);

    return (
      <>
        <Title />
        <Header />
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            height={"100%"}
            sx={{
              display: { xs: "none", sm: "block" },
              overflow: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={param.id}
                onlineusers={OnlineUser}
                handleDeleteChat={handleDeleteChat}
                newMessageAlert={chatAlert}
              />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={6}
            height={{ xs: "92%", sm: "100%" }}
            sx={{ display: { xs: "block", sm: "block" }, overflow: "hidden" }}
          >
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>

          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
          >
            <Profile />
          </Grid>
        </Grid>

        <Drawer open={isMobile} onClose={drawerClose} w={"70vw"}>
          {isLoading ? (
            <Skeleton />
          ) : (
            <ChatList
              chats={data?.chats}
              chatId={param.id}
              onlineusers={OnlineUser}
              handleDeleteChat={handleDeleteChat}
              newMessageAlert={chatAlert}
            />
          )}
        </Drawer>
      </>
    );
  };
};

export default AppLayout;
