import { Avatar, AvatarGroup, Stack, Box } from "@mui/material";
import React from "react";
import { TransformImage } from "../../lib/feature";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <>
      <Stack direction={"row"} spacing={"0.5rem"}>
        <AvatarGroup max={max}>
          <Box width={"5rem"} height={"4rem"}>
            {avatar?.map((ava, i) => (
              <Avatar
                key={Math.random() * 100}
                src={TransformImage(ava)}
                alt={`${i}`}
                sx={{
                  width: "3.5rem",
                  height: "3.5rem",
                  position: "absolute",
                  left: {
                    xs: `${i + 0.5}rem`,
                    sm: `${i}rem`,
                  },
                }}
              />
            ))}
          </Box>
        </AvatarGroup>
      </Stack>
    </>
  );
};

export default AvatarCard;
