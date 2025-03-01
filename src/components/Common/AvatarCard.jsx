import { Avatar, AvatarGroup, Stack, Box } from "@mui/material";
import React from "react";
import { TransformImage } from "../../lib/feature";

const AvatarCard = ({ avatar = [], max = 4, width="5rem",height="4rem",pwidth="3.5rem" ,pheight="3.5rem"}) => {
  return (
    <>
      <Stack direction={"row"} spacing={"0.5rem"}>
        <AvatarGroup max={max} position={"relative"}>
          <Box width={width} height={height} >
            {avatar?.map((ava, i) => (
              <Avatar
                key={Math.random() * 100}
                src={TransformImage(ava)}
                alt={`${i}`}
                sx={{
                  width: {pwidth},
                  height: {pheight},
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
