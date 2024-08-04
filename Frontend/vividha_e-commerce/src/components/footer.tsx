import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa"; // Import social media icons

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-5">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand and Description */}
        <div>
          <img
            src="/path-to-your-logo.png"
            alt="Brand Logo"
            className="w-24 mb-4"
          />
          <p className="text-gray-400">
            Vividha: Bringing you the best in fashion. Explore our diverse
            collection.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h5 className="text-xl font-semibold mb-4">Quick Links</h5>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-gray-300">
                Home
              </a>
            </li>
            {/* <li>
              <a href="/categories" className="hover:text-gray-300">
                Categories
              </a>
            </li> */}
            <li>
              <a href="/size-chart" className="hover:text-gray-300">
                Size Chart
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h5 className="text-xl font-semibold mb-4">Contact Us</h5>
          <ul className="space-y-2">
            <li>Email: support@vividha.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: 123 Fashion Street, City, Country</li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h5 className="text-xl font-semibold mb-4">Follow Us</h5>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="hover:text-gray-300">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" className="hover:text-gray-300">
              <FaWhatsapp size={24} />
            </a>
            <a
              href="https://www.instagram.com/vividha_thedesignstudio/"
              className="hover:text-gray-300"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        © 2024 Vividha. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
