import { useNavigate } from "react-router-dom";
import image from "../assets/background.jpg";
import { Button } from "@mui/material";
export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <img
        alt="nature"
        className="absolute inset-0 object-cover w-full h-full"
        src={image}
      />
      <div className="content">
        <h1 className="text-content">Welcome to INotes</h1>
        <p className="sub-content">
          Your ultimate solution for managing notes effortlessly on the cloud.
        </p>
        <p className="sub-content">
          Organize Your Thoughts: Add, update, and delete notes seamlessly.
        </p>
        <p className="sub-content">
          Secure Access: Keep your notes private and accessible only to you.
        </p>
        <div className="lower-content">
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            className="text-xl m-4"
          >
            Get Started
          </Button>
          <p className="bottom-nav">
            To continue, please{" "}
            <span
              className="login-signup"
              onClick={() => navigate("/login")}
            >
              Log In
            </span>{" "}
            . Already a user?{" "}
            <span
              className="login-signup"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
            .
          </p>
          <p className="bottom-nav">
            Join us and take control of your notes today!
          </p>
        </div>
      </div>
    </div>
  );
}
