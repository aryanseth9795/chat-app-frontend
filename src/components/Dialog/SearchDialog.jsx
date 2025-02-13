import { Search as SearchIcon } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogTitle,
  InputAdornment,
  ListItem,
  TextField,
  List,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserItem from "../Common/UserItem";

import { setIsSearch } from "../../redux/slices/MiscSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useFriendRequestSendMutation,
  useLazySearchUserQuery,
} from "../../redux/api/api";
import { useInputValidation } from "6pp";
import toast from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/customHooks";

function SearchDialog() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const { isSearch } = useSelector((state) => state.Misc);
  const [searchUser] = useLazySearchUserQuery();
  const search = useInputValidation("");

  const [friendRequestSend, isLoadingfriendRequest,data] = useAsyncMutation(
    useFriendRequestSendMutation
  );

  const userhandler = async (_id) => {
   await friendRequestSend("friend Request Sending",{userId:_id});

  };

  const closehandler = () => {
    dispatch(setIsSearch(false));
  };


  useEffect(() => {
    const timeId = setTimeout(() => {
      searchUser(search.value).then((data) => setUsers(data?.data?.users)).catch((e)=>console.log(e));
    }, 500);

    return () => clearTimeout(timeId);
  }, [search.value,data]);

  return (
    <Dialog open={isSearch} onClose={closehandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle alignItems={"center"}> Find People </DialogTitle>
        <TextField
          onChange={search.changeHandler}
          value={search.value}
          label={"Search Username or Name"}
          variant="outlined"
          size="small"
          inputProps={{
            startadornment: (
              <InputAdornment>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users && users.map((user) => (
            <ListItem key={user?._id}>
              <UserItem
                user={user}
                userhandler={userhandler}
                disablehandler={isLoadingfriendRequest}
               isAdded={user.request}
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Dialog>
  );
}

export default SearchDialog;
