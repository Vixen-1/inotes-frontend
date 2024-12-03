import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Stack,
  Container,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import image2 from "../../assets/image.jpg";

interface Note {
  id: string;
  title: string;
  description: string;
  tag: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note>({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const token = secureLocalStorage.getItem("authToken");

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/notes/fetchallnotes",
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    if (token) fetchNotes();
  }, [token]);

  const handleAddNote = async () => {
    if (!currentNote.title || !currentNote.description || !currentNote.tag) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/notes/addnote",
        currentNote,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      setNotes((prev) => [...prev, response.data.note]);
      setCurrentNote({ id: "", title: "", description: "", tag: "" });
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleSaveEdit = async (note: Note) => {
    try {
      await axios.put(
        `http://localhost:5000/api/notes/updatenote/${note.id}`,
        note,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      alert("Note updated successfully!");
      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/deletenote/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setNotes((prev) => prev.filter((note) => note.id !== id));
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <Stack
      className="relative block h-screen w-screen py-4"
      sx={{
        overflow: "hidden",
        backgroundImage: `url(${image2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 0,
        }}
      />
      <Container
        sx={{
          position: "relative",
          zIndex: 1,
          paddingY: 4,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 4,
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600, color: "#2c3e50" }}
        >
          Notes Manager
        </Typography>

        <Grid container spacing={3} sx={{ marginY: 4 }}>
          {notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <Card
                sx={{
                  height: "220px",
                  marginBottom: '20px',
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "8px 8px 16px rgba(0, 0, 0.1, 0.2)",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                  backgroundColor: "#ffffff",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {note.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {note.description}
                  </Typography>
                  <Typography variant="caption" color="primary">
                    #{note.tag}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    startIcon={<FontAwesomeIcon icon={faEdit} />}
                    onClick={() => handleSaveEdit(note)}
                  >
                    Save
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<FontAwesomeIcon icon={faTrash} />}
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            margin: 'auto',
            width: '50%',
            padding: 2,
            backgroundColor: "#f9f9f9",
            borderRadius: 4,
            boxShadow: "4px 8px 16px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
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
              >
                Add Note
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Stack>
  );
}
