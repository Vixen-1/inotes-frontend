import axios from "axios";
import Main from "../../pages/Main";
import Navbar from "../Navbar/Navbar";
import Notes from "./Notes";
import { useRef, useState } from "react";
import secureLocalStorage from "react-secure-storage";

interface Note {
  _id: string;
  title: string;
  description: string;
  tag: string;
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

      setNotes((prev) => [...prev, response.data]);
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
    <div>
      <Navbar buttonName="Logout" />
      <Main
        onMakeNotesClick={scrollToNotes}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
        handleAddNote={handleAddNote}
      />
      {/* Check if notes is not empty and render Notes component */}
      {/* {notes.length > 0 && ( */}
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
      {/* )} */}
    </div>
  );
}
