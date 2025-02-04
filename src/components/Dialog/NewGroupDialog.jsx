import {
  Dialog,
  DialogTitle,
  Typography,
  Stack,
  ListItem,
  Avatar,
  Button,
  TextField,
} from "@mui/material";
import React, { memo, useState } from "react";
import { sampleUsers } from "../../constants/sampledata";
import UserItem from "../Common/UserItem";
import { useInputValidation } from "6pp";

const NewGroupDialog = () => {

  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const groupName = useInputValidation("");
  const memberhandler = (id) => {

    setSelectedMembers((prev)=>  prev.includes(id) ? prev.filter((current)=>current!==id) : [...prev,id] );}

  const submitHandler = () => {};
  const closeHandler = () => {};
  return (
    <Dialog open onClose={closeHandler}>
      <Stack
        p={{ xs: "1rem", sm: "3rem" }}
        width={{ xs: "18rem", sm: "25rem" }}
        spacing={"1rem"}
      >
        <DialogTitle>New Group</DialogTitle>
        <TextField
          value={groupName.value}
          onChange={groupName.changeHandler}
          label={"Group Name"}
        />
        <Typography p={"0 0 0 3rem "}>Members</Typography>
        <Stack>
          {members.map((user) => (
            <ListItem>
              <UserItem user={user} key={user._id} userhandler={memberhandler} isAdded={selectedMembers.includes(user._id)}  />
            </ListItem>
          ))}
        </Stack>
        <Stack direction={"row"} spacing={4} justifyContent={"space-evenly"}>
          <Button type="" color="error" variant="contained">
            Cancel
          </Button>
          <Button color="success" variant="contained" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroupDialog;
