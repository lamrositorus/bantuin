// components/pages/Footer.jsx
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
            <div className="container mx-auto text-center">
                <h2 className="text-lg font-semibold mb-4">Stay Connected</h2>
                <p className="mb-4">&copy; {new Date().getFullYear()} BantuLink. All rights reserved.</p>
                <p className="mb-4">Join us in making a difference in our community!</p>
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="https://facebook.com/yourpage" aria-label="Facebook" className="text-white hover:text-gray-400 transition duration-200">
                        <BsFacebook className="w-8 h-8" />
                    </a>
                    <a href="https://instagram.com/yourpage" aria-label="Instagram" className="text-white hover:text-gray-400 transition duration-200">
                        <BsInstagram className="w-8 h-8" />
                    </a>
                    <a href="https://twitter.com/yourpage" aria-label="Twitter" className="text-white hover:text-gray-400 transition duration-200">
                        <BsTwitter className="w-8 h-8" />
                    </a>
                    <a href="https://github.com/yourpage" aria-label="GitHub" className="text-white hover:text-gray-400 transition duration-200">
                        <BsGithub className="w-8 h-8" />
                    </a>
                </div>
                <div className="mt-4">
                    <a href="/get-involved" className="text-gray-400 hover:text-gray-300 mx-2">Get Involved</a>
                    <a href="/volunteer" className="text-gray-400 hover:text-gray-300 mx-2">Volunteer Opportunities</a>
                    <a href="/donate" className="text-gray-400 hover:text-gray-300 mx-2">Donate</a>
                    <a href="/contact" className="text-gray-400 hover:text-gray-300 mx-2">Contact Us</a>
                </div>
                <div className="mt-4">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-200">
                        Join Our Community
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;