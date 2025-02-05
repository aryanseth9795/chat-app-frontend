import { Typography, Box } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/feature";
import RenderAttachment from "../Common/RenderAttachment";
const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const samesender = sender?._id === user?._id;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignSelf: samesender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        width: "fit-content",
        borderRadius: "3px",
        padding: "0.5rem",
      }}
    >
      <Typography
        variant="caption"
        color={lightBlue}
        fontWeight={"600"}
        alignSelf={samesender ? "flex-end" : "flex-start"}
      >
        {samesender ? "You" : sender.name}
      </Typography>

      {content && <Typography>{content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment, i) => {
          const url = attachment.url;
          const format = fileFormat(url);

          return (
            <Box>
              <a href="" target="_blank" download style={{ color: "black" }}>
                <RenderAttachment fileformat={format} url={url} />
     
              </a>
            </Box>
          );
        })}

      <Typography variant="caption"     alignSelf={"flex-end" }>
        {moment(createdAt).format("h:mm A")}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
