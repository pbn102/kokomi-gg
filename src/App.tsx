import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/NavBar';
import Home from './Pages/Home/Home';
import Characters from './Pages/Characters/Characters';
import Info from './Pages/Info/Info';
import { useState, useEffect } from 'react';
import { GenshinAccount } from './Types/Genshin';

const App = () => {
  const getSystemThemePreference = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [themePreference, setThemePreference] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? JSON.parse(storedTheme) : getSystemThemePreference();
  });

  const [userData, setUserData] = useState<GenshinAccount | undefined>();
  const [loadingUserData, setLoadingUserData] = useState(true);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(themePreference));
  }, [themePreference]);

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    // const storedUserData = undefined;
    
    if (storedUserData) {
      try {
        const parsedUserData: GenshinAccount = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }

    setLoadingUserData(false);
  }, []);

  // Save/update userData in localStorage whenever it changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <BrowserRouter>
      <Navbar
        themePreference={themePreference}
        setThemePreference={setThemePreference} />
      <Routes>
        <Route path="/" element={<Home userData={userData} />} />
        <Route path="/characters" element={<Characters themePreference={themePreference} userData={userData} setUserData={setUserData} loadingUserData={loadingUserData}/>} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
