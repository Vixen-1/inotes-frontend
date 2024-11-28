import { useNavigate } from "react-router-dom";
import image from "../../assets/main-bg.jpg";
import { Box, Button, Stack, Typography } from "@mui/material";
import "./home.css";
import "../../App.css";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Stack position={"relative"} height={"100vh"}>
      <img alt="nature" className="bg-img" src={image} />
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        className="content"
      >
        <Typography variant="h1" className="text-content">
          Welcome to INotes
        </Typography>
        <Box className="sub-content">
          <Box>
            Your ultimate solution for managing notes effortlessly on the cloud.
          </Box>
          <Box>
            Organize Your Thoughts: Add, update, and delete notes seamlessly.
          </Box>
          <Box>
            Secure Access: Keep your notes private and accessible only to you.
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          paddingTop={10}
          gap={1}
          className="lower-content"
        >
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            className="start-button "
          >
            Get Started
          </Button>
          <Box className="bottom-nav">
            To continue, please{" "}
            <span className="login-signup" onClick={() => navigate("/login")}>
              Log In
            </span>{" "}
            . Already a user?{" "}
            <span className="login-signup" onClick={() => navigate("/signup")}>
              Sign Up
            </span>
            .
          </Box>
          <p className="bottom-nav">
            Join us and take control of your notes today!
          </p>
        </Box>
      </Box>
    </Stack>
  );
}
