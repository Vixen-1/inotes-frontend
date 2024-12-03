import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import "../assets/styles/common.css";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import image from "../assets/ohho.jpg";
import image2 from "../assets/image.jpg";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface UserData {
  _id: string;
  name: string;
  email: string;
}

interface Note {
  _id: string;
  title: string;
  description: string;
  tag: string;
}

export default function Main({
  onMakeNotesClick,
  currentNote,
  setCurrentNote,
  handleAddNote,
}: {
  onMakeNotesClick: () => void;
  currentNote: Note;
  setCurrentNote: (note: Note) => void;
  handleAddNote: () => void;
}) {
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
            <Box
              className="text-data animate-slideInFromLeft"
              flex={1}
              padding={4}
            >
              <h2
                className="text-5xl cursor-default font-medium text-black tracking-widest capitalize min-h-16"
              >
                Welcome, {userData.name}!
              </h2>
              <h4
                className="text-2xl min-h-48 cursor-default md:text-4xl tracking-widest capitalize pt-12"
              >
                Let's organize your world, one note at a time!
              </h4>
              <Button
                variant="contained"
                color="primary"
                onClick={onMakeNotesClick}
                className="mt-8"
              >
                See Notes
              </Button>
            </Box>

            {/* Form Section */}
            <Stack className="relative block overflow-hidden animate-slideInFromRight" sx={{
                
                padding: 4,
                margin: "auto",
                width: "50%",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                marginTop: "40px",
                
              }}>
            
              <Box className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 z-0">
        <img alt="nature" className="w-full h-full object-cover" src={image2} />
      </Box>
              <Typography
                variant="h5"
                fontWeight={"bold"}
                align="center"
                gutterBottom
                sx={{color: "black"}}
              >
                Add a New Note
              </Typography>
              <form>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={currentNote.title}
                  onChange={(e) =>
                    setCurrentNote({ ...currentNote, title: e.target.value })
                  }
                  margin="normal"
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  value={currentNote.description}
                  onChange={(e) =>
                    setCurrentNote({ ...currentNote, description: e.target.value })
                  }
                  margin="normal"
                />
                <TextField
                  label="Tag"
                  variant="outlined"
                  fullWidth
                  value={currentNote.tag}
                  onChange={(e) =>
                    setCurrentNote({ ...currentNote, tag: e.target.value })
                  }
                  margin="normal"
                />
                <Box display="flex" justifyContent="center" mt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={handleAddNote}
                    sx={{ padding: "10px 20px", fontWeight: "bold" }}
                  >
                    Add Note
                  </Button>
                </Box>
              </form>
            
            </Stack>
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

