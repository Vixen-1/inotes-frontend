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
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import image2 from "../../assets/image.jpg";

interface Note {
  _id: string;
  title: string;
  description: string;
  tag: string;
}

export default function Notes() {
  const [edit, setEdit] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note>({
    _id: "",
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
      setCurrentNote({ _id: "", title: "", description: "", tag: "" });
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleSaveEdit = async (note: Note) => {
    try {
      await axios.put(
        `http://localhost:5000/api/notes/updatenote/${note._id}`,
        note,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      alert("Note updated successfully!");
      setEdit(false);
      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  console.log("---notes", notes)
  const handleDeleteNote = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/deletenote/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setNotes((prev) => prev.filter((note) => note._id !== id));
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundImage: `url(${image2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        "::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            color: "rgba(208, 207, 208)",
            fontWeight: "bold",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.8)",
          }}
        >
          Notes Manager
        </Typography>

        <Grid container spacing={3}>
          {notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note._id}>
              <Card
                sx={{
                  height: "220px",
                  display: "flex",
                  marginBottom: "20px",
                  marginRight: "8px",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(208, 207, 208, 0.8)",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    fontWeight="bold"
                    variant="h6"
                    gutterBottom
                    contentEditable={edit}
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      setNotes((prevNotes) =>
                        prevNotes.map((prevNote) =>
                          prevNote._id === note._id
                            ? { ...prevNote, title: e.target.textContent || "" }
                            : prevNote
                        )
                      )
                    }
                  >
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
                    contentEditable={edit}
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      setNotes((prevNotes) =>
                        prevNotes.map((prevNote) =>
                          prevNote._id === note._id
                            ? {
                                ...prevNote,
                                description: e.target.textContent || "",
                              }
                            : prevNote
                        )
                      )
                    }
                  >
                    {note.description}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="primary"
                    sx={{ marginTop: "16px", display: "block" }}
                    contentEditable={edit}
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      setNotes((prevNotes) =>
                        prevNotes.map((prevNote) =>
                          prevNote._id === note._id
                            ? { ...prevNote, tag: e.target.textContent || "" }
                            : prevNote
                        )
                      )
                    }
                  >
                    #{note.tag}
                  </Typography>
                </CardContent>
                <CardActions>
                  {!edit ? (
                    <Button
                      size="small"
                      color="primary"
                      startIcon={<FontAwesomeIcon icon={faEdit} />}
                      onClick={() => setEdit(true)}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      color="primary"
                      startIcon={<FontAwesomeIcon icon={faEdit} />}
                      onClick={() => handleSaveEdit(note)}
                    >
                      Save
                    </Button>
                  )}
                  <Button
                    size="small"
                    color="error"
                    startIcon={<FontAwesomeIcon icon={faTrash} />}
                    onClick={() => handleDeleteNote(note._id)}
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
            backgroundColor: "rgba(208, 207, 208, 0.8)",
            padding: 4,
            margin: "auto",
            width: "50%",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            marginTop: "40px",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={"bold"}
            align="center"
            gutterBottom
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
        </Box>
      </Box>
    </Box>
  );
}
