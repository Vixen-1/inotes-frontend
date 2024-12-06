import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";
import secureLocalStorage from "react-secure-storage";
import image2 from "../../assets/image.jpg";

interface Note {
  _id: string;
  title: string;
  description: string;
  tag: string;
  date: string;
}

export default function Notes({
  notes,
  setNotes,
  fetchNotes,
  handleSaveEdit,
  handleDeleteNote,
}: {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  fetchNotes: () => void;
  handleSaveEdit: (note: Note) => void;
  handleDeleteNote: (id: string) => void;
}) {
  const token = secureLocalStorage.getItem("authToken");

  // Track which note is being edited
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  useEffect(() => {
    if (token) fetchNotes();
  }, [fetchNotes, token]);

  const formatDateAndTime = (isoString: string) => {
    const dateObj = new Date(isoString);

    // Format date as dd-mm-yyyy
    const date = dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // Format time as hh:mm:ss
    const time = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24-hour format
    });

    return { date, time };
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
        <Grid container marginTop={"40px"} spacing={3}>
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
                  <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                    <Typography
                      variant="caption"
                      color="primary"
                      sx={{ marginTop: "16px", display: "block" }}
                      contentEditable={editingNoteId === note._id}
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        setNotes((prevNotes: Note[]) => {
                          return prevNotes.map((prevNote) =>
                            prevNote._id === note._id
                              ? { ...prevNote, tag: e.target.textContent || "" }
                              : prevNote
                          );
                        })
                      }
                    >
                      #{note.tag}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ marginTop: "16px", display: "block" }}
                    >
                      {`Date: ${formatDateAndTime(note.date).date} Time: ${formatDateAndTime(note.date).time} `}
                    </Typography>
                  </Box>
                  <Typography
                    fontWeight="bold"
                    variant="h5"
                    marginY={2}
                    className="capitalize"
                    gutterBottom
                    contentEditable={editingNoteId === note._id}
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      setNotes((prevNotes) => {
                        return prevNotes.map((prevNote) =>
                          prevNote._id === note._id
                            ? { ...prevNote, title: e.target.textContent || "" }
                            : prevNote
                        );
                      })
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
                    contentEditable={editingNoteId === note._id}
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      setNotes((prevNotes) => {
                        return prevNotes.map((prevNote) =>
                          prevNote._id === note._id
                            ? { ...prevNote, description: e.target.textContent || "" }
                            : prevNote
                        );
                      })
                    }
                  >
                    {note.description}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {editingNoteId !== note._id ? (
                    <Button
                      size="small"
                      color="primary"
                      startIcon={<FontAwesomeIcon icon={faEdit} />}
                      onClick={() => setEditingNoteId(note._id)}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      color="primary"
                      startIcon={<FontAwesomeIcon icon={faFloppyDisk} />}
                      onClick={() => {
                        handleSaveEdit(note);
                        setEditingNoteId(null);
                      }}
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
      </Box>
    </Box>
  );
}
