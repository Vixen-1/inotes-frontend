import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import "../assets/styles/common.css";
import image from "../assets/main-bg.jpg";
import axios from "axios";
import Alert from "@mui/material/Alert";
import "../App.css";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { Snackbar } from "@mui/material";
interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };


  const handleSignup = async () => {
    try {
      const response = await axios.post(
        `/api/auth/createuser`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.authToken) {
        secureLocalStorage.setItem("authToken", response.data.authToken);
        setError(null);
        setSnackbar({
          open: true,
          message: `Signup successful`,
          severity: "success",
        });
        navigate("/mainpage");
        
      }
      if (response.data.error) {
        setError(response.data.error);
        setSnackbar({
          open: true,
          message: `${error}`,
          severity: "error",
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error);
        setSnackbar({
          open: true,
          message: `${error}`,
          severity: "error",
        });
        console.log(error);
      } else {
        setError("An unexpected error occurred.");
        setSnackbar({
          open: true,
          message: `${error}`,
          severity: "error",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignup();
    
  };

  const handleGoogleLogin = () => {
    window.location.href = "/auth/google";
  };

  const handleFacebookLogin = () => {
    window.location.href = "/auth/facebook";
  };

  return (
    <Stack>
      <img alt="nature" className="bg-img" src={image} />
      <Box
        minHeight={"100vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box className="signup-box">
          <Typography
            variant="h4"
            color={"white"}
            textAlign={"center"}
            paddingTop={3}
          >
            Signup
          </Typography>
          <form onSubmit={handleSubmit} className="m-10">
            <Box>
              <Box>
                <Typography className="label">Name</Typography>
                <TextField
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input color-white background-white"
                />
              </Box>
              <Box className="pt-2">
                <Typography className="label">Email</Typography>
                <TextField
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </Box>
              <Box className="pt-2">
                <Typography className="label">Password</Typography>
                <TextField
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </Box>
            </Box>
            <Box className="submit-button">
              <button type="submit">Signup</button>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              gap={10}
              justifyContent={"center"}
            >
              <FcGoogle
                className="font-bold cursor-pointer text-2xl"
                onClick={handleGoogleLogin}
              />
              <SiFacebook
                className="bottom-link text-2xl"
                onClick={handleFacebookLogin}
              />
            </Box>
            <Box className="bottom">
              Already have an account?{" "}
              <span className="bottom-link" onClick={() => navigate("/login")}>
                Login
              </span>
              .
            </Box>
          </form>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Signup;
