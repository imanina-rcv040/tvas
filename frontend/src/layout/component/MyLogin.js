// import React Hook components
import { useState } from "react";
import PropTypes from "prop-types";

// import React Router component
import { useLocation } from "react-router-dom";

// import React Admin components
import { Form, required, TextInput, useLogin, useNotify } from "react-admin";

// import Material UI components
import {
  Button,
  Card,
  CardActions,
  CircularProgress,
  Box,
  IconButton,
} from "@mui/material";

// import Material UI icon components
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// import custom component
import { MyLogo } from "./MyLogo";

// import styling
import "../MyLayout.css";

export const MyLogin = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const notify = useNotify();
  const login = useLogin();
  const location = useLocation();

  const handleSubmit = (auth) => {
    setLoading(true);

    // set the username and password to the local storage
    const username = auth.username;
    const password = auth.password;
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    login(auth, location.state ? location.state.nextPathname : "/").catch(
      (error) => {
        setLoading(false);
        notify(
          typeof error === "string"
            ? error
            : typeof error === "undefined" || !error.message
            ? "ra.auth.sign_in_error"
            : error.message,
          {
            type: "error",
            messageArgs: {
              _:
                typeof error === "string"
                  ? error
                  : error && error.message
                  ? error.message
                  : undefined,
            },
          }
        );
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Box className="my-login-container">
        <Card className="my-login-card">
          <Box className="my-login-logo-container">
            <MyLogo width="300px" />
          </Box>
          <Box className="my-container-padding">
            <Box className="my-login-input">
              <TextInput
                autoFocus
                source="username"
                label={"Username"}
                disabled={loading}
                validate={[required("Please enter your username")]}
                fullWidth
              />
            </Box>
            <Box className="my-login-input">
              <TextInput
                source="password"
                label={"Password"}
                type={showPassword ? "text" : "password"}
                disabled={loading}
                validate={[required("Please enter your password")]}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
            </Box>
          </Box>
          <CardActions className="my-container-padding">
            <Button
              variant="contained"
              type="submit"
              color="warning"
              disabled={loading}
              fullWidth
              className="my-login-btn custom-login"
              startIcon={<LockOpenIcon />}
            >
              {loading && (
                <CircularProgress size={25} thickness={2} color="inherit" />
              )}
              {"Login"}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Form>
  );
};

MyLogin.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};
