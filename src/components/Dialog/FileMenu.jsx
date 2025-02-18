import {
  AudioFile as AudioIcon,
  Image,
  VideoCameraBack as VideoIcon,
} from "@mui/icons-material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Tooltip
} from "@mui/material";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useSendattachementsMutation } from "../../redux/api/api";
import { setIsFileLoading, setIsFileMenu } from "../../redux/slices/MiscSlice";
const FileMenu = ({ anchorE1, chatId }) => {
  const dispatch = useDispatch();
  const [fileUplaoder] = useSendattachementsMutation();


  // creating references for all the input fields
  const imgRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const fileRef = useRef(null);

  // function to assigning click event
  const selectImg = () => imgRef.current.click();
  const selectVideo = () => videoRef.current.click();
  const selectAudio = () => audioRef.current.click();
  const selectFile = () => fileRef.current.click();

  const fileMenuCloser = () => {
    dispatch(setIsFileMenu(false));
  };

  const fileHandler = async (e, key) => {
    const files = Array.from(e.target.files);

    if (files < 1) {
      toast.error("Add Something",);
      return;
    }
    if (files > 5) {
      toast.error("You can't upload more than 5 files at a time");
    }
    try {
      dispatch(setIsFileLoading(true));
      const formData = new FormData();
      formData.append("chatId", chatId);
      files.forEach((file) => {
        formData.append("files", file);
      });
      const taostId = toast.loading("Sending Files...");
      fileMenuCloser();

      const result=await fileUplaoder(formData);
      console.log(result);
      if (result.data) {
        toast.success(`${key} sent successfully`, { id: taostId })}
        else {
        toast.error(` Error in Sending ${key} `,{id:taostId});}
    } catch (error) {
      console.log(error);
    }finally{ 
      dispatch(setIsFileLoading(false));
    } 
  };
  const { isFileMenu } = useSelector((state) => state.Misc);

  return (
    <Menu anchorEl={anchorE1} open={isFileMenu} onClose={fileMenuCloser}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "10rem",
          width: "8rem",
        }}
      >
        <MenuList>
          <MenuItem onClick={selectImg}>
            <Tooltip title="Image">
              <Image />
            </Tooltip>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={imgRef}
              style={{ display: "none" }}
              onChange={(e) => fileHandler(e, "image")}
            />
            <ListItemText sx={{ marginLeft: "0.5rem" }}>Images</ListItemText>
          </MenuItem>

          <MenuItem onClick={selectVideo}>
            <Tooltip title="Videos">
              <VideoIcon />
            </Tooltip>
            <input
              type="file"
              accept="video/*"
              multiple
              ref={videoRef}
              style={{ display: "none" }}
              onChange={(e) => fileHandler(e, "video")}
            />
            <ListItemText sx={{ marginLeft: "0.5rem" }}>Videos</ListItemText>
          </MenuItem>

          <MenuItem onClick={selectAudio}>
            <Tooltip title="Audio">
              <AudioIcon />
            </Tooltip>
            <input
              type="file"
              accept="audio/*"
              multiple
              ref={audioRef}
              style={{ display: "none" }}
              onChange={(e) => fileHandler(e, "audio")}
            />
            <ListItemText sx={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
          </MenuItem>
          <MenuItem onClick={selectFile}>
            <Tooltip title="File">
              <AttachFileIcon />
            </Tooltip>
            <input
              type="file"
              accept="*"
              multiple
              ref={fileRef}
              style={{ display: "none" }}
              onChange={(e) => fileHandler(e, "file")}
            />
            <ListItemText sx={{ marginLeft: "0.5rem" }}>File</ListItemText>
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
};

export default FileMenu;
