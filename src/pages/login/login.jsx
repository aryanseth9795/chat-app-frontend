import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../../components/Styles/styledComponents";
import serverUrl from "../../constants/config";
import { userexist, userNotexist } from "../../redux/slices/AuthSlice";
import { usernameValidation } from "../../utils/validation";
const Login = () => {
  const dispatch = useDispatch();
  const [islogin, setislogin] = useState(true);

  // defining state variables of the form

  const name = useInputValidation("");
  const password = useInputValidation();
  const username = useInputValidation("", usernameValidation);
  const email = useInputValidation();
  const avatar = useFileHandler("single");
  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const res = await axios.post(
        `${serverUrl}/users/login`,
        { username: username.value, password: password.value },
        config
      );
      dispatch(userexist(res?.data?.success));
      toast.success(res?.data?.message);
    } catch (error) {
 
      dispatch(userNotexist());
      toast.error(error?.
        response
        ?.data?.message || "Something went Wrong");
    }
  };
  const handlesignup = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("username", username.value);
      formData.append("password", password.value);
      formData.append("email", email.value);

      // If avatar is uploaded
      if (avatar.file) {
        formData.append("avatar", avatar.file);
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const res = await axios.post(
        `${serverUrl}/users/signup`,
        formData,
        config
      );
      dispatch(userexist(res?.data?.success));
      toast.success(res?.data?.message);
    } catch (error) {
      dispatch(userNotexist());
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    }
  };
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to right , rgb(1, 251, 247), rgb(55, 29, 190))",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {islogin ? (
            <>
              {" "}
              <Typography
                variant="h3"
                gutterBottom
                color={"red"}
                padding={"1rem"}
              >
                ChatsApp
              </Typography>
              <Typography variant="h5"> Login </Typography>
              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handlelogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="standard"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography variant="caption" color="error">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  type="password"
                  label="Password"
                  margin="normal"
                  variant="standard"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Login
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>
                <Button
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                  variant="text"
                  onClick={() => setislogin((prev) => !prev)}
                >
                  {" "}
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                gutterBottom
                color={"rgba(43, 205, 28)"}
                padding={"0.1rem"}
              >
                ChatsApp
              </Typography>
              <Typography variant="h5" sx={{ color: "rgba(166, 41, 41, 1)" }}>
                {" "}
                SignUp{" "}
              </Typography>
              <form
                onSubmit={handlesignup}
                style={{ width: "100%", marginTop: "0.5rem" }}
              >
                <Stack position={"relative"} width={"5rem"} margin={"auto"}>
                  <Avatar
                    src={avatar.preview}
                    sx={{
                      width: "5rem",
                      height: "5rem",
                      objectfit: "contain",
                    }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "black",
                      ":hover": { bgcolor: "white" },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAlt />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    variant="caption"
                    color="error"
                  >
                    {avatar.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="standard"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Email"
                  margin="normal"
                  variant="standard"
                  value={email.value}
                  onChange={email.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="standard"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography variant="caption" color="error">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="standard"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Sign Up
                </Button>
                <Typography textAlign={"center"} m={"0.5rem"}>
                  OR
                </Typography>
                <Button
                  sx={{ marginTop: "0.5rem" }}
                  fullWidth
                  variant="text"
                  onClick={() => setislogin((prev) => !prev)}
                >
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
