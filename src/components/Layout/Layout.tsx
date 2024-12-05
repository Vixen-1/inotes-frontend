import Main from "../../pages/Main";
import Navbar from "../Navbar/Navbar";
import Notes from "./Notes";
import { useCallback, useEffect, useRef, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { Snackbar, Alert } from "@mui/material";
import { useAddNoteMutation, useDeleteNoteMutation, useGetAllDataQuery, useUpdateNoteMutation } from "../../redux/ApiSlice";

interface Note {
  _id: string;
  title: string;
  description: string;
  tag: string;
  date: string;
}

export default function Layout() {
  const notesRef = useRef<HTMLDivElement>(null);
  const scrollToNotes = () => {
    notesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [edit, setEdit] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note>({
    _id: "",
    title: "",
    description: "",
    tag: "",
    date: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const token = secureLocalStorage.getItem("authToken");

  const {data: apiResponse=[], error, refetch} = useGetAllDataQuery({});
  useEffect(()=>{
    if(apiResponse)
      setNotes(apiResponse)
    if(error)
      setSnackbar({
        open: true,
        message: "Error fetching notes",
        severity: "error",
      });
  }, [apiResponse,error])

  const [AddNoteMutation] = useAddNoteMutation();
  const handleAddNote = async () => {
    if (!currentNote.title || !currentNote.description || !currentNote.tag) {
      setSnackbar({
        open: true,
        message: "Please fill in all fields",
        severity: "warning",
      });
      return;
    }

    try {
      await AddNoteMutation({
        ...currentNote,
        headers: { authorization: `Bearer ${token}` },
      })
      setCurrentNote({ _id: "", title: "", description: "", tag: "", date: "" });
      refetch();
      setSnackbar({
        open: true,
        message: "Note added successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error adding note",
        severity: "error",
      });
      console.error("Error adding note:", error);
    }
  };

  const [updateNote] = useUpdateNoteMutation();
  const handleSaveEdit = async (note: Note) => {
    try {
      await updateNote({
        id: note._id,
        data: note,
        headers: { authorization: `Bearer ${token}` },
      });
      setSnackbar({
        open: true,
        message: "Note updated successfully!",
        severity: "success",
      });
      setEdit(false);
      refetch();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error saving note",
        severity: "error",
      });
      console.error("Error saving note:", error);
    }
  };

  const [deleteNote] = useDeleteNoteMutation();
  const handleDeleteNote = async (_id: string) => {
    try {
      await deleteNote({
        id: _id,
        headers: { authorization: `Bearer ${token}` },
      })
      refetch();
      setSnackbar({
        open: true,
        message: "Note deleted successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error deleting note",
        severity: "error",
      });
      console.error("Error deleting note:", error);
    }
  };
  const fetchNotes = useCallback(() => {
    refetch()
  }, [refetch]);

  return (
    <div>
      <Navbar buttonName="Logout" />
      <Main
        notes={notes}
        onMakeNotesClick={scrollToNotes}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
        handleAddNote={handleAddNote}
      />
      {(notes && notes.length > 0) && (
        <div ref={notesRef}>
          <Notes
            notes={notes}
            setNotes={setNotes}
            fetchNotes={fetchNotes}
            handleSaveEdit={handleSaveEdit}
            handleDeleteNote={handleDeleteNote}
            edit={edit}
            setEdit={setEdit}
          />
        </div>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
