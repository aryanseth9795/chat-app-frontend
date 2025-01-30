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
          <Grid item sm={4} md={3} height={"100%"} sx={{display:{xs:"none",sm:"block"}}}>
            <ChatList />
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid item  md={5} lg={6} height={"100%"} sx={{display:{xs:"none",md:"block"},padding:"2rem",
        bgcolor:"black"}}>
            3
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
