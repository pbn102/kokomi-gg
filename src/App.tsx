import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/NavBar";
import Home from "./Pages/Home/Home";
import Characters from "./Pages/Characters/Characters";
import Info from "./Pages/Info/Info";
import { useState, useEffect } from "react";
import { GenshinAccount } from "./Types/Genshin";
import { GenshinNote } from "./Types/Note";

const App = () => {
  const getSystemThemePreference = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const [themePreference, setThemePreference] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? JSON.parse(storedTheme) : getSystemThemePreference();
  });

  const [userData, setUserData] = useState<GenshinAccount | undefined>();
  const [loadingData, setLoadingData] = useState(true);
  const [notes, setNotes] = useState<GenshinNote[]>(() => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });

  useEffect(() => {
    // const storedUserData = localStorage.getItem("user");
    const storedUserData = undefined;

    if (storedUserData) {
      try {
        const parsedUserData: GenshinAccount = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }

    setLoadingData(false);
  }, []);

  // Save/update localStorage whenever preferences/data changes
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(themePreference));
  }, [themePreference]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [userData]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote: GenshinNote) => {
    setNotes([...notes, newNote]);
  }


  return (
    <BrowserRouter>
      <Navbar
        themePreference={themePreference}
        setThemePreference={setThemePreference} />
      <Routes>
        <Route path="/" element={<Home userData={userData} loadingUserData={loadingData} notes={notes} addNote={addNote} />} />
        <Route path="/characters" element={<Characters themePreference={themePreference} userData={userData} setUserData={setUserData} loadingUserData={loadingData} />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
