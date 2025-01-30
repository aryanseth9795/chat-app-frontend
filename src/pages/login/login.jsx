import React, { useState } from "react";
import { Container, Paper, TextField, Typography, Button } from "@mui/material";
const Login = () => {
  const [islogin, setislogin] = useState(true);

  return (
  <div style={{ backgroundImage:"linear-gradient(to right , rgb(1, 251, 247), rgb(55, 29, 190))" }}>
      <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        display: "flex",
        justify: "center",
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
            <Typography variant="h5"> Login </Typography>
            <form style={{ width: "100%", marginTop: "1rem" }}>
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="standard"
              />
              <TextField
                required
                fullWidth
                label="Password"
                margin="normal"
                variant="standard"
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
                onClick={() => setislogin((prev)=>!prev)}
              >
                {" "}
                Sign Up Instead
              </Button>
            </form>
          </>
        ) : (
          <>
          <Typography variant="h5"> SignUp </Typography>
          <form style={{ width: "100%", marginTop: "1rem" }}>
          <TextField
              required
              fullWidth
              label="Name"
              margin="normal"
              variant="standard"
            />
                 <TextField
              required
              fullWidth
              label="Email"
              margin="normal"
              variant="standard"
            />
            <TextField
              required
              fullWidth
              label="Username"
              margin="normal"
              variant="standard"
            />
            <TextField
              required
              fullWidth
              label="Password"
              margin="normal"
              variant="standard"
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
                Sign Up
            </Button>
            <Typography textAlign={"center"} m={"1rem"}>
              OR
            </Typography>
            <Button
              sx={{ marginTop: "1rem" }}
              fullWidth
              variant="text"
              onClick={() => setislogin((prev)=>!prev)}
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
