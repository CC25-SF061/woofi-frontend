import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/navbar/finalLogo.webp";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../stores/userReducer";
import { AnimatePresence, motion } from "framer-motion";
import defaultProfile from "../assets/icons/profile_outline.svg"
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
    <div className="">
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
                    src={user.profileImage || defaultProfile} // Gunakan gambar default jika tidak ada
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-gray-300"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {/* Backdrop Blur dengan animasi */}
            <motion.div
              className="fixed inset-0 w-full bg-black/40 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Mobile Menu */}
            <motion.div
              className="overflow-y-auto w-1/2 max-w-sm h-screen shadow-xl fixed right-0 bg-[#252527] text-white mt-15 pt-10"
              initial={{ x: "100%" }}
              animate={{ x: 0, transition: { duration: 0.4, ease: "easeOut" } }}
              exit={{
                x: "100%",
                transition: { duration: 0.3, ease: "easeIn" },
              }}
            >
              {/* Tombol Close */}

              {/* Navigasi Menu */}
              <ul className="space-y-6 px-6">
                {[
                  { name: "Home", path: "/" },
                  { name: "Destination", path: "/destination" },
                  { name: "Culture", path: "/culture" },
                  { name: "Gallery", path: "/gallery" },
                  { name: "Contact Us", path: "/contact-us" },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.1 * index },
                    }}
                  >
                    <Link
                      to={item.path}
                      className={`block hover:text-gray-300 transition ${
                        location.pathname === item.path &&
                        "text-[#FFA666] font-bold"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}

                {/* Sign In / Profile */}
                {!user.id ? (
                  <motion.li
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                  >
                    <Link
                      to="/sign-in"
                      className="block w-full px-4 py-2 border border-[#FFA666] rounded-md hover:bg-[#FFA666] hover:text-black text-center transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </motion.li>
                ) : (
                  <motion.li
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                  >
                    <Link to="/profile" className="flex items-center gap-2">
                      <img
                        src={user.profileImage || defaultProfile}
                        alt="Profile"
                        className="w-8 h-8 rounded-full border border-gray-300"
                      />
                      <span>{user.name}</span>
                    </Link>
                  </motion.li>
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
