import React, { useRef } from "react";
import AppLayout from "../../components/Layouts/Applayouts";
import { IconButton, Stack } from "@mui/material";
import { grayColor, green } from "../../constants/color";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { InputBox } from "../../components/Styles/styledComponents";
import FileMenu from "../../components/Dialog/FileMenu";
import { sampleMessage } from "../../constants/sampledata";
import MessageComponent from "../../components/Dialog/MessageComponent";

const user= {
  avatar: "https://www.w3schools.com/howto/img_avatar.png",
  name: "John Doe",
  _id: "1",
}
const Chat = () => {
  const containerref = useRef(null);

  return (
    <>
      <Stack
        padding={"1rem"}
        ref={containerref}
        spacing={"1rem"}
        boxSizing={"border-box"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{ overflowX: "hidden", overflowY: "auto",  "&::-webkit-scrollbar": {
          display: "none", 
         }, }}
      >
        {/* Rendering all messages */}


        {sampleMessage.map((mes,i)=>{
          return <MessageComponent message={mes} user={user} key={mes._id}/>
        })}
      </Stack>
      <form style={{ height: "10%" }}>
        <Stack
          flexDirection={"row"}
          height={"100%"}
          padding={"0.3rem"}
          position={"relative"}
          alignItems={"center"}
          spacing={"0.2rem"}
        >
          <IconButton sx={{position:"absolute", rotate:"30deg",left:"1rem"}}>
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder="Type Message Here..." />

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

<FileMenu/>

    </>
  );
};

export default AppLayout()(Chat);
