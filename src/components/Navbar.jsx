import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = ({ isLoggedIn, onLogout }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const userId = localStorage.getItem('userId');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        if (onLogout) onLogout();
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-orange-400 to-orange-500 backdrop-blur-md shadow-lg z-50 transition-all duration-300">
            <nav className="container mx-auto flex items-center justify-between p-3">
                <Link className="text-3xl font-extrabold text-white hover:scale-105 transition-transform" to="/">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-100">
                        BantuLink
                    </span>
                </Link>
                
                <div className={`hamburger ${menuOpen ? 'open' : ''} md:hidden cursor-pointer hover:opacity-80`} onClick={toggleMenu}>
                    <div className="w-7 h-0.5 bg-white mb-1.5 rounded-full transition-all"></div>
                    <div className="w-7 h-0.5 bg-white mb-1.5 rounded-full transition-all"></div>
                    <div className="w-7 h-0.5 bg-white rounded-full transition-all"></div>
                </div>

                <ul className={`absolute md:static md:bg-transparent w-full md:w-auto transition-all left-0 duration-300 ease-in-out 
                    ${menuOpen ? 'top-16 opacity-100 bg-orange-400/95' : 'top-[-200px] opacity-0'} 
                    md:flex md:opacity-100 md:top-0 md:items-center gap-2`}>
                    {!isLoggedIn ? (
                        <li>
                            <NavLink to="/login" 
                                className="block px-6 py-2 text-white font-semibold rounded-full hover:bg-white/20 transition-all">
                                Login
                            </NavLink>
                        </li>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/" 
                                    className="block px-6 py-2 text-white font-semibold rounded-full hover:bg-white/20 transition-all">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about"
                                    className="block px-6 py-2 text-white font-semibold rounded-full hover:bg-white/20 transition-all">
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/profile/${userId}`}
                                    className="block px-6 py-2 text-white font-semibold rounded-full hover:bg-white/20 transition-all">
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/login" onClick={handleLogout}
                                    className="block px-6 py-2 text-white font-semibold rounded-full hover:bg-red-500/80 transition-all">
                                    Logout
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};
