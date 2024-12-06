import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
// import { FcGoogle } from "react-icons/fc";
// import { SiFacebook } from "react-icons/si";
import image from "../assets/main-bg.jpg";
import Loader from "../components/Loader";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255,255,255, 0.6)",
            borderRadius: "8px",
            height: "50px",
          },
        },
      },
    },
  });
  const validateFields = () => {
    const newErrors = { name: "", email: "", password: "" };

    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must have minimum 3 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email.";
    }

    if (formData.password.trim().length < 5) {
      newErrors.password = "Password must contain a minimum of 5 characters.";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSignup = async () => {
    if (!validateFields()) return;
    setLoading(true)
    try {
      const response = await axios.post(
        "https://todo-cloudy.onrender.com/api/auth/createuser",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.authToken) {
        secureLocalStorage.setItem("authToken", response.data.authToken);
        setSnackbar({
          open: true,
          message: "Signup successful",
          severity: "success",
        });
        navigate("/mainpage");
        setError(null);
      } else if (response.status === 400 && response.data.error) {
        await setError(response.data.error)
        setSnackbar({
          open: true,
          message: `${error}`,
          severity: "error",
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        await setError(err.response.data.error);
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
    } finally{
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignup();
  };

  // const handleGoogleLogin = () => {
  //   window.location.href = "/auth/google";
  // };

  // const handleFacebookLogin = () => {
  //   window.location.href = "/auth/facebook";
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
          <Typography variant="h4" color={"white"} textAlign={"center"} fontWeight={'bold'} pt={3}>
            Signup
          </Typography>
          <form onSubmit={handleSubmit} className="m-8">
          <ThemeProvider theme={theme}>
            <Box display={'flex'} flexDirection={'column'} gap={2}>
              <Box>
                <Typography className="label">Name</Typography>
                <TextField
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  className="input-login Themed TextField"
                />
              </Box>
              <Box>
                <Typography className="label">Email</Typography>
                <TextField
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  className="input-login Themed TextField"
                />
              </Box>
              <Box>
                <Typography className="label">Password</Typography>
                <TextField
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  className="input-login Themed TextField"
                />
              </Box>
            </Box>
            </ThemeProvider>
            {loading?<Loader /> : <Box className="submit-button mt-6">
              <button type="submit">Signup</button>
            </Box>}
            {/* <Box
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
            </Box> */}
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
