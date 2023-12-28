import { useState } from "react";
import AddNote from "../../Components/AddNote/AddNote";

function Home() {
  const [notes, setNotes] = useState<any[]>([]);

  const addNote = (newNote: any) => {
    setNotes([...notes, newNote]);
  };

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-1 grid-rows-4 gap-4 ">
      <AddNote onSubmit={addNote}/>
    </div>
  );
}

export default Home;
