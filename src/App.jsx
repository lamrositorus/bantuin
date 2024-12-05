import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Footer from './components/pages/Footer'; // Corrected import (no curly braces)
import { About, Home, Login, Signup, Profile, Request, GetAllRequest, GetDetail } from './components/pages';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="w-full h-full bg-slate-100">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login onLogin={handleLogin} />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Request" element={<Request />} />
        <Route path="/getRequest/:id" element={<GetDetail />} />
        <Route path="/allRequest" element={<GetAllRequest />} />
        <Route path="/Profile/:userId" element={<Profile />} />
      </Routes>
      <Footer /> {/* Moved outside of Routes */}
    </div>
  );
};

export default App;