import React from "react";
import Title from "../Common/Title";
import Header from "./Header";
import { Grid ,Drawer} from "@mui/material";
import ChatList from "../Dialog/ChatList";
import { sampledata } from "../../constants/sampledata.js";
import Profile from "../Common/Profile.jsx";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const handleDeleteChat = (e) => {
      e.preventDeafult();
    };
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
            sx={{ display: { xs: "none", sm: "block"}, overflow:"auto",  
              "&::-webkit-scrollbar": {
                display: "none", 
               },
         
          }}
          >
            <ChatList
              chats={sampledata}
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
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={{xs:"92%",sm :"100%"

          }}  sx={{ display: { xs: "block", sm: "block" } ,overflow:"hidden"}}>
            <WrappedComponent {...props} />
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

        <Drawer open={false} width={"70VW"} onclose={true}>

        <ChatList
              chats={sampledata}
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


        </Drawer>
      </>
    );
  };
};

export default AppLayout;
