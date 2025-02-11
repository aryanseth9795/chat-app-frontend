import { Search as SearchIcon } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogTitle,
  InputAdornment,
  ListItem,
  TextField,
  List,
  Stack
} from "@mui/material";
import React, { useState } from "react";
import UserItem from "../Common/UserItem";
import { sampleUsers } from "../../constants/sampledata";
import { setIsSearch } from "../../redux/slices/MiscSlice";
import { useDispatch,useSelector } from "react-redux";

function SearchDialog() {
  const dispatch=useDispatch()
  const [users,setUsers] = useState(sampleUsers);
  const {isSearch } = useSelector((state) => state.Misc);
  const userhandler = ({ _id }) => {
    console.log(_id);
  };

  const closehandler=()=>{
    dispatch(setIsSearch(false))
  }
  let disablehandler = false;

  return (
    <Dialog open={isSearch} onClose={closehandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle alignItems={"center"}> Find People </DialogTitle>
        <TextField
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
          {users.map((user) => (
            <ListItem>
              <UserItem
                user={user}
                key={user._id}
                userhandler={userhandler}
                disablehandler={disablehandler}
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Dialog>
  );
}

export default SearchDialog;
