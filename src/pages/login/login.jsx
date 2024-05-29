import { useState } from "react";
import { Button, Paper, TextField } from "@mui/material";
import "./login.css";
export default function Login() {
  const [log, isLog] = useState(true);

  return (
    <>
      <div className="main-container-box">
        {log ? (
          <>
            <h2> InstaChat</h2>
            <div className="login-container">
              <Paper>
                <TextField
                  label=" Username"
                  type="text"
                  fullWidth
                  required
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  required
                  margin="normal"
                />
                <Button fullWidth type="submit">
                  {" "}
                  Log In
                </Button>
              </Paper>
            </div>
          </>
        ) : (
          <>
            {" "}
            <Paper>
              <TextField
                label=" Username"
                type="text"
                fullWidth
                required
                margin="normal"
                variant="outlined"
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                margin="normal"
              />
              <Button fullWidth type="submit">
                {" "}
                Log In
              </Button>
            </Paper>
            <div className="register-container">
              <Paper>
                <TextField
                  label=" Username"
                  type="text"
                  fullWidth
                  required
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  required
                  margin="normal"
                />
                <Button fullWidth type="submit">
                  Register
                </Button>
              </Paper>
            </div>
          </>
        )}
      </div>
    </>
  );
}
