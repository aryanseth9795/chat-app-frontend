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

function SearchDialog() {
  const [users,setUsers] = useState(sampleUsers);
  const userhandler = ({ _id }) => {
    console.log(_id);
  };

  let disablehandler = false;

  return (
    <Dialog open>
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
