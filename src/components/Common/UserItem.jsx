import { Add } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";

const UserItem = ({ user, userhandler, disablehandler }) => {
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={user.Avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: "1",
            display: "webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            width: "100%",
            textOverflow: "ellipsis",
          }}
        >
          {user.name}
        </Typography>
        <IconButton
          onClick={() => userhandler(user._id)}
          disabled={disablehandler}
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&hover": { bgcolor: "primary.dark" },
          }}
        >
          <Add />
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
