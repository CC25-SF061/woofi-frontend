import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/navbar/finalLogo.webp";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../stores/userReducer";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);
  useEffect(() => {
    if (user.id) {
      //ubah state login
      //ini cuman contoh bisa dipake di component juga
    }
  }, [user]);

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

            <Link
              to="/contact-us"
              className={`hover:text-gray-300 transition ${
                location.pathname === "/contact-us"
                  ? "text-[#FFA666] font-bold"
                  : ""
              }`}
            >
              Contact Us
            </Link>

            {!user.id ? (
              <Link
                to="/sign-in"
                className="px-4 py-2 border border-[#FFA666] rounded-md hover:bg-[#FFA666] hover:text-black transition"
              >
                Sign In
              </Link>
            ) : (
              <Link to="/profile" className="flex items-center gap-2">
                <img
                  src={user.profileImage || "/default-avatar.png"} // Gunakan gambar default jika tidak ada
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
              </Link>
            )}
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
                      className={`block hover:text-gray-300 ${
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
                      className={`block hover:text-gray-300 ${
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
                      className={`block hover:text-gray-300 ${
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
                      className={`block hover:text-gray-300 ${
                        location.pathname === "/gallery" &&
                        "text-[#FFA666] font-bold"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Gallery
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/contact-us"
                      className={`hover:text-gray-300 transition ${
                        location.pathname === "/contact-us"
                          ? "text-[#FFA666] font-bold"
                          : ""
                      }`}
                    >
                      Contact Us
                    </Link>
                  </li>

                  {!user.id ? (
                    <Link
                      to="/sign-in"
                      className="block w-full px-4 py-2 border border-[#FFA666] rounded-md hover:bg-[#FFA666] hover:text-black text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  ) : (
                    <Link to="/profile" className="flex items-center gap-2">
                      <img
                        src={user.profileImage || "/default-avatar.png"} // Gunakan gambar default jika tidak ada
                        alt="Profile"
                        className="w-8 h-8 rounded-full border border-gray-300"
                      />
                    </Link>
                  )}
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
