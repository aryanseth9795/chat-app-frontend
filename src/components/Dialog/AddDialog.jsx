import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import { useState } from "react";
import UserItem from "../Common/UserItem";
import {
  useAddingroupMutation,
  useAddMembersListInGrpQuery,
} from "../../Redux/api/api";
import toast from "react-hot-toast";

const AddDialog = ({ open,
   isloadingMembers, chatId, setisAdded }) => {
  const [addMembers] = useAddingroupMutation();
  const closeHandler = () => {
    setSelectedMembers([]);
    setisAdded(false);
  };
  const submitAddHandler = async () => {
    // here mutation called
    const adId = toast.loading("Adding Members In Group");
    try {
      const result = await addMembers({ chatId, members: selectedMembers });
      if (result?.data?.success) {
        toast.success(result?.data?.message, { id: adId });
        if (result?.error) {
          toast.error(result?.error?.message, { id: adId });
        }
      }
    } catch (error) {
      toast.error(error, { id: adId });

      console.log(error);
    }
    closeHandler();
  };

  const { data: members } = useAddMembersListInGrpQuery(chatId, {
    skip: !chatId,
  });

  // const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const memberhandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((current) => current !== id)
        : [...prev, id]
    );
  };

  return (
    <Dialog open={open} onClose={closeHandler}>
      <Stack width={"25rem"} spacing={"2rem"} p={"2rem"}>
        <DialogTitle textAlign={"center"}> Add Members</DialogTitle>
        <Stack spacing={"1rem"}>
          {members?.leftmembersforadd?.length > 0 ? (
            members?.leftmembersforadd.map((i) => {
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
            onClick={submitAddHandler}
            disabled={isloadingMembers}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddDialog;
