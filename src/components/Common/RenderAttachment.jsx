import React from "react";
import { TransformImage } from "../../lib/feature";
import { FileOpen } from "@mui/icons-material";

const RenderAttachment = ({ fileformat, url }) => {
  switch (fileformat) {
    case "video":
      return <video src={url} preload={"none"} controls width={"200px"} />;

    case "image":
      return (
        <img
          src={TransformImage(url,200)}
          height={"100px"}
          width={"150px"}
          style={{ objectFit: "contain" }}
        />
      );

    case "audio":
      return <audio src={url} preload={"none"} controls width={"200px"} />;

    default:
      return <FileOpen />;
  }
};

export default RenderAttachment;
