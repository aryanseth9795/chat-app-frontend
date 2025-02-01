import {
  Dialog,
  DialogTitle,
  Typography,
  Stack,
  ListItem,
  Avatar,
  Button
} from "@mui/material";
import React, { memo, useState } from "react";
import { sampleNotifications } from "../../constants/sampledata";

const NotificationDialog = () => {
  const friendRequestHandler = () => {};
  const [NotificationList, setnotify] = useState(sampleNotifications);

  return (
    <Dialog open>
      <Stack p={{ x: "1rem", sm: "2rem" }} maxwidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {NotificationList.length > 0 ? (
          <>
            {NotificationList.map((i) => (
              <NotificationItem
                notification={i}
                key={i._id}
                handler={friendRequestHandler}
              />
            ))}
          </>
        ) : (
          <>
            <Typography textAlign={"center"} variant="body1" color={"green"}>
              No Notification
            </Typography>
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ notification, handler }) => {
  const { sender, _id } = notification;

  return (
    <>
      <ListItem>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={"1rem"}
          width={"100%"}
        >
          <Avatar src={sender.avatar} />
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
            {`${sender.name} sent you a friend request`}
          </Typography>
          <Stack>
            <Button onClick={()=>handler({_id,accept:true})}>Accept</Button>
            <Button color={"error"} onClick={()=>handler({_id,accept:false})}> Reject</Button>
          </Stack>
        </Stack>
      </ListItem>
    </>
  );
});

export default NotificationDialog ;
