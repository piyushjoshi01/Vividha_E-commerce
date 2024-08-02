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
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
  const [isMobileCategoriesMenuOpen, setIsMobileCategoriesMenuOpen] =
    useState(false);
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

  const toggleCategoriesMenu = () => {
    setIsCategoriesMenuOpen(!isCategoriesMenuOpen);
  };

  const toggleMobileCategoriesMenu = () => {
    setIsMobileCategoriesMenuOpen(!isMobileCategoriesMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      event.target instanceof HTMLElement &&
      !event.target.closest(".categories-menu")
    ) {
      setIsCategoriesMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
          <div className="relative categories-menu">
            <button
              onClick={toggleCategoriesMenu}
              className={`block py-2 rounded ${
                isActive("/categories")
                  ? "bg-gray-800"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              Categories
            </button>
            {isCategoriesMenuOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-50">
                <a
                  href="/categories/mens"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Men's Clothing
                </a>
                <a
                  href="/womenCategory"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Women's Clothing
                </a>
                <a
                  href="/categories/kids"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Kids' Clothing
                </a>
                <a
                  href="/categories/accessories"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Accessories
                </a>
              </div>
            )}
          </div>
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
            <button
              onClick={toggleMobileCategoriesMenu}
              className="block py-2 text-left text-gray-300 hover:bg-gray-700 rounded"
            >
              Categories
            </button>
            {isMobileCategoriesMenuOpen && (
              <ul className="pl-4">
                <li>
                  <a
                    href="/categories/mens"
                    className="block py-2 hover:bg-gray-800 rounded"
                    onClick={toggleNavbar}
                  >
                    Men's Clothing
                  </a>
                </li>
                <li>
                  <a
                    href="/categories/womens"
                    className="block py-2 hover:bg-gray-800 rounded"
                    onClick={toggleNavbar}
                  >
                    Women's Clothing
                  </a>
                </li>
                <li>
                  <a
                    href="/categories/kids"
                    className="block py-2 hover:bg-gray-800 rounded"
                    onClick={toggleNavbar}
                  >
                    Kids' Clothing
                  </a>
                </li>
                <li>
                  <a
                    href="/categories/accessories"
                    className="block py-2 hover:bg-gray-800 rounded"
                    onClick={toggleNavbar}
                  >
                    Accessories
                  </a>
                </li>
              </ul>
            )}
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
