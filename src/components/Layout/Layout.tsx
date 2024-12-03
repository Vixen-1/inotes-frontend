import Main from '../../pages/Main';
import Navbar from '../Navbar/Navbar';
import Notes from './Notes';
import { useRef } from 'react';

export default function Layout() {
  const notesRef = useRef<HTMLDivElement>(null);

  const scrollToNotes = () => {
    notesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  
  return (
    <div>
      <Navbar buttonName="Logout" />
      <Main onMakeNotesClick={scrollToNotes} />
      <div ref={notesRef}>
        <Notes />
      </div>
    </div>
  );
}
