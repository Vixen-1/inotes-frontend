import { Box, Button, Stack, Typography } from "@mui/material";
import "../assets/styles/common.css";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import image from "../assets/ohho.jpg";
import image2 from "../assets/image.jpg";
import "../App.css";
import { useNavigate } from "react-router-dom";

interface UserData {
  _id: string;
  name: string;
  email: string;
}

export default function Main({ onMakeNotesClick }: { onMakeNotesClick: () => void }) {
  const navigate = useNavigate();
  const token = secureLocalStorage.getItem("authToken");
  const [userData, setUserData] = useState<UserData | null>(null);

  const url = `http://localhost:5000/api/auth/getuser`;

  const fetchUser = async () => {
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
      navigate("/errorpage");
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <Stack className="relative block h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <Box className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 z-0">
        <img alt="nature" className="w-full h-full object-cover" src={image} />
      </Box>

      {/* Main Content */}
      <Box className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        {userData ? (
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={4}
            className="relative w-11/12 max-w-5xl"
          >
            {/* Text Section */}
            <Box
              className="text-data"
              flex={1}
              padding={4}
            >
              <h2
                className="text-5xl cursor-default font-medium text-black tracking-widest animate-slideInFromLeft capitalize min-h-16"
              >
                Welcome, {userData.name}!
              </h2>
              <h4
                className="text-2xl min-h-48 cursor-default md:text-4xl tracking-widest capitalize animate-fadeIn pt-12"
              >
                Let's organize your world, one note at a time!
              </h4>
              <Button
              variant="contained"
              color="primary"
              onClick={onMakeNotesClick}
              className="mt-8"
            >
              Make Notes
            </Button>
            </Box>

            {/* Image Section */}
            <Box
              className="image-data animate-slideInFromRight"
              flex={1}
              sx={{
                backgroundImage: `url(${image2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "6px",
                height: "100%",
                aspectRatio: "4/3", // Optional for responsiveness
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
          </Box>
        ) : (
          <Typography className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg tracking-widest animate-pulse">
            Loading...
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
