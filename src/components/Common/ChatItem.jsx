import React, { memo } from "react";
import { Link } from "../Styles/styledComponents";
import { Typography, Box } from "@mui/material";
import { Stack } from "@mui/material";
import AvatarCard from "./AvatarCard";
const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupchat = false,
  sameSender,
  isOnline,
  newMessageAlerts,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{ padding: "0" }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => {
        handleDeleteChat(e, _id, groupchat);
      }}
    >
      <div
        style={{
          height: "5rem",
          display: "flex",
          position: "relative",
          gap: "1.5rem",
          alignItems: "center",
          justifyItems: "center",
          color: sameSender ? "white" : "unset",
          backgroundColor: sameSender ? "green" : "unset",
        }}
      >
        <AvatarCard avatar={avatar} />
        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlerts && (
            <Typography variant="caption" color={"#e53935"}>
              {newMessageAlerts.count} New Message
            </Typography>
          )}
        </Stack>
        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "2rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </div>
    </Link>
  );
};

export default memo(ChatItem);
