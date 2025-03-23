import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/navbar/finalLogo.webp";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setIsScrolled(true) : setIsScrolled(false);
    };

    // Handle body overflow when menu is open
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  return (
    <div
      className={`fixed top-0 left-0 w-full transition-all duration-300 shadow-md z-50 py-4 ${
        isScrolled
          ? "bg-[#252527] shadow-lg"
          : "bg-transparent backdrop-blur-md"
      }`}
    >
      <div className="flex justify-between items-center px-6 font-quicksand text-white">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="lg:w-48 w-38 h-auto mr-2" />
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className="lg:hidden flex items-center gap-1 hover:text-gray-300 transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <FaTimes className="text-2xl transform transition-transform duration-300" />
          ) : (
            <FaBars className="text-xl transform transition-transform duration-300" />
          )}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* ... (Desktop menu items sama seperti sebelumnya) */}
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
                location.pathname === "/destination"
                  ? "text-[#FFA666] font-bold"
                  : ""
              }`}
            >
              Destination
            </Link>

            <Link
              to="/culture"
              className={`hover:text-gray-300 transition ${
                location.pathname === "/culture"
                  ? "text-[#FFA666] font-bold"
                  : ""
              }`}
            >
              Culture
            </Link>

            <Link
              to="/gallery"
              className={`hover:text-gray-300 transition ${
                location.pathname === "/gallery"
                  ? "text-[#FFA666] font-bold"
                  : ""
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
                <div className="absolute mt-4 w-40 bg-[#252527] text-white rounded-lg shadow-lg">
                  <Link
                    to="/contact-us"
                    className={`block px-4 py-2 hover:bg-orange-500 hover:text-white rounded-t-lg ${
                      location.pathname === "/contact-us"
                        ? "text-[#FFA666] font-bold"
                        : ""
                    }`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/join-us"
                    className={`block px-4 py-2 hover:bg-orange-500 hover:text-white rounded-b-lg ${
                      location.pathname === "/join-us"
                        ? "text-[#FFA666] font-bold"
                        : ""
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
              to="/sign-in"
              className="px-4 py-2 border border-[#FFA666] rounded-md hover:bg-[#FFA666] hover:text-black transition"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
            {/* Backdrop Blur */}

            {/* Mobile Menu Content */}
            <div
              className={`relative w-full h-screen transform transition-transform duration-300 ease-in-out shadow-xl ${
                mobileMenuOpen ? "translate-x-0" : "translate-x-full"
              } right-0 fixed`}
            >
              <div className="fixed inset-0 w-1/2 bg-black/40 backdrop-blur-xs" />
              <div className="p-6 w-1/2 h-full overflow-y-auto translate-x-0 fixed inset-y-0 right-0 bg-[#252527]">
                <div className="flex justify-end mb-8">
                  <button
                    className="hover:text-gray-300 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaTimes className="text-2xl" />
                  </button>
                </div>

                <ul className="space-y-6">
                  <li>
                    <Link
                      to="/"
                      className={`block py-2 hover:text-gray-300 ${
                        location.pathname === "/" && "text-[#FFA666] font-bold"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/destination"
                      className={`block py-2 hover:text-gray-300 ${
                        location.pathname === "/destination" &&
                        "text-[#FFA666] font-bold"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Destination
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/culture"
                      className={`block py-2 hover:text-gray-300 ${
                        location.pathname === "/culture" &&
                        "text-[#FFA666] font-bold"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Culture & History
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/gallery"
                      className={`block py-2 hover:text-gray-300 ${
                        location.pathname === "/gallery" &&
                        "text-[#FFA666] font-bold"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Gallery
                    </Link>
                  </li>

                  <li className="relative">
                    <button
                      className="flex items-center gap-2 w-full py-2"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <span>More</span>
                      <FaChevronDown
                        className={`text-sm transition-transform duration-200 ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {dropdownOpen && (
                      <div className="pl-4 mt-2 space-y-3">
                        <Link
                          to="/contact-us"
                          className={`block py-1 hover:text-gray-300 ${
                            location.pathname === "/contact-us" &&
                            "text-[#FFA666] font-bold"
                          }`}
                          onClick={() => {
                            setDropdownOpen(false);
                            setMobileMenuOpen(false);
                          }}
                        >
                          Contact Us
                        </Link>
                        <Link
                          to="/join-us"
                          className={`block py-1 hover:text-gray-300 ${
                            location.pathname === "/join-us" &&
                            "text-[#FFA666] font-bold"
                          }`}
                          onClick={() => {
                            setDropdownOpen(false);
                            setMobileMenuOpen(false);
                          }}
                        >
                          Join Us
                        </Link>
                      </div>
                    )}
                  </li>

                  <li>
                    <Link
                      to="/sign-in"
                      className="block w-full px-4 py-2 border border-[#FFA666] rounded-md hover:bg-[#FFA666] hover:text-black text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
