import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sampleUsers } from "../../constants/sampledata";
import { setIsNewGroup } from "../../redux/slices/MiscSlice";
import UserItem from "../Common/UserItem";

const NewGroupDialog = () => {
  const dispatch = useDispatch();
  const { isNewGroup } = useSelector((state) => state.Misc);
  console.log(isNewGroup);
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const groupName = useInputValidation("");
  const memberhandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((current) => current !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {};
  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };
  
  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack
        p={{ xs: "1rem", sm: "3rem" }}
        width={{ xs: "18rem", sm: "25rem" }}
        spacing={"1rem"}
        overflow={"auto"}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
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
              <UserItem
                user={user}
                key={user._id}
                userhandler={memberhandler}
                isAdded={selectedMembers.includes(user._id)}
              />
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
