import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa"; // Importing necessary icons
import vividhaLogo from "../../public/vite.svg"; // Path to your logo

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to check if a link is active
  const isActive = (path: string) => location.pathname === path;

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const toggleAuthMenu = () => {
    setIsAuthMenuOpen(!isAuthMenuOpen);
  };

  // Check if accessToken is present in local storage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    navigate("/"); // Redirect to home page after logout
    setIsAuthMenuOpen(false); // Close the menu after logout
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={vividhaLogo} alt="Vividha Logo" className="h-10 mr-3" />
          <span className="font-bold text-xl">Vividha</span>
        </a>

        {/* Main Navigation Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <a
            href="/"
            className={`block py-2 rounded ${
              isActive("/") ? "bg-gray-800" : "text-gray-300 hover:bg-gray-700"
            }`}
            aria-current="page"
          >
            Home
          </a>
          <a
            href="/categories"
            className={`block py-2 rounded ${
              isActive("/categories")
                ? "bg-gray-800"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            Categories
          </a>
          <a
            href="/size-chart"
            className={`block py-2 rounded ${
              isActive("/size-chart")
                ? "bg-gray-800"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            Size Chart
          </a>
        </div>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-300 hover:bg-gray-700 px-4 py-2 rounded"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/register")}
                className="flex items-center text-gray-800 bg-white hover:bg-gray-100 border border-gray-700 px-4 py-2 rounded transition"
              >
                <FaUserPlus className="mr-2" />
                Register
              </button>
              <button
                onClick={() => navigate("/login")}
                className="flex items-center text-gray-800 bg-white hover:bg-gray-100 border border-gray-700 px-4 py-2 rounded transition"
              >
                <FaSignInAlt className="mr-2" />
                Login
              </button>
            </>
          )}
        </div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            className="focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={toggleNavbar}
            aria-label="Toggle Menu"
          >
            {isNavbarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <button
            className="focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={toggleAuthMenu}
            aria-label="Toggle User Menu"
          >
            <FaUserCircle size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Main Menu with Smooth Transition */}
      <div
        className={`md:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${
          isNavbarOpen ? "max-h-screen" : "max-h-0"
        } bg-gray-700`}
      >
        <ul className="flex flex-col space-y-2 p-4">
          <li>
            <a
              href="/"
              className={`block py-2 rounded ${
                isActive("/")
                  ? "bg-gray-800"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
              onClick={toggleNavbar}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/categories"
              className={`block py-2 rounded ${
                isActive("/categories")
                  ? "bg-gray-800"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
              onClick={toggleNavbar}
            >
              Categories
            </a>
          </li>
          <li>
            <a
              href="/size-chart"
              className={`block py-2 rounded ${
                isActive("/size-chart")
                  ? "bg-gray-800"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
              onClick={toggleNavbar}
            >
              Size Chart
            </a>
          </li>
        </ul>
      </div>

      {/* Mobile Auth Menu */}
      <div
        className={`md:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${
          isAuthMenuOpen ? "max-h-screen" : "max-h-0"
        } bg-gray-700`}
      >
        <ul className="flex flex-col space-y-2 p-4">
          {isAuthenticated ? (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  toggleAuthMenu();
                }}
                className="flex items-center w-full text-left text-gray-300 hover:bg-gray-700 px-4 py-2 rounded"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <button
                  onClick={() => {
                    navigate("/register");
                    toggleAuthMenu();
                  }}
                  className="flex items-center w-full text-left text-gray-800 bg-white hover:bg-gray-100 border border-gray-700 px-4 py-2 rounded transition"
                >
                  <FaUserPlus className="mr-2" />
                  Register
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/login");
                    toggleAuthMenu();
                  }}
                  className="flex items-center w-full text-left text-gray-800 bg-white hover:bg-gray-100 border border-gray-700 px-4 py-2 rounded transition"
                >
                  <FaSignInAlt className="mr-2" />
                  Login
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
