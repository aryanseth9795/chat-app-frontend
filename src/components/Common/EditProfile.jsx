import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useMychatListQuery, useUpdateProfileMutation } from "../../Redux/api/api";
import { userexist } from "../../Redux/slices/AuthSlice";
import { usernameValidation } from "../../utils/validation";
import { VisuallyHiddenInput } from "../Styles/styledComponents";
import { getSocket } from "../../socket";
import { PROFILE_UPDATED } from "../../constants/event";

const EditProfile = ({ isEdit, setIsEdit }) => {
  const { user } = useSelector((state) => state.Auth);
const {data:chatList}=useMychatListQuery();


const member=chatList?.chats?.flatMap((user)=>(user?.members));


const socket=getSocket();


  const dispatch = useDispatch();
  

  // defining the input fields
  const name = useInputValidation(user?.name);
  const username = useInputValidation(user?.username, usernameValidation);
  const avatar = useFileHandler("single");
  const bio = useInputValidation(user?.bio);
  const [updateProfile] = useUpdateProfileMutation();
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatetoastid = toast.loading("Updating Profile...");
      const newFormUpdate = new FormData();

      if (name?.value !== user?.name) newFormUpdate.append("name", name?.value);
      if (username?.value !== user?.username)
        newFormUpdate.append("username", username.value);
      if (avatar.file) newFormUpdate.append("avatar", avatar.file);
      if (bio.value !== user.bio) newFormUpdate.append("bio", bio.value);

      const res = await updateProfile(newFormUpdate);

      if (res?.data) {
        toast.success(res?.data?.message, { id: updatetoastid });
        dispatch(userexist(res?.data?.newUser));
       socket.emit(PROFILE_UPDATED,{member})
    
      } else {
        console.error(res?.error?.data?.message);
        toast.error(res?.error?.data?.message, { id: updatetoastid });
      }
    } catch (error) {
      toast.error(error?.data.message, { id: updatetoastid });
    } finally {
      setIsEdit(false);
    }
  };
  return (
    <Dialog open={isEdit} onClose={() => setIsEdit(false)}>
      <DialogTitle align="center" color="primary">
        Edit Profile
      </DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleEdit}
          style={{ width: "100%", marginTop: "0.5rem" }}
        >
          <Stack position={"relative"} width={"5rem"} margin={"auto"}>
            <Avatar
              src={avatar?.preview ? avatar?.preview : user?.avatar?.url}
              sx={{
                width: "5rem",
                height: "5rem",
                objectfit: "contain",
              }}
            />
            <IconButton
              sx={{
                position: "absolute",
                bottom: "0",
                right: "0",
                color: "black",
                ":hover": { bgcolor: "white" },
              }}
              component="label"
            >
              <>
                <CameraAlt />
                <VisuallyHiddenInput
                  type="file"
                  onChange={avatar.changeHandler}
                />
              </>
            </IconButton>
          </Stack>
          {avatar.error && (
            <Typography
              m={"1rem auto"}
              width={"fit-content"}
              display={"block"}
              variant="caption"
              color="error"
            >
              {avatar.error}
            </Typography>
          )}
          <TextField
            required
            fullWidth
            label="Name"
            margin="normal"
            variant="standard"
            value={name.value}
            onChange={name.changeHandler}
          />
          <TextField
            required
            fullWidth
            label="Username"
            margin="normal"
            variant="standard"
            value={username.value}
            onChange={username.changeHandler}
          />

          {username.error && (
            <Typography variant="caption" color="error">
              {username.error}
            </Typography>
          )}

          <TextField
           
            fullWidth
            label="Bio"
            margin="normal"
            variant="standard"
            value={bio?.value}
            onChange={bio.changeHandler}
          />

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Edit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
