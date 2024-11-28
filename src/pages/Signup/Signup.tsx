import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import "../../assets/styles/common.css";
import image from "../../assets/main-bg.jpg";
import axios from "axios";
import Alert from "@mui/material/Alert";
import "../../App.css";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";

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
        "http://localhost:5000/api/auth/createuser",
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
        if (success) {
          navigate("/notes");
        }
      }
      if(response.data.error){
        setError(response.data.error);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error);
        console.log(error);
      } else {
        setError("An unexpected error occurred.");
      }
      setSuccess(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:5000/auth/facebook";
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
          {error && (
            <Alert severity="error" className="mt-2 text-sm">
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" className="mt-2 text-sm">
              Signup successful.
            </Alert>
          )}
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
    </Stack>
  );
};

export default Signup;
