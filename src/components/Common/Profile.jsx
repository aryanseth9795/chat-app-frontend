import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
  CalendarMonth,
} from "@mui/icons-material";
import InfoIcon from '@mui/icons-material/Info';
import moment from "moment";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.Auth);
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

      <ProfileCard heading={"Bio"} text={user?.bio? user?.bio:"Like to add Something about yourself ? "} Icon={<InfoIcon/>} />
      <ProfileCard
        heading={"Joined"}
        text={moment(user.createdAt).fromNow()}
        Icon={<CalendarMonth />}
      />
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
export default Profile;
