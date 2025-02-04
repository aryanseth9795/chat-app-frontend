import { Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constants/color";
import moment from "moment";
const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const samesender = sender?._id === user?._id;

  return (
    <div
      style={{
        alignSelf: samesender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        width: "fit-content",
        borderRadius: "3px",
        padding: "0.5rem",
      }}
    >
      {true && (
        <Typography variant="caption" color={lightBlue} fontWeight={"600"}>
          {sender.name}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}

      <Typography variant="caption">
        {moment(createdAt).format("h:mm A")}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
