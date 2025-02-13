import { Add, Remove } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo, useState } from "react";
import { TransformImage } from "../../lib/feature";

const UserItem = ({
  user,
  userhandler,
  disablehandler = false,
  isAdded = false,
  styling,
}) => {
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={TransformImage(user.avatar)} />
        <Stack
          sx={{
            flexGrow: "1",
            display: "webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            width: "100%",
            textOverflow: "ellipsis",
          }}
          {...styling}
        >
          <Typography variant="body1" {...styling}>
            {user.name}
          </Typography>
          <Typography variant="caption" {...styling}>
            {user.username}
          </Typography>
        </Stack>
        <IconButton
          onClick={() => userhandler(user._id)}
          disabled={disablehandler}
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main",
            color: "white",
            "&hover": { bgcolor: isAdded ? "error" : "primary.dark" },
          }}
        >
          {isAdded ? <Remove /> : <Add />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
