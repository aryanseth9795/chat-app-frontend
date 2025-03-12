import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
  Backdrop,
  Badge,
  Stack,
  Menu,
  MenuItem,
  MenuList,
  ListItemText,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { green, black } from "../../constants/color";
import { useState, Suspense, lazy, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import serverUrl from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotexist } from "../../Redux/slices/AuthSlice";
import {
  setIsInfo,
  setIsMenu,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../Redux/slices/MiscSlice";
import { getSocket } from "../../socket";
import { NotificationReset, setmember } from "../../Redux/slices/ChatSlice";
import { useParams } from "react-router-dom";
import AvatarCard from "../Common/AvatarCard";
import { useAsyncMutation } from "../../hooks/customHooks";
import { useDeleteChatMutation } from "../../Redux/api/api";
import Person2Icon from "@mui/icons-material/Person2";
import moment from "moment";



//calling lazy components
const NewGroupDialog = lazy(() => import("../Dialog/NewGroupDialog"));
const NotificationDialog = lazy(() => import("../Dialog/NotificationDialog "));
const SearchDialog = lazy(() => import("../Dialog/SearchDialog"));
const Info = lazy(() => import("../Dialog/Info"));
const EditProfile = lazy(() => import("../Common/EditProfile"));
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();

  const [menuAnchor1, setMenuAnchor1] = useState(null);
  // const MenuRef = useRef(null);
  const [threedotMenu, setthreeDot] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const threeDotMenuHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // setMenuAnchor1(event.currentTarget)
    setthreeDot(true);
  };

  const { isSearch, isNotification, isNewGroup, isInfo } = useSelector(
    (state) => state.Misc
  );
  const { NotificationCount, member, OnlineUser } = useSelector(
    (state) => state.Chat
  );

  const socket = getSocket();

  const isOnline = member?.members?.some((memeber) =>
    OnlineUser.includes(memeber)
  );

  const handleMenuBar = () => {
    dispatch(setIsMenu(true));
  };

  const openSearch = () => {
    dispatch(setIsSearch(true));
  };

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };
  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(NotificationReset());
  };
  const navigateToGroup = () => {
    navigate("/groups");
  };
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${serverUrl}/users/logout`, {
        withCredentials: true,
      });
      if (res) {
        socket.disconnect();
        dispatch(setmember(null));
      }
      dispatch(userNotexist());
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const [deletehandler, isLoading, data] = useAsyncMutation(
    useDeleteChatMutation
  );
  const DeleteChat = async () => {
    await deletehandler("Deleting Chat...", { chatId: member?.chatId });
    navigate("/");
    dispatch(setmember(null));
  };
  const IconBtn = ({ title, icon, onClick, value, ...props }) => {
    return (
      <Tooltip title={title}>
        <IconButton
          color="inherit"
          onClick={onClick}
          sx={{ fontSize: { xs: "small", sm: "large" } }}
          {...props}
        >
          {value ? (
            <Badge badgeContent={value} color="error">
              {icon}
            </Badge>
          ) : (
            icon
          )}
        </IconButton>
      </Tooltip>
    );
  };
  const AllMenuIcon = (
    <Box>
      <IconBtn title={"Search"} icon={<SearchIcon />} onClick={openSearch} />

      <IconBtn title={"New Group"} icon={<AddIcon />} onClick={openNewGroup} />

      <IconBtn
        title={"Manage Groups"}
        icon={<GroupIcon />}
        onClick={navigateToGroup}
      />

      <IconBtn
        title={"My Profile"}
        icon={<Person2Icon />}
        onClick={() => setIsEdit(true)}
      />

      <IconBtn
        title={"Notifications"}
        icon={<NotificationsIcon />}
        onClick={openNotification}
        value={NotificationCount}
      />

      <IconBtn title={"Logout"} icon={<LogoutIcon />} onClick={logoutHandler} />
    </Box>
  );
  return (
    <Suspense fallback={<Backdrop open />}>
      <>
        <Box sx={{ flexGrow: 1 }} height={"4rem"}>
          <AppBar position="static" sx={{ bgcolor: green }}>
            <>
              <Toolbar>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={"0.5rem"}
                  width={{ xs: "10%", sm: "25%" }}
                >
                  <Box sx={{ display: { sx: "block", sm: "none" } }}>
                    <IconButton color="inherit" onClick={handleMenuBar}>
                      <MenuIcon />
                    </IconButton>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: black,
                        typography: { xs: "body2", sm: "h4" },
                        display: { xs: "none", sm: "block" },
                      }}
                      justifyContent={"center"}
                    >
                      {"ChatsApp"}
                    </Typography>
                  </Box>
                </Stack>
                {member ? (
                  <></>
                ) : (
                  <Box display={{ xs: "flex", sm: "none" }}>ChatsApp</Box>
                )}
                <Box
                  sx={{ flexGrow: 1 }}
                  display={member ? "none" : "block"}
                ></Box>

                <Stack
                  direction={"row"}
                  display={member ? "flex" : "none"}
                  position={"relative"}
                  spacing={"3rem"}
                  alignItems={"center"}
                  width={{ xs: "80%", sm: "50%" }}
                  justifyContent={"space-between"}
                >
                  <AvatarCard
                    avatar={
                      member?.groupChat
                        ? member.avatar
                        : member?.avatar
                        ? [member?.avatar]
                        : [""]
                    }
                    pheight="1.5rem"
                    pwidth="1.5rem"
                    height="2rem"
                    width="2rem"
                  />
                  <Box>
                    <Typography>{member?.name}</Typography>
                    
                  <Typography variant="caption">  {isOnline ? "Online" : `Last Seen At ${moment(member?.lastseen).format("h:mm A")}`}</Typography>
                  </Box>

                  <Box display={member ? "flex" : "none"}>
                    <IconBtn
                      title={"Delete"}
                      icon={<DeleteIcon />}
                      onClick={DeleteChat}
                      disabled={isLoading}
                    />

                    <IconBtn
                      title={"Info"}
                      icon={<InfoIcon />}
                      onClick={() => dispatch(setIsInfo(true))}
                    />
                  </Box>
                </Stack>
                <Stack
                  display={{ xs: "none", sm: "flex" }}
                  width={"25%"}
                  direction={"row"}
                  justifyContent={"flex-end"}
                >
                  {AllMenuIcon}
                </Stack>
                <Stack
                  display={{ xs: "flex", sm: "none" }}
                  justifyContent={"end"}
                  width={"10%"}
                >
                  <IconBtn
                    title={"Menu"}
                    icon={<MoreVertIcon />}
                    onClick={threeDotMenuHandler}
                  />
                </Stack>
              </Toolbar>
            </>
          </AppBar>
        </Box>

        {isSearch && (
          <Suspense fallback={<Backdrop open />}>
            <SearchDialog />
          </Suspense>
        )}

        {isNotification && (
          <Suspense fallback={<Backdrop open />}>
            <NotificationDialog />
          </Suspense>
        )}

        {isNewGroup && (
          <Suspense fallback={<Backdrop open />}>
            <NewGroupDialog />
          </Suspense>
        )}

        {isInfo && (
          <Suspense fallback={<Backdrop open />}>
            <Info user={member} />
          </Suspense>
        )}

        {isEdit && (
          <Suspense fallback={<Backdrop open={true} />}>
            <EditProfile isEdit={isEdit} setIsEdit={setIsEdit} />
          </Suspense>
        )}

        <Menu
          open={threedotMenu}
          anchorEl={menuAnchor1}
          onClose={() => setthreeDot(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "4rem",
              width: "15rem",
            }}
          >
            <MenuList>{AllMenuIcon}</MenuList>
          </div>
        </Menu>
      </>
    </Suspense>
  );
};

export default Header;
