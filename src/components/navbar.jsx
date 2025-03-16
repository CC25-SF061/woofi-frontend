import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import logo from "../assets/navbar/finalLogo.webp";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full transition-all duration-300 shadow-md z-50 py-2 ${
        isScrolled ? "bg-[#252527] shadow-lg" : "bg-transparent backdrop-blur-md"
      }`}
    >
      <div className="flex justify-between items-center px-6 font-quicksand text-white">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="w-60 h-auto mr-2" />
        </Link>

        {/* Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            to="/"
            className={`hover:text-gray-300 transition ${
              location.pathname === "/" ? "text-[#FFA666] font-bold" : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/destination"
            className={`hover:text-gray-300 transition ${
              location.pathname === "/destination" ? "text-[#FFA666] font-bold" : ""
            }`}
          >
            Destination
          </Link>

          <Link
            to="/cultureHistory"
            className={`hover:text-gray-300 transition ${
              location.pathname === "/culture-history" ? "text-[#FFA666] font-bold" : ""
            }`}
          >
            Culture & History
          </Link>

          <Link
            to="/gallery"
            className={`hover:text-gray-300 transition ${
              location.pathname === "/gallery" ? "text-[#FFA666] font-bold" : ""
            }`}
          >
            Gallery
          </Link>

          {/* Dropdown untuk Contact Us & Join Us */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 hover:text-gray-300 transition"
            >
              More <FaChevronDown className="text-sm" />
            </button>

            {dropdownOpen && (
              <div className="absolute mt-4 w-40 bg-white text-black rounded-b-lg shadow-lg">
                <Link
                  to="/contactUs"
                  className={`block px-4 py-2 hover:bg-gray-200 ${
                    location.pathname === "/contact-us" ? "bg-gray-300 font-bold" : ""
                  }`}
                  onClick={() => setDropdownOpen(false)}
                >
                  Contact Us
                </Link>
                <Link
                  to="/joinUs"
                  className={`block px-4 py-2 hover:bg-gray-200 ${
                    location.pathname === "/join-us" ? "bg-gray-300 font-bold" : ""
                  }`}
                  onClick={() => setDropdownOpen(false)}
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>

          {/* Sign In Button */}
          <Link
            to="/signIn"
            className="px-4 py-2 border border-[#FFA666] rounded-md hover:bg-[#FFA666] hover:text-black transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
