import React, { useState } from "react";
import {
  Stack,
  Box,
  Drawer,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { green } from "../../constants/color";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { bgGradient, matBlack } from "../../constants/color";
const Group = () => {
  const navigate = useNavigate();
  const [isMobile, setisMobile] = useState(false);
  const grpcloseHandler = () => {
    return navigate("/");
  };
  const IconBtn = (
    <>
      <Box
        sx={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          display: { xs: "block", sm: "none" },
        }}
      >
        <IconButton onClick={() => setisMobile((prev) => !prev)}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip>
        <IconButton
          sx={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            color: "white",
            bgcolor: matBlack,
          }}
          onClick={grpcloseHandler}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );
  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton
            disabled={isLoadingGroupName}
            onClick={() => setIsEdit(true)}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const closeHandler = () => {
    setisMobile(false);
  };
  return (
    <>
      <Grid container height={"100vh"}>
        <Grid
          item
          sm={4}
          bgcolor={green}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <GrpList />
        </Grid>

        <Grid
          xs={12}
          sm={8}
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            padding: "1rem 3rem",
          }}
        >
          {IconBtn}
        </Grid>
      </Grid>
      <Drawer
        open={isMobile}
        onClose={closeHandler}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <GrpList w={"70vw"} grps={[]} />
      </Drawer>
    </>
  );
};

const GrpList = ({ w = "100", grps = [], chatId }) => {
  return (
    <Stack
      width={w}
      sx={{
        backgroundImage: bgGradient,
        height: "100vh",
        overflow: "auto",
      }}
    >
      {grps.length > 0 ? (
        grps.map((grp, i) => (<GroupListItem group={grp} chatId={chatId} key={grp._id} />))
      ) : (
        <Typography textAlign={"center"} padding={"1rem"}>
          No Groups
        </Typography>
      )}
    </Stack>
  );
};


const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});
export default Group;
