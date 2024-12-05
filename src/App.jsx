import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/pages/Footer';
import { About, Home, Login, Signup, Profile, Request, GetAllRequest, GetDetail } from './components/pages';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  const toggleTheme = () => setIsDarkMode(prevMode => !prevMode);

  return (
    <div className={`w-full h-full ${isDarkMode ? 'bg-gray-900' : 'bg-slate-100'}`}>
      <Navbar isLoggedIn={isLoggedIn} onLogout={logout} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login onLogin={login} isDarkMode={isDarkMode} />} />
        <Route path="/home" element={<Home isDarkMode={isDarkMode} />} />
        <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
        <Route path="/login" element={<Login onLogin={login} isDarkMode={isDarkMode} />} />
        <Route path="/signup" element={<Signup isDarkMode={isDarkMode} />} />
        <Route path="/request" element={<Request isDarkMode={isDarkMode} />} />
        <Route path="/getRequest/:id" element={<GetDetail isDarkMode={isDarkMode} />} />
        <Route path="/allRequest" element={<GetAllRequest isDarkMode={isDarkMode} />} />
        <Route path="/profile/:userId" element={<Profile isDarkMode={isDarkMode} />} />
      </Routes>
      {isLoggedIn && <Footer isDarkMode={isDarkMode} />}
    </div>
  );
};

export default App;