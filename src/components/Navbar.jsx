import { useState } from 'react'; 
import { Link, NavLink, useNavigate } from 'react-router-dom'; 
import { APISource } from '../data/source-api'; 
import { FaHandsHelping } from 'react-icons/fa'; 
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export const Navbar = ({ isLoggedIn, onLogout, toggleTheme, isDarkMode }) => { 
    const [menuOpen, setMenuOpen] = useState(false);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
        const [isLoading, setIsLoading] = useState(false); // State untuk loading

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = async () => {
        try {
            await APISource.deleteAuthentication();
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userId');
            onLogout();
            navigate('/login')
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    if (!isLoggedIn) {
        return null;
    }

    return (
        <header className={`fixed top-0 left-0 w-full ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-orange-400 to-orange-600'} backdrop-blur-md shadow-lg z-50 transition-all duration-300`}>
            <nav className="container mx-auto flex items-center justify-between p-4">
                <Link className="flex items-center text-3xl font-extrabold text-white hover:text-yellow-300 transition-colors duration-300" to="/home">
                    <FaHandsHelping className="text-yellow-300 mr-2 transform transition-transform duration-300 hover:scale-110" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
                        BantuLink
                    </span>
                </Link>

                <div
                    className={`hamburger ${menuOpen ? 'open' : ''} md:hidden cursor-pointer p-3 rounded-full  transition-colors`}
                    onClick={toggleMenu}
                >
                    <div className="flex flex-col gap-1.5 relative w-6 h-5">
                        <div className={`w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-700'} rounded-full absolute transition-all duration-300 ${menuOpen ? 'top-2 rotate-45' : 'top-0'}`}></div>
                        <div className={`w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-700'} rounded-full absolute top-2 transition-all duration-300 ${menuOpen ? 'opacity-0 translate-x-2' : 'opacity-100'}`}></div>
                        <div className={`w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-700'} rounded-full absolute transition-all duration-300 ${menuOpen ? 'top-2 -rotate-45' : 'top-4'}`}></div>
                    </div>
                </div>

                <button onClick={toggleTheme} className={`flex items-center justify-center p-2 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`}>
                    {isDarkMode ? (
                        <SunIcon className="h-6 w-6 text-yellow-300" />
                    ) : (
                        <MoonIcon className="h-6 w-6 text-gray-800" />
                    )}
                </button>

                <ul
    className={`absolute md:static md:bg-transparent w-full md:w-auto transition-all left-0 duration-300 ease-in-out ${
        menuOpen ? 'top-16 opacity-100 bg-slate-200 shadow-lg' : 'top-[-200px] opacity-0'
    } md:flex md:opacity-100 md:top-0 md:items-center md:space-x-2`}
>
    <li>
        <NavLink
            to="/home"
            className={({ isActive }) =>
                `block px-5 py-2 font-medium rounded-lg transition-all ${
                    isActive
                        ? `${isDarkMode ? 'bg-gray-700 text-white' : 'bg-yellow-50 text-orange-500'}`
                        : `${isDarkMode ? 'text-gray-700 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-yellow-50 hover:text-orange-500'}`
                }`
            }
        >
            Home
        </NavLink>
    </li>
    <li>
        <NavLink
            to="/allrequest"
            className={({ isActive }) =>
                `block px-5 py-2 font-medium rounded-lg transition-all ${
                    isActive
                        ? `${isDarkMode ? 'bg-gray-700 text-white' : 'bg-yellow-50 text-orange-500'}`
                        : `${isDarkMode ? 'text-gray-700 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-yellow-50 hover:text-orange-500'}`
                }`
            }
        >
            All Requests
        </NavLink>
    </li>
    <li>
        <NavLink
            to={`/profile/${userId}`}
            className={({ isActive }) =>
                `block px-5 py-2 font-medium rounded-lg transition-all ${
                    isActive
                        ? `${isDarkMode ? 'bg-gray-700 text-white' : 'bg-yellow-50 text-orange-500'}`
                        : `${isDarkMode ? 'text-gray-700 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-yellow-50 hover:text-orange-500'}`
                }`
            }
        >
            Profile
        </NavLink>
    </li>
    <li>
    <button
            onClick={handleLogout}
            disabled={isLoading} // Disable tombol saat loading
            className={`block px-5 py-2 font-medium rounded-lg w-full text-left transition-all ${
                isDarkMode
                    ? 'text-gray-700 hover:bg-red-500 text-white '
                    : 'text-gray-700  hover:bg-red-500 text-white'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`} // Gaya tombol saat disable
        >
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <span className="loader"></span> {/* Tambahkan loader */}
                    Logging out...
                </div>
            ) : (
                'Logout'
            )}
        </button>
    </li>
</ul>
            </nav>
        </header>
    );
};