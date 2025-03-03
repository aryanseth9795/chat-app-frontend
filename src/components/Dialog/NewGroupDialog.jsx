import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sampleUsers } from "../../constants/sampledata";
import { setIsNewGroup } from "../../Redux/slices/MiscSlice";
import UserItem from "../Common/UserItem";
import toast from "react-hot-toast";
import {
  useCreategroupMutation,
  useGetMembersforAddinGroupsQuery,
} from "../../Redux/api/api";
import { useError } from "../../hooks/customHooks";

const NewGroupDialog = () => {
  const dispatch = useDispatch();
  const { isNewGroup } = useSelector((state) => state.Misc);

  const { data, isLoading, isError, error } =
    useGetMembersforAddinGroupsQuery();

  useError([{ isError, error }]);

  // group craeting api

  const [createGroup] = useCreategroupMutation();

  let members = data?.users?.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));


  const [selectedMembers, setSelectedMembers] = useState([]);

  const groupName = useInputValidation("");
  const memberhandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((current) => current !== id)
        : [...prev, id]
    );
  };

  const submitHandler = async () => {
    if (groupName.value === "") {
      toast.error("Enter Group Name");
      return;
    }

    const tid = toast.loading("Creating Group");
    let body = { name: groupName.value, members: selectedMembers };

    try {
      const data = await createGroup(body);
      if (data?.data?.success) {
        toast.success(data.data.message, { id: tid });
      }

      if (data.error) {
        toast.error(data.error.message, { id: tid });
      }
    } catch (error) {
      toast.error(error || "Something went Wrong", { id: tid });
    } finally {
      dispatch(setIsNewGroup(false));
      setSelectedMembers([]);
      groupName.clear();
    }
  };
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
          required
        />
        <Typography p={"0 0 0 3rem "}>Members</Typography>
        <Stack>
         {isLoading ? <Skeleton/>:  members?.map((user) => (
            <ListItem key={user._id}>
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
