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
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Add as AddIcon,
  Menu,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { green, black } from "../../constants/color";
import { useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import serverUrl from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotexist } from "../../redux/slices/AuthSlice";
import {
  setIsMenu,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/slices/MiscSlice";
import { getSocket } from "../../socket";
import { NotificationReset } from "../../redux/slices/ChatSlice";
import { useParams } from "react-router-dom";
import AvatarCard from "../Common/AvatarCard";

//calling lazy components
const NewGroupDialog = lazy(() => import("../Dialog/NewGroupDialog"));
const NotificationDialog = lazy(() => import("../Dialog/NotificationDialog "));
const SearchDialog = lazy(() => import("../Dialog/SearchDialog"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.Misc
  );
  const { NotificationCount, member } = useSelector((state) => state.Chat);

  const socket = getSocket();

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
        console.log(res);
        socket.disconnect();
      }
      dispatch(userNotexist());
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const IconBtn = ({ title, icon, onClick, value }) => {
    return (
      <Tooltip title={title}>
        <IconButton
          color="inherit"
          onClick={onClick}
          sx={{ fontSize: { xs: "small", sm: "large" } }}
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
  return (
    <Suspense fallback={<Backdrop open />}>
      <>
        <Box sx={{ flexGrow: 1 }} height={{ xs: "3rem", sm: "4rem" }}>
          <AppBar position="static" sx={{ bgcolor: green }}>
            <>
              <Toolbar>
                <Box sx={{ display: { sx: "block", sm: "none" } }}>
                  <IconButton color="inherit" onClick={handleMenuBar}>
                    <Menu />
                  </IconButton>
                </Box>

                <Box gap={"2rem"} display={"flex"} flexDirection={"row"} alignContent={"center"}>
                <Box position={"relative"} >
                  {/* <AvatarCard
                    avatar={member?.avatar?.url ? [member.avatar.url] : []}
                    pheight="1.5rem"
                    pwidth="1.5rem"
                    height="2rem"
                    width="2rem"
                  /> */}
                </Box>
                <Box>
                  <Typography
                    sx={{ color: black, typography: { xs: "body2", sm: "h4" } }}
                    p={{ xs: "0rem", sm: "1rem" }}
                    justifyContent={"center"}
                  >
                    {member?.name ? member.name : "ChatsApp"}
                  </Typography>
                </Box>
                </Box>
                <Box sx={{ flexGrow: 1 }}> </Box>
                <Box display={param?.id ? "none" : "block"}>
                  <IconBtn
                    title={"Search"}
                    icon={<SearchIcon />}
                    onClick={openSearch}
                  />

                  <IconBtn
                    title={"New Group"}
                    icon={<AddIcon />}
                    onClick={openNewGroup}
                  />

                  <IconBtn
                    title={"Manage Groups"}
                    icon={<GroupIcon />}
                    onClick={navigateToGroup}
                  />

                  <IconBtn
                    title={"Notifications"}
                    icon={<NotificationsIcon />}
                    onClick={openNotification}
                    value={NotificationCount}
                  />

                  <IconBtn
                    title={"Logout"}
                    icon={<LogoutIcon />}
                    onClick={logoutHandler}
                  />
                </Box>

                <Box display={param?.id ? "block" : "none"}>
                  <IconBtn
                    title={"Delete"}
                    icon={<DeleteIcon />}
                    onClick={navigateToGroup}
                  />

                  <IconBtn
                    title={"Info"}
                    icon={<InfoIcon />}
                    onClick={openNotification}
                    value={NotificationCount}
                  />

                  <IconBtn
                    title={"Menu"}
                    icon={<MoreVertIcon />}
                    onClick={logoutHandler}
                  />
                </Box>
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
      </>
    </Suspense>
  );
};

export default Header;
