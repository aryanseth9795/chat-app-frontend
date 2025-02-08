import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";

import { useState } from "react";
import { sampleUsers } from "../../constants/sampledata";
import UserItem from "../Common/UserItem";
const AddDialog = ({ addMember, isloadingMembers, chatId }) => {
  const closeHandler = () => {
    setMembers([]);
    setSelectedMembers([]);
  };
  const submitAddHandler = () => {
    closeHandler();
  };

  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const memberhandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((current) => current !== id)
        : [...prev, id]
    );
  };
  return (
    <Dialog open onClose={closeHandler}>
      <Stack width={"25rem"} spacing={"2rem"} p={"2rem"}>
        <DialogTitle textAlign={"center"}> Add Members</DialogTitle>
        <Stack spacing={"1rem"}>
          {members.length > 0 ? (
            members.map((i) => {
              return (
                <UserItem
                  user={i}
                  key={i._id}
                  userhandler={memberhandler}
                  isAdded={selectedMembers.includes(i._id)}
                />
              );
            })
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="outlined" color={ "error"} onClick={closeHandler}>Cancel</Button>
          <Button variant="outlined" onClick={submitAddHandler} disabled={isloadingMembers}>Submit Changes</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddDialog;
