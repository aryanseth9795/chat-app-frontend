import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Backdrop,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, memo, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import AvatarCard from "../../components/Common/AvatarCard.jsx";
import UserItem from "../../components/Common/UserItem.jsx";
import { Link } from "../../components/Styles/styledComponents";
import { bgGradient, green, matBlack } from "../../constants/color";
import { useError, useSocketEventHook } from "../../hooks/customHooks.jsx";
import {
  useDeletegroupMutation,
  useGroupDetailsQuery,
  useMyGroupsQuery,
  useRenamegroupMutation,
} from "../../Redux/api/api.js";
import { getSocket } from "../../socket.jsx";
import { REFETCH_CHATS } from "../../constants/event.js";

const Group = () => {
  const navigate = useNavigate();
  // importing all lazy module
  const ConfirmdeleteDialog = lazy(() =>
    import("../../components/Dialog/ConfirmdeleteDialog.jsx")
  );
  const AddDialog = lazy(() => import("../../components/Dialog/AddDialog.jsx"));
  const RemoveDialog = lazy(() =>
    import("../../components/Dialog/RemoveDialog.jsx")
  );

  // Definig All State Variables
  const [isMobile, setisMobile] = useState(false);
  const [isEdit, setisEdit] = useState(true);
  // const [groupName, setgroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [delDialog, setdelDialog] = useState(false);
  const [isAdded, setisAdded] = useState(false);
  const [cnfDel, setcnfDel] = useState(false);

  // fetching group chat ID

  let chatId = useSearchParams()[0]?.get("group");

  // All Function Handlers
  const grpcloseHandler = () => {
    return navigate("/");
  };

  const opendeletedialog = () => {
    setcnfDel(true);
  };
  const closedeletedialog = () => {
    setcnfDel(false);
  };

  const deletedhandler = async () => {
    const tid = toast.loading("Deleting Group ");
    try {
      const delres = await deleteGroup({chatId} );

      if (delres?.data?.success) {
        toast.success(delres?.data?.message, { id: tid });
       mygrpRefetch();
        grpRefetch();
        navigate("/", { replace: true });
        console.log(grpdetails)
      }
      if (delres?.error?.data?.success)
        toast.error(delres?.error?.data?.message, { id: tid });
    } catch (error) {
      console.log(error);
    } finally {
      closedeletedialog();
    }
  };

  const openaddhandler = () => {
    setisAdded(true);
  };

const socket=getSocket();

const refetcher=useCallback(()=>{
  mygrpRefetch();
  grpRefetch()
},[])
const grouplisten={[REFETCH_CHATS]:refetcher}


useSocketEventHook(socket,grouplisten)





  useEffect(() => {
    return () => {
      setisMobile(false);
      // setgroupName("");
      setGroupNameUpdatedValue("");
      setisEdit(false);
    };
  }, [chatId]);

  // Fetching Data
  const { data: groupchatList, isLoading, error, isError ,refetch:mygrpRefetch} = useMyGroupsQuery();

  const {
    data: grpdetails,
    isLoading: groupdetailLoading,
    isError: detailError,
    error: detailErrorValue,
    refetch:grpRefetch
  } = useGroupDetailsQuery(chatId, { skip: !chatId });

  const [
    deleteGroup,
    {
      isLoading: deletingGroupLoading,
      error: DeletingError,
      isError: deltingIserror,
    },
  ] = useDeletegroupMutation();
  //All Errors handling
  useError([
    { isError, error },
    { isError: detailError, error: detailErrorValue },
    {
      isError: deltingIserror,
      error: DeletingError,
    },
  ]);

  const [RenameGroup] = useRenamegroupMutation();
  const updateGroupName = async () => {
    const tid = toast.loading("Renaming Group");

    try {
      const res = await RenameGroup({ chatId, name: groupNameUpdatedValue });
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: tid });
      }
      if (res?.error?.data?.success)
        toast.error(res?.error?.data?.message, { id: tid });

    } catch (error) {
      console.log(error);
      toast.error(error, { id: tid });

    } finally {
      setisEdit(false);
    }
  };

  const closeHandler = () => {
    setisMobile(false);
  };

  // Jsx Function
  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      spacing={{ xs: "0.5rem", sm: "10rem" }}
      padding={"2rem"}
      width={"100%"}
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
          <IconButton
            sx={{
              color: "red",
              // bgcolor: matBlack,
              borderRadius: "8px",
              paddingX: 2,
              paddingY: 1,
            }}
            // disabled={isLoadingGroupName}
            onClick={() => setisEdit(true)}
          >
            <Typography variant="body2" padding={"1rem"}>
              Change Name
            </Typography>
            <EditIcon />
          </IconButton>
          <Typography variant="h4">{grpdetails?.groupDetail?.name}</Typography>
        </>
      )}

      <Tooltip>
        <IconButton
          sx={{
            color: "red",
            // bgcolor: matBlack,
            borderRadius: "8px",
            paddingX: 2,
            paddingY: 1,
          }}
          onClick={() => setcnfDel(true)}
        >
          <DeleteForeverIcon />
          <Typography variant="body2"> Delete Group</Typography>
        </IconButton>
      </Tooltip>
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

  return (
    <>
      <Grid container height={"100vh"}>
        <Grid
          item
          sm={3}
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
          <GrpList grps={groupchatList?.groups} chatId={chatId} />
        </Grid>

        <Grid
          xs={12}
          sm={9}
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

          {groupdetailLoading ? (
            <Skeleton />
          ) : grpdetails?.groupDetail?.name ? (
            <>
              <Stack direction={"row"} spacing={"10rem"}>
                {/* <Typography variant="h3" color="primary">
                  {" "}
                  {grpdetails?.groupDetail?.name}
                </Typography> */}
                {GroupName}
              </Stack>
              <Typography variant="h5" margin={"2rem"} alignSelf={"center"}>
                Members
              </Typography>
              <Stack
                width={"100%"}
                boxSizing={"border-box"}
                maxWidth={"45rem"}
                padding={{ xs: "0", sm: "1rem", md: "1rem 3rem " }}
                spacing={"2rem"}
                overflow={"auto"}
                height={"50vh"}
              >
                {grpdetails?.groupDetail?.members?.map((i) => (
                  <UserItem
                    user={i}
                    key={i._id}
                    isAdded
                    styling={{
                      boxShadow: "0 0 0.5rem  rgba(0,0,0,0.2)",
                      padding: "0.5rem 0.5rem",
                      borderRadius: "1rem",
                      justifyContent: "center",
                    }}
                    btnhide={true}
                  />
                ))}
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
                  onClick={() => setdelDialog(true)}
                >
                  Delete Members
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
      {cnfDel && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmdeleteDialog
            open={cnfDel}
            closeHandler={closedeletedialog}
            deletehandler={deletedhandler}
          />
        </Suspense>
      )}

      {isAdded && (
        <Suspense fallback={<Backdrop open />}>
          <AddDialog open={isAdded} setisAdded={setisAdded} chatId={chatId} />
        </Suspense>
      )}
      {delDialog && (
        <Suspense fallback={<Backdrop open />}>
          <RemoveDialog
            open={delDialog}
            setdelDialog={setdelDialog}
            chatId={chatId}
            members={grpdetails?.groupDetail?.members}
          />
        </Suspense>
      )}

      <Drawer
        open={isMobile}
        onClose={closeHandler}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <GrpList w={"70vw"} grps={groupchatList?.groups} chatId={chatId} />
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
