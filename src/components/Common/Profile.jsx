import {
  Avatar,
  Stack,
  Typography,
  IconButton,
  Drawer,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  Dialog,
} from "@mui/material";
import React, { useState } from "react";
import {
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
  CalendarMonth,
} from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { useFileHandler, useInputValidation } from "6pp";
import { usernameValidation } from "../../utils/validation";
import { CameraAlt } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../Styles/styledComponents";
import { useUpdateProfileMutation } from "../../redux/api/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userexist } from "../../redux/slices/AuthSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.Auth);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Stack spacing={"2rem"} alignItems={"center"}>
      <Avatar
        src={user.avatar?.url}
        sx={{
          height: "10rem",
          width: "10rem",
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />

      <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />

      <ProfileCard
        heading={"Username"}
        text={user.username}
        Icon={<UsernameIcon />}
      />

      <ProfileCard
        heading={"Bio"}
        text={user?.bio ? user?.bio : "Like to add Something about yourself ? "}
        Icon={<InfoIcon />}
      />
      <ProfileCard
        heading={"Joined"}
        text={moment(user.createdAt).fromNow()}
        Icon={<CalendarMonth />}
      />

      <IconButton color="primary" onClick={() => setIsEdit(true)}>
        <EditIcon />
        <Typography padding={"1rem"} variant="caption">
          Edit Profile
        </Typography>
      </IconButton>
      <EditProfile isEdit={isEdit} setIsEdit={setIsEdit} user={user} />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body2">{text}</Typography>
      <Typography color={"grey"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

const EditProfile = ({ isEdit, setIsEdit, user }) => {
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

      if (name.value !== user.name) newFormUpdate.append("name", name.value);
      if (username.value !== user.username)
        newFormUpdate.append("username", username.value);
      if (avatar.file) newFormUpdate.append("avatar", avatar.file);
      if (bio.value !== user.bio) newFormUpdate.append("bio", bio.value);

      const res = await updateProfile(newFormUpdate);

      if (res?.data) {
        toast.success(res.data.message, { id: updatetoastid });
        dispatch(userexist(res.data.newUser));
      } else {
        console.error(res?.error?.data?.message);
        toast.error(res?.error?.data?.message, { id: updatetoastid });
      }
    } catch (error) {
      toast.error(error.data.message, { id: updatetoastid });
    } finally {
      setIsEdit(false);

      avatar.clear();
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
            required
            fullWidth
            label="Bio"
            margin="normal"
            variant="standard"
            value={bio.value}
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
export default Profile;
