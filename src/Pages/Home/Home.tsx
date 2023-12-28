import { useState } from "react";
import AddNote from "../../Components/AddNote/AddNote";
import { GenshinAccount } from "../../Types/Genshin";

interface HomeProps {
  userData: GenshinAccount | undefined;
}
const Home: React.FC<HomeProps> = ({ userData }) => {
  const [notes, setNotes] = useState<any[]>([]);

  const addNote = (newNote: any) => {
    setNotes([...notes, newNote]);
  };

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-1 grid-rows-4 gap-4 ">
      <AddNote 
      onSubmit={addNote} 
      characters={userData? userData.characters : []}/>
    </div>
  );
}

export default Home;
