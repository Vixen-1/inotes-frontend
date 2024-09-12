import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import "../shared/signup.css";
import image from "../assets/background.jpg";
import axios from "axios";
import Alert from "@mui/material/Alert";

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
        if(success){navigate("/notes")}
      }
      // if(response.data.error){
      //   setError(response.data.error);
      // }
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
  return (
    <div className="signup">
      <img
        alt="nature"
        className="absolute inset-0 object-cover w-full h-full"
        src={image}
      />
      <div className="content">
        <div className="signup-box">
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
          <h2 className="heading">Signup</h2>
          <form onSubmit={handleSubmit}  className="form ">
            <div>
              <label htmlFor="name" className="label ">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="submit-button">
              <button type="submit" >
                Signup
              </button>
            </div>

            <p className="bottom">
            Already have an account?{" "}
            <span
              className="bottom-link"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
            .
          </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
