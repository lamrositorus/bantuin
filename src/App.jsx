import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/pages/Footer';
import { About, Home, Login, Signup, Profile, Request, GetAllRequest, GetDetail, MyRequest, GetDetailMyRequest, GetRequestItem, DonationOwner, GetDonationDetail } from './components/pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaDonate } from 'react-icons/fa';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  <FaDonate style={{ color: '#f39c12', fontSize: '50px' }} />

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  const toggleTheme = () => setIsDarkMode(prevMode => !prevMode);

  return (
    <div className={`flex flex-col min-h-screen w-full ${isDarkMode ? 'bg-gray-900' : 'bg-slate-100'}`}>
      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} onLogout={logout} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

      {/* Konten Utama */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/home" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
          <Route path="/login" element={<Login onLogin={login} isDarkMode={isDarkMode} />} />
          <Route path="/signup" element={<Signup isDarkMode={isDarkMode} />} />
          <Route path="/request" element={<Request isDarkMode={isDarkMode} />} />
          <Route path="/requests/owner" element={<MyRequest isDarkMode={isDarkMode} />} />
          <Route path="/requests/items/:id" element={<GetRequestItem isDarkMode={isDarkMode} />} />
          {/* Separate routes for the two detail pages */}
          <Route path="/getDetailAllRequest/:id" element={<GetDetail isDarkMode={isDarkMode} />} />
          <Route path="/getDetailMyRequest/:id" element={<GetDetailMyRequest isDarkMode={isDarkMode} />} />
          <Route path="/beranda" element={<GetAllRequest isDarkMode={isDarkMode} />} />
          <Route path="/profile/:userId" element={<Profile isDarkMode={isDarkMode} />} />
          
          <Route path="/donations/owner" element={<DonationOwner isDarkMode={isDarkMode} />} />
          <Route path="/donations/:id" element={<GetDonationDetail isDarkMode={isDarkMode} />} />
          
        </Routes>
      </div>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} className="mt-auto" />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default App;
