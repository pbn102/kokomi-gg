import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/NavBar';
import Characters from './Pages/Info/Info';
import Info from './Pages/Characters/Characters';
import Home from './Pages/Home/Home';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
