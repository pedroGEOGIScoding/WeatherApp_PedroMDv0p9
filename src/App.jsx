
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar.jsx';
import Weather from './pages/Weather.jsx';
import Map from './pages/Map.jsx';
import About from './pages/About.jsx';
import { Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 5 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Weather" element={<Weather />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </Container>   
   </>
  );
}

