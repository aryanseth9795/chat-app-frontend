import { Search as SearchIcon } from "@mui/icons-material";
import { Box, DialogTitle, InputAdornment, ListItem, TextField , List, ListItemText} from "@mui/material";
import React from "react";

function SearchDialog() {
  return (
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle alignItems={"center"}> Find People </DialogTitle>
        <TextField variant="outlined" size="small" inputProps={{startadornment:(<InputAdornment><SearchIcon/></InputAdornment>)}}/> 
        <List>
           {users.map((user)=>(
            <ListItem>
              <ListItemText/>
            </ListItem>
           ))}


        </List>
      </Stack>
    </Dialog>
 
  );
}

export default SearchDialog;
