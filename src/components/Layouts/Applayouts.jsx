import React, { useCallback } from "react";
import Title from "../Common/Title";
import Header from "./Header";
import { Grid, Drawer, Skeleton } from "@mui/material";
import ChatList from "../Dialog/ChatList";
import { sampledata } from "../../constants/sampledata.js";
import Profile from "../Common/Profile.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setIsMenu } from "../../redux/slices/MiscSlice.js";
import { useMychatListQuery } from "../../redux/api/api.js";
import { useError, useSocketEventHook } from "../../hooks/customHooks.jsx";
import { getSocket } from "../../socket.jsx";
import { useParams } from "react-router-dom";
import {
  NEW_NOTIFICATION_ALERT,
  NEW_MESSAGE_ALERT,
} from "../../constants/event.js";
import { NotificationCountIncrement } from "../../redux/slices/ChatSlice.js";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const dispatch = useDispatch();
    const param = useParams();
    // console.log(param,"params")
    const { isMobile } = useSelector((state) => state.Misc);
    const { user } = useSelector((state) => state.Auth);

    const { data, error, isError, isLoading } = useMychatListQuery();

    useError([{ isError, error }]);

    const handleDeleteChat = (e) => {
      e.preventDeafult();
    };
    const drawerClose = () => {
      dispatch(setIsMenu(false));
    };

    const socket = getSocket();
    const newMessageAlert = useCallback(() => {}, []);
    const newnotificationAlert = useCallback(() => {
      dispatch(NotificationCountIncrement());
    }, []);
    const socketEvents = [
      { [NEW_MESSAGE_ALERT]: newMessageAlert },
      { [NEW_NOTIFICATION_ALERT]: newnotificationAlert },
    ];
    useSocketEventHook(socket, socketEvents);

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
                chatId={"1"}
                onlineusers={["1", "2"]}
                handleDeleteChat={handleDeleteChat}
                newMessageAlert={[
                  {
                    chatId: "1",
                    count: 15,
                  },
                  {
                    chatId: "2",
                    count: 15,
                  },
                ]}
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
            <WrappedComponent {...props} chatId={param.id} user={user} />
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
              chatId={"1"}
              onlineusers={["1", "2"]}
              handleDeleteChat={handleDeleteChat}
              newMessageAlert={[
                {
                  chatId: "1",
                  count: 15,
                },
                {
                  chatId: "2",
                  count: 15,
                },
              ]}
            />
          )}
        </Drawer>
      </>
    );
  };
};

export default AppLayout;
