import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import "../assets/styles/common.css";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import image from "../assets/ohho.jpg";
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
  date: string;
}

export default function Main({
  notes,
  onMakeNotesClick,
  currentNote,
  setCurrentNote,
  handleAddNote,
}: {
  notes: Note[];
  onMakeNotesClick: () => void;
  currentNote: Note;
  setCurrentNote: (note: Note) => void;
  handleAddNote: () => void;
}) {
  const navigate = useNavigate();
  const token = secureLocalStorage.getItem("authToken");
  const [userData, setUserData] = useState<UserData | null>(null);
  
  const url = `https://inotes-backend-khaki/api/auth/getuser`;

  useEffect(() => {
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
    if (token) {
      fetchUser();
    }
  }, [navigate, token, url]);

  console.log(notes);
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    // tag: false,
  });

  const validateForm = () => {
    const newErrors = {
      title: currentNote.title === "",
      description: currentNote.description === "",
      // tag: currentNote.tag === "",
    };
    setErrors(newErrors);

    // Check if there are any errors
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleAddNote();
    }
  };
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
              <h2 className="text-5xl cursor-default font-medium text-black tracking-widest capitalize min-h-50">
                Welcome, {userData.name}!
              </h2>
              <h4 className="text-2xl min-h-48 cursor-default md:text-4xl tracking-widest capitalize pt-12">
                Let's organize your world, one note at a time!
              </h4>
              {notes && notes.length > 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onMakeNotesClick}
                  className="mt-8"
                >
                  See Notes
                </Button>
              )}
            </Box>

            {/* Form Section */}
            <Stack
              className="relative block overflow-hidden animate-slideInFromRight"
              sx={{
                padding: 4,
                margin: "auto",
                marginRight: "12px",
                marginBottom: "10px",
                width: "50%",
                borderRadius: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                marginTop: "40px",
                transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
                  },
              }}
            >
              
              <Typography
                variant="h5"
                fontWeight={"bold"}
                align="center"
                gutterBottom
                sx={{ color:'rgba(0, 0, 0)' }}
              >
                Add a New Note
              </Typography>
              <form>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  gap={4}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography paddingRight={2} fontWeight={"bold"} fontSize={20}>
                    Title
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={currentNote.title}
                    onChange={(e) =>
                      setCurrentNote({ ...currentNote, title: e.target.value })
                    }
                    className="input"
                    error={errors.title}
            helperText={errors.title ? "Title is required." : ""}
                  />
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  gap={4}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography paddingRight={4.5} fontWeight={"bold"} fontSize={20}>
                    Description
                  </Typography>
                  <TextField
                    className="input-desc"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    value={currentNote.description}
                    onChange={(e) =>
                      setCurrentNote({
                        ...currentNote,
                        description: e.target.value,
                      })
                    }
                    error={errors.description}
            helperText={errors.description ? "Description is required." : ""}
                    margin="normal"
                  />
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  gap={4}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography paddingRight={3} fontWeight={"bold"} fontSize={20}>
                    Tag
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={currentNote.tag}
                    onChange={(e) =>
                      setCurrentNote({ ...currentNote, tag: e.target.value })
                    }
                    margin="normal"
                    className="input"
                  />
                </Box>
                <Box display="flex" justifyContent="center" mt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={handleSubmit}
                    sx={{ padding: "10px 20px", fontWeight: "bold" }}
                  >
                    Add Note
                  </Button>
                </Box>
              </form>
            </Stack>
          </Box>
        ) : (
          <Box className="flex flex-col gap-6 justify-center tracking-widest animate-pulse">
            <Typography variant="h5" color={'black'} fontWeight={'bold'} className="bottom-link font-bold text-white drop-shadow-lg">Authentication failed!</Typography>
            <Box className="bottom text-black font-bold">
            Go back to Home page {" "}
            <Button variant="contained" className="bottom-link" onClick={() => navigate("/")}>
              Go Back
            </Button>
          </Box>
          </Box>
        )}
      </Box>
    </Stack>
  );
}
