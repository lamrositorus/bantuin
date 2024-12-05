import { useState } from 'react'; 
import { Link, NavLink } from 'react-router-dom'; 
import { APISource } from '../data/source-api'; 
import { FaHandsHelping } from 'react-icons/fa'; // Import an icon

export const Navbar = ({ isLoggedIn, onLogout }) => { 
    const [menuOpen, setMenuOpen] = useState(false);
    const userId = localStorage.getItem('userId');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = async () => {
        try {
            await APISource.deleteAuthentication();
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userId');
            if (onLogout) onLogout();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    if (!isLoggedIn) {
        return null;
    }

    return (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r backdrop-blur-md from-orange-400 to-orange-600 shadow-lg z-50 transition-all duration-300">
            <nav className="container mx-auto flex items-center justify-between p-4">
                <Link className="flex items-center text-3xl font-extrabold text-white hover:text-yellow-300 transition-colors duration-300" to="/home">
                    <FaHandsHelping className="text-yellow-300 mr-2 transform transition-transform duration-300 hover:scale-110" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
                        BantuLink
                    </span>
                </Link>

                <div
                    className={`hamburger ${menuOpen ? 'open' : ''} md:hidden cursor-pointer p-3 rounded-full hover:bg-yellow-50 transition-colors`}
                    onClick={toggleMenu}
                >
                    <div className="flex flex-col gap-1.5 relative w-6 h-5">
                        <div className={`w-6 h-0.5 bg-gray-700 rounded-full absolute transition-all duration-300 ${menuOpen ? 'top-2 rotate-45' : 'top-0'}`}></div>
                        <div className={`w-6 h-0.5 bg-gray-700 rounded-full absolute top-2 transition-all duration-300 ${menuOpen ? 'opacity-0 translate-x-2' : 'opacity-100'}`}></div>
                        <div className={`w-6 h-0.5 bg-gray-700 rounded-full absolute transition-all duration-300 ${menuOpen ? 'top-2 -rotate-45' : 'top-4'}`}></div>
                    </div>
                </div>

                <ul
                    className={`absolute md:static md:bg-transparent w-full md:w-auto transition-all left-0 duration-300 ease-in-out ${
                        menuOpen ? 'top-16 opacity-100 bg-white/95 shadow-lg' : 'top-[-200px] opacity-0'
                    } md:flex md:opacity-100 md:top-0 md:items-center md:space-x-2`}
                >
                    <li>
                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                `block px-5 py-2 font-medium rounded-lg transition-all ${
                                    isActive
                                        ? 'bg-yellow-50 text-orange-500'
                                        : 'text-gray-700 hover:bg-yellow-50 hover:text-orange-500'
                                }`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <Link
                            to="/allrequest"
                            className="block px-5 py-2 font-medium rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-orange-500 transition-all"
                        >
                            My Request
                        </Link>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `block px-5 py-2 font-medium rounded-lg transition-all ${
                                    isActive
                                        ? 'bg-yellow-50 text-orange-500'
                                        : 'text-gray-700 hover:bg-yellow-50 hover:text-orange-500'
                                }`
                            }
                        >
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={`/profile/${userId}`}
                            className={({ isActive }) =>
                                `block px-5 py-2 font-medium rounded-lg transition-all ${
                                    isActive
                                        ? 'bg-yellow-50 text-orange-500'
                                        : 'text-gray-700 hover:bg-yellow-50 hover:text-orange-500'
                                }`
                            }
                        >
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/login"
                            onClick={handleLogout}
                            className="block px-5 py-2 text-gray-700 font-medium rounded-lg hover:bg-red-50 hover:text-red-500 transition-all"
                        >
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;