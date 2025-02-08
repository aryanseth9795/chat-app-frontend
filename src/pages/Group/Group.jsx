import React, { useState, memo, useEffect, Suspense, lazy } from "react";
import {
  Stack,
  Box,
  Drawer,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  TextField,
  Button,
  Backdrop,
} from "@mui/material";
import { green } from "../../constants/color";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Edit as EditIcon,
  Done as DoneIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { bgGradient, matBlack } from "../../constants/color";
import { Link } from "../../components/Styles/styledComponents";
import { sampledata } from "../../constants/sampledata";
import AvatarCard from "../../components/Common/AvatarCard.jsx";

const Group = () => {
  const ConfirmdeleteDialog = lazy(() =>
    import("../../components/Dialog/ConfirmdeleteDialog.jsx")
  );
  const AddDialog = lazy(() => import("../../components/Dialog/AddDialog.jsx"));
  let isAdded = false;
  const navigate = useNavigate();
  const chatId = useSearchParams()[0].get("group");
  const [isMobile, setisMobile] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [groupName, setgroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [delDialog, setdelDialog] = useState(false);

  const opendeletedialog = () => {
    setdelDialog(true);
  };
  const closedeletedialog = () => {
    setdelDialog(false);
  };
  const openaddhandler = () => {};
  const deletehandler = () => {
    console.log("deleted");
    closedeletedialog();
  };
  const grpcloseHandler = () => {
    return navigate("/");
  };

  useEffect(() => {
    if (chatId) {
      setgroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setgroupName("");
      setGroupNameUpdatedValue("");
      setisEdit(false);
    };
  }, [chatId]);
  const updateGroupName = () => {
    setisEdit(false);
    console.log(groupNameUpdatedValue);
  };
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
          <IconButton
            onClick={updateGroupName}
            // disabled={isLoadingGroupName}
          >
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton
            // disabled={isLoadingGroupName}
            onClick={() => setisEdit(true)}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

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
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
            overflowX: "hidden",
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <GrpList grps={sampledata} chatId={chatId} />
        </Grid>

        <Grid
          xs={12}
          sm={8}
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            padding: "1rem 3rem",
            overflow: "auto",
          }}
        >
          {IconBtn}
          {groupName ? (
            <>
              {GroupName}
              <Typography
                variant="body1"
                margin={"2rem"}
                alignSelf={"flex-start"}
              >
                Members
              </Typography>
              <Stack
                width={"100%"}
                boxSizing={"border-box"}
                maxWidth={"45rem"}
                padding={{ xs: "0", sm: "1rem", md: "1rem 3rem " }}
                spacing={"2rem"}
                bgcolor={"red"}
                overflow={"auto"}
                height={"50vh"}
              >
                jg
                {/* members will come here  */}
              </Stack>
              <Stack
                direction={{
                  xs: "column-reverse",
                  sm: "row",
                }}
                spacing={"1rem"}
                p={{
                  xs: "0",
                  sm: "1rem",
                  md: "1rem 4rem",
                }}
              >
                <Button
                  size="large"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={opendeletedialog}
                >
                  Delete
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={openaddhandler}
                >
                  Add Member
                </Button>
              </Stack>
            </>
          ) : (
            <Typography>Select a Group To Manage </Typography>
          )}
        </Grid>
      </Grid>

      {/* { opendeletehandler && <ConfirmdeleteDialog open={opendeletehandler}/>} */}
      {delDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmdeleteDialog
            open={delDialog}
            closeHandler={closedeletedialog}
            deletehandler={deletehandler}
          />
        </Suspense>
      )}

      {isAdded && (
        <Suspense fallback={<Backdrop open />}>
          <AddDialog  />
        </Suspense>
      )}

      <Drawer
        open={isMobile}
        onClose={closeHandler}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <GrpList w={"70vw"} grps={sampledata} />
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
        position: "relative",
      }}
    >
      {grps.length > 0 ? (
        grps.map((grp, i) => (
          <GroupListItem group={grp} chatId={chatId} key={grp._id} />
        ))
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
