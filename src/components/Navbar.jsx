import { useState } from 'react'; 
import { Link, NavLink, useNavigate } from 'react-router-dom'; 
import { APISource } from '../data/source-api'; 
import { FaHandsHelping } from 'react-icons/fa'; 
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { FaSpinner } from 'react-icons/fa';
import Snowfall from 'react-snowfall';
import PropTypes from 'prop-types';
export const Navbar = ({ isLoggedIn, onLogout, toggleTheme, isDarkMode }) => { 
    const [menuOpen, setMenuOpen] = useState(false);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // State untuk loading
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await APISource.deleteAuthentication();
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userId');
            onLogout();
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
      <header
        className={`fixed top-0 left-0 w-full ${
          isDarkMode
            ? "bg-gray-900 bg-opacity-80 backdrop-blur-md"
            : "bg-orange-500 bg-opacity-80 backdrop-blur-md"
        } shadow-lg z-50 transition-all duration-300`}
      >
        <nav className="container mx-auto flex items-center justify-between p-4">
        <Snowfall 
          color="#fff" 
          snowflakeCount={30} 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
          className="snowflake"
        />
          <Link className="flex items-center text-4xl font-bold text-white hover:text-yellow-400 transition-colors duration-300">
            <FaHandsHelping className="text-yellow-400 mr-2 transform transition-transform duration-300 hover:scale-110" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
              BantuLink
            </span>
          </Link>
    
          <div className="flex items-center space-x-4">
            <div
              className={`hamburger ${menuOpen ? "open" : ""} md:hidden cursor-pointer p-3 rounded-full transition-colors`}
              onClick={toggleMenu}
            >
              <div className="flex flex-col gap-1.5 relative w-6 h-5">
                <div
                  className={`w-6 h-0.5 ${isDarkMode ? "bg-white" : "bg-gray-800"} rounded-full absolute transition-all duration-300 ${menuOpen ? "top-2 rotate-45" : "top-0"}`}
                ></div>
                <div
                  className={`w-6 h-0.5 ${isDarkMode ? "bg-white" : "bg-gray-800"} rounded-full absolute top-2 transition-all duration-300 ${menuOpen ? "opacity-0 translate-x-2" : "opacity-100"}`}
                ></div>
                <div
                  className={`w-6 h-0.5 ${isDarkMode ? "bg-white" : "bg-gray-800"} rounded-full absolute transition-all duration-300 ${menuOpen ? "top-2 -rotate-45" : "top-4"}`}
                ></div>
              </div>
            </div>
    
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center p-2 rounded-full  transition-colors duration-300 ${isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-orange-300 hover:bg-orange-400"}`}
            >
              {isDarkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-300" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-800" />
              )}
            </button>
          </div>
    
          <ul
            className={`absolute md:static md:bg-transparent w-full md:w-auto transition-all left-0 duration-300 ease-in-out ${
              menuOpen ? "top-16 opacity-100 bg-slate-200 shadow-lg" : "top-[-200px] opacity-0"
            } md:flex md:opacity-100 md:top-0 md:items-center md:space-x-4`}
          >
            {!isLoggedIn ? (
              <>
                <li>
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      `block px-5 py-2 font-medium text-gray-800 rounded-lg md:text-white transition-all ${
                        isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    Beranda
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `block px-5 py-2 font-medium text-gray-800 rounded-lg md:text-white transition-all ${
                        isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    Tentang Kami
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `block px-5 py-2 font-medium text-gray-800 rounded-lg md:text-white transition-all ${
                        isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    Masuk
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/beranda"
                    className={({ isActive }) =>
                      `block px-5 py-2 font medium text-gray-800 rounded-lg md:text-white transition-all ${
                        isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    Beranda
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/requests/owner`}
                    className={({ isActive }) =>
                      `block px-5 py-2 font-medium text-gray-800 rounded-lg md:text-white transition-all ${
                        isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    Permintaan saya
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/donations/owner`}
                    className={({ isActive }) =>
                      `block px-5 py-2 font-medium text-gray-800 rounded-lg md:text-white transition-all ${
                        isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    Donasi saya
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/profile/${userId}`}
                    className={({ isActive }) =>
                      `block px-5 py-2 font-medium text-gray-800 rounded-lg md:text-white transition-all ${
                        isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    Profil
                  </NavLink>
                </li>
                <li className="flex items-center space-x-2">
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className={`block px-5 py-2 font-medium rounded-lg text-gray-100 transition-all ${
                      isDarkMode ? "hover:bg-red-600 hover:text-white" : "hover:bg-red-600 hover:text-white"
                    } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <FaSpinner className="animate-spin text-gray-500 text-3xl" />
                        Keluar...
                      </div>
                    ) : (
                      "Logout"
                    )}
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    );
      
};
Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired
};