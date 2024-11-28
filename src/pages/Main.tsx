import { Box, Stack, Typography } from "@mui/material";
import "../assets/styles/common.css";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import image from '../assets/ohho.jpg'
import '../App.css'
export default function Main() {
  const token = secureLocalStorage.getItem("authToken");
  const [userData, setUserData] = useState([]);

  const fetchUser = async () => {
    const url = `http://localhost:5000/auth/getuser`;
    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  console.log(userData)
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <Stack className="main-page">
       <img
        alt="nature"
        className="bg-img"
        src={image}
      />
      <Box>
        <Typography variant="h1">Hello user</Typography>
      </Box>
    </Stack>
  );
}
