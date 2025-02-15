import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import "../assets/styles/common.css";
import { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import image from "../assets/main-bg.jpg";
import { Box, Stack, TextField, Typography } from "@mui/material";
import "../App.css";
// import { FcGoogle } from "react-icons/fc";
// import { SiFacebook } from "react-icons/si";
import { Snackbar, Alert } from "@mui/material";
import Loader from "../components/Loader";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
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

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255,255,255, 0.6) ",
            height: "50px",
            borderRadius: "8px",
          },
        },
      },
      // MuiOutlinedInput: {
      //   styleOverrides: {
      //     root: {
      //       "& fieldset": {
      //         borderColor: "green",
      //       },
      //       "&:hover fieldset": {
      //         borderColor: "blue",
      //       },
      //       "&.Mui-focused fieldset": {
      //         borderColor: "red",
      //       },
      //     },
      //   },
      // },
    },
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://todo-cloudy.onrender.com/api/auth/login',
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
          message: `Login Successful`,
          severity: "success",
        });
        setError(null);
        navigate("/mainpage");
      }
      if (response.data.error) {
        await setError(response.data.error);
        setSnackbar({
          open: true,
          message: `${error}`,
          severity: "error",
        });
        // navigate("/errorpage");
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
    }finally{
      setLoading(false);
    }
  };

  // const handleGoogleLogin = () => {
  //   window.location.href = "/auth/google";
  // };

  // const handleFacebookLogin = () => {
  //   window.location.href = "/auth/facebook";
  // };

  return (
    <Stack className="signup">
      <img alt="nature" className="bg-img" src={image} />
      <Box
        minHeight={"100vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box className="signup-box">
          <Typography
            color={"white"}
            fontWeight={'bold'}
            variant="h4"
            textAlign={"center"}
            paddingTop={3}
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit} className="form m-10">
          <ThemeProvider theme={theme}>
            <Box display={'flex'} flexDirection={'column'} gap={2} >
              <Box>
                <Typography className="label Themed TextField">Email</Typography>
                <TextField
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-login text-white"
                />
              </Box>
              <Box>
                <Typography className="label Themed TextField pt-4">Password</Typography>
                <TextField
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-login text-white"
                />
              </Box>
            </Box>
            </ThemeProvider>
            {loading? <Box className="pt-5"><Loader /></Box> : <Box className="submit-button mt-10">
              <button type="submit">Login</button>
            </Box>}
          </form>

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
            Don't have an account?{" "}
            <span className="bottom-link" onClick={() => navigate("/Signup")}>
              Signup
            </span>
            .
          </Box>
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

export default Login;
