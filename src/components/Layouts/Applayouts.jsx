import React from "react";
import Title from "../Common/title";
import Header from "./Header";
import { Grid } from "@mui/material";
import ChatList from "../Dialog/chatList";
const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Title />
        <Header />
        <Grid container height={"calc(100vh-4rem)"}>
          <Grid item xs={4} height={"100%"}>
            <ChatList />
          </Grid>
          <Grid item xs={4} height={"100%"}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid item xs={4} height={"100%"}>
            3
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
