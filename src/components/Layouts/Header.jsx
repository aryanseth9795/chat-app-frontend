
import { AppBar, Box, IconButton, Toolbar, Typography,Tooltip ,Backdrop,Badge} from "@mui/material";

import {
      Add as AddIcon,
      Menu,
      Search as SearchIcon,
      Group as GroupIcon,
      Logout as LogoutIcon,
      Notifications as NotificationsIcon,
    } from "@mui/icons-material";
import { green, black } from "../../constants/color";
import { useState,Suspense,lazy } from "react";
import {useNavigate} from 'react-router-dom'


const NewGroupDialog=lazy(()=>import("../Dialog/NewGroupDialog"));
const NotificationDialog=lazy(()=>import("../Dialog/NotificationDialog "));
const SearchDialog=lazy(()=>import("../Dialog/SearchDialog"));


const Header = () => {
  const navigate=useNavigate()
  const [isMenu, setIsMenu] = useState(false);
  const [isNewGroup,   setIsNewGroup] = useState(false);
  const [isNotification,  setIsNotification] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  let notificationCount=10;
  const handleMenuBar = () => {
    setIsMenu((prev) => !prev);
  };

  const openSearch = () => {
    setIsSearch((prev) => !prev);
  };

  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };
  const openNotification  = () => {
    setIsNotification((prev) => !prev);
  };
  const navigateToGroup = () => {
  navigate("/groups")
  };
  const logoutHandler=()=>{

    console.log("Logout");
  }
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
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: green }}>
          <Toolbar>
            <Box sx={{ display: { sx: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMenuBar}>
                <Menu open={true} />
              </IconButton>
            </Box>
            <Typography variant="h5" sx={{ color: black }}>
              ChatsUp
            </Typography>
            <Box sx={{ flexGrow: 1 }}>   </Box>
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
  );
};

export default Header;
