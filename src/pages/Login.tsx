import { useNavigate } from "react-router-dom";
import "../assets/styles/common.css";
import { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import image from "../assets/main-bg.jpg";
import { Alert, Box, Stack, TextField, Typography } from "@mui/material";
import "../App.css";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.authToken) {
        secureLocalStorage.setItem("authToken", response.data.authToken);
        setSuccess(true);
        setError(null);
        navigate("/mainpage");
      }
      if (response.data.error) {
        setError(response.data.error);
        // navigate("/errorpage");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error);
        console.log(error);
      } else {
        setError("An unexpected error occurred.");
      }
      setSuccess(false);
      // navigate("/errorpage");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:5000/auth/facebook";
  };

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
          {error && (
            <Alert severity="error" className="">
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" className="mt-2 text-sm">
              Login successful.
            </Alert>
          )}
          <Typography
            color={"white"}
            variant="h4"
            textAlign={"center"}
            paddingTop={3}
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit} className="form m-10">
            <Box>
              <Box>
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
              <Box>
                <Typography className="label pt-4">Password</Typography>
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
            <Box className="submit-button mt-6">
              <button type="submit">Login</button>
            </Box>
          </form>

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
            Don't have an account?{" "}
            <span className="bottom-link" onClick={() => navigate("/Signup")}>
              Signup
            </span>
            .
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default Login;
