import React from "react";
import AddNote from "../../Components/AddNote/AddNote";
import Note from "../../Components/Note/Note"; // Make sure to import the Note component
import { GenshinAccount } from "../../Types/Genshin";
import LoadingPage from "../../Components/Loading/LoadingContent";
import { GenshinNote } from "../../Types/Note";

interface HomeProps {
  userData: GenshinAccount | undefined;
  loadingUserData: boolean;
  notes: GenshinNote[];
  addNote: (note: GenshinNote) => void;
}

const Home: React.FC<HomeProps> = ({ userData, loadingUserData, notes, addNote }) => {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-1 grid-rows-4 gap-4 ">
      {loadingUserData ? (
        <LoadingPage />
      ) : (
        <>
          <AddNote onSubmit={addNote} characters={userData ? userData.characters : []} />
          {notes.map((note, index) => (
            <Note key={index} note={note} />
          ))}
        </>
      )}
    </div>
  );
}

export default Home;
