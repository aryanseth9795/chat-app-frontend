import React, { useState } from "react";
import { Drawer, Grid } from "@mui/material";
const Group = () => {
  const [isMobile, setisMobile] = useState(true);
  const closeHandler = () => {};
  return (
    <>
      <Grid container height={"100vh"}>
        <Grid item sm={4} sx={{display:{xs:"none",sm:"block"}}} >Groups</Grid>
      </Grid>
      <Grid  xs={12} sm={8} item sx={{}} >
        Detal
      </Grid>

      <Drawer open={isMobile} onClose={closeHandler}>
        abc
      </Drawer>
    </>
  );
};

export default Group;
