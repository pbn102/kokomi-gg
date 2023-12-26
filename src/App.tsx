import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/NavBar';
import Home from './Pages/Home/Home';
import Characters from './Pages/Characters/Characters';
import Info from './Pages/Info/Info';
import { useState, useEffect } from 'react';

const App = () => {
  const getSystemThemePreference = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  
  const [themePreference, setThemePreference] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? JSON.parse(storedTheme) : getSystemThemePreference();
  });
  
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(themePreference));
  }, [themePreference]);

  return (
    <BrowserRouter>
      <Navbar
        themePreference={themePreference}
        setThemePreference={setThemePreference} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters themePreference={themePreference}/>} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
