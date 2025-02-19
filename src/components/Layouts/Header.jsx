import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
  Backdrop,
  Badge,
} from "@mui/material";

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
  setIsNotification,
  setIsSearch,
} from "../../redux/slices/MiscSlice";

//calling lazy components
const NewGroupDialog = lazy(() => import("../Dialog/NewGroupDialog"));
const NotificationDialog = lazy(() => import("../Dialog/NotificationDialog "));
const SearchDialog = lazy(() => import("../Dialog/SearchDialog"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {  isSearch, isNotification } = useSelector(
    (state) => state.Misc
  );
  const {  notificationCount } = useSelector(
    (state) => state.Chat
  );

  const [isNewGroup, setIsNewGroup] = useState(false);

  // let notificationCount = 1;
  const handleMenuBar = () => {
    dispatch(setIsMenu(true));
  };

  const openSearch = () => {
    
    dispatch(setIsSearch(true));
   
  };

  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };
  const openNotification = () => {
    dispatch(setIsNotification(true));
  };
  const navigateToGroup = () => {
    navigate("/groups");
  };
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${serverUrl}/users/logout`, {
        withCredentials: true,
      });
      dispatch(userNotexist());
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const IconBtn = ({ title, icon, onClick, value }) => {
    return (
      <Tooltip title={title}>
        <IconButton color="inherit" size="large" onClick={onClick}>
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
        <Box sx={{ flexGrow: 1 }} height={"4rem"}>
          <AppBar position="static" sx={{ bgcolor: green }}>
            <Toolbar>
              <Box sx={{ display: { sx: "block", sm: "none" } }}>
                <IconButton color="inherit" onClick={handleMenuBar}>
                  <Menu />
                </IconButton>
              </Box>

              <Typography
                sx={{ color: black, typography: { xs: "body1", sm: "h4" } }}
                p={"1rem"}
                justifyContent={"center"}
              >
                ChatsUp
              </Typography>
              <Box sx={{ flexGrow: 1 }}> </Box>
              <Box>
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
                  value={notificationCount}
                />

                <IconBtn
                  title={"Logout"}
                  icon={<LogoutIcon />}
                  onClick={logoutHandler}
                />
              </Box>
            </Toolbar>
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
