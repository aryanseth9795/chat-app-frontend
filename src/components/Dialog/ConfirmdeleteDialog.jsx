import {
    Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Stack,Button
} from "@mui/material";
import React from "react";

const ConfirmdeleteDialog = ({ open, closeHandler, deletehandler }) => {
  return (
    <Dialog open={open} onClose={closeHandler} >
      <Stack textAlign={"center"}>
        <DialogTitle> Delete Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You Sure To Delete this Group?
          </DialogContentText>
          <DialogActions>
            <Button onClick={closeHandler}>No</Button>
            <Button onClick={deletehandler}>Yes</Button>
          </DialogActions>
        </DialogContent>
      </Stack>
    </Dialog>
  );
};

export default ConfirmdeleteDialog;
