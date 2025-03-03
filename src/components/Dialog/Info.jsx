import {
  Avatar,
  DialogContent,
  DialogTitle,
  Typography,
  Dialog,
  Stack,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsInfo } from "../../redux/slices/MiscSlice";

const Info = ({ user }) => {
  const dispatch = useDispatch();
  const { isInfo } = useSelector((state) => state.Misc);
  const closehandlerInfo = () => {
    dispatch(setIsInfo(false));

  };

  return (
    <Dialog open={isInfo} onClose={closehandlerInfo} fullWidth>
      <DialogTitle alignSelf={"center"}>User Info</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "row", gap: "5rem" }}
      >
        <Avatar src={user?.avatar} />
        <Stack>
          <Typography variant="h6">Name: {user?.name}</Typography>
          <Typography variant="h6">UserName: {user?.username}</Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Info;
