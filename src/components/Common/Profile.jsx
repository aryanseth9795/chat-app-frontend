import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {Face as FaceIcon,AlternateEmail as UsernameIcon,CalendarMonth} from "@mui/icons-material";
import moment from 'moment'

const Profile = () => {
  return (
    <Stack spacing={"2rem"} alignItems={"center"}>
      <Avatar
        sx={{
          height: "10rem",
          width: "10rem",
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />   <ProfileCard heading={"Name"} text={"Aryan Seth"} Icon={<FaceIcon/>}/>
   
      <ProfileCard heading={"Username"} text={"aryanseth9795"} Icon={<UsernameIcon/>}  />
      {/* <ProfileCard heading={"Bio"} text={"bhwehuihwe"} /> */}
      <ProfileCard heading={"Joined"} text={moment('2024-06-09T00:00:00.000Z').fromNow()} Icon={<CalendarMonth/>} />
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
      <Typography variant="body">{text}</Typography>
      <Typography color={"grey"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);
export default Profile;
