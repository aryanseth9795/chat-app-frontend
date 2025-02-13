import {
  Dialog,
  DialogTitle,
  Typography,
  Stack,
  ListItem,
  Avatar,
  Button,
  Skeleton,
} from "@mui/material";
import React, { memo, useState } from "react";

import {
  useFriendRequestAcceptorMutation,
  useGetNotificationQuery,
} from "../../redux/api/api";
import { useError } from "../../hooks/customHooks";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/slices/MiscSlice";
import toast from "react-hot-toast";

const NotificationDialog = () => {
  const dispatch = useDispatch();
  const { isNotification } = useSelector((state) => state.Misc);
  const [acceptRequest] = useFriendRequestAcceptorMutation();
  const friendRequestHandler = async ({ _id, accept }) => {
  
    try {
      const res = await acceptRequest({ requestId: _id, accept });
      console.log(res);
      if (res?.data?.success) {
        // socket used
        toast.success(res?.data?.message);
        
        dispatch(setIsNotification(false));
      } else {
        toast.error(res?.data?.error);
        dispatch(setIsNotification(false));
      }
    } catch (error) {}
    // toast.error(res?.data?.message);
  };

  const NotificationdialogClose = () => {
    dispatch(setIsNotification(false));
  };
  const { isLoading, data, isError, error } = useGetNotificationQuery();
  useError([{ isError, error }]);
  console.log(data);

  return (
    <Dialog open={isNotification} onClose={NotificationdialogClose}>
      <Stack p={{ x: "1rem", sm: "2rem" }} maxwidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : data?.allRequests?.length > 0 ? (
          <>
            {data?.allRequests.map((i) => (
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
  const { _id, sender } = notification;

  return (
    <>
      <ListItem>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={"1rem"}
          width={"100%"}
        >
          <Avatar src={sender?.avatar?.url} alt={sender?.avatar?.public_id} />
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
            {`${sender?.name} sent you a friend request`}
          </Typography>
          <Stack>
            <Button onClick={() => handler({ _id, accept: true })}>
              Accept
            </Button>
            <Button
              color={"error"}
              onClick={() => handler({ _id, accept: false })}
            >
              {" "}
              Reject
            </Button>
          </Stack>
        </Stack>
      </ListItem>
    </>
  );
});

export default NotificationDialog;
