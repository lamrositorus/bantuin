// components/pages/Footer.jsx
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
            <div className="container mx-auto text-center">
                <h2 className="text-lg font-semibold mb-4">Stay Connected</h2>
                <p className="mb-4">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="#" aria-label="Facebook" className="text-white hover:text-gray-400 transition duration-200">
                        <BsFacebook className="w-8 h-8" />
                    </a>
                    <a href="#" aria-label="Instagram" className="text-white hover:text-gray-400 transition duration-200">
                        <BsInstagram className="w-8 h-8" />
                    </a>
                    <a href="#" aria-label="Twitter" className="text-white hover:text-gray-400 transition duration-200">
                        <BsTwitter className="w-8 h-8" />
                    </a>
                    <a href="#" aria-label="GitHub" className="text-white hover:text-gray-400 transition duration-200">
                        <BsGithub className="w-8 h-8" />
                    </a>
                </div>
                <div className="mt-4">
                    <a href="/privacy" className="text-gray-400 hover:text-gray-300 mx-2">Privacy Policy</a>
                    <a href="/terms" className="text-gray-400 hover:text-gray-300 mx-2">Terms of Service</a>
                </div>
                <div className="mt-4">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-200">
                        Subscribe to our Newsletter
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;