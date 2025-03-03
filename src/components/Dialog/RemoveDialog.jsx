import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import { useState } from "react";
import UserItem from "../Common/UserItem";
import {
  useAddingroupMutation,
  useAddMembersListInGrpQuery,
  useRemoveingroupMutation,
} from "../../Redux/api/api";
import toast from "react-hot-toast";

const RemoveDialog = ({ members, chatId, setdelDialog }) => {
  const [RemoveMembers] = useRemoveingroupMutation();

  const closeHandler = () => {
    setSelectedMembers([]);
    setdelDialog(false);
  };
  const submitRemoveHandler = async () => {
    // here mutation called
    const adId = toast.loading("Removing Selected Members");
    try {
      const result = await RemoveMembers({ chatId, members: selectedMembers });

      if (result?.data?.success) {
        toast.success(result?.data?.message, { id: adId });
      }
      if (result?.error) {
        toast.error(result?.error?.data?.message, { id: adId });
      }
    } catch (error) {
      toast.error(error, { id: adId });
    } finally {
      closeHandler();
    }
  };

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
          {members?.length > 0 ? (
            members?.map((i) => {
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
          <Button variant="outlined" color={"error"} onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={submitRemoveHandler}
            // disabled={isloadingMembers}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default RemoveDialog;
