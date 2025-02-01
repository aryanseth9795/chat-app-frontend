import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
  IconButton,
  Avatar,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../../components/Styles/styledComponents";
import { usernameValidation } from "../../utils/validation";
import { useFileHandler, useInputValidation } from "6pp";
const Login = () => {
  const [islogin, setislogin] = useState(true);

  // defining state variables of the form

  const name = useInputValidation("");
  const password = useInputValidation();
  const username = useInputValidation("", usernameValidation);
  const email = useInputValidation();
  const avatar = useFileHandler("single");
 const handlelogin=(e)=>{
  e.preventDefault();
  console.log("clicked")
 };
 const handlesignup=(e)=>{
  e.preventDefault();
  console.log("clicked")
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
              <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={handlelogin}>
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
              <form onSubmit={handlesignup} style={{ width: "100%", marginTop: "0.5rem" }}>
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
                  <Typography m={"1rem auto"} width={"fit-content"} display={"block"} variant="caption" color="error">
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
