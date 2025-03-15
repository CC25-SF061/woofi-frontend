import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/navbar/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      className={`fixed top-0 left-0 w-full transition-all duration-300 shadow-md z-50 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/10 backdrop-blur-md"
      }`}
    >
      <div
        className={`flex justify-between px-7 py-3 font-quicksand
        ${isScrolled ? "text-black" : "text-white"}`}
      >
        <Link to="/">
          <img src={logo} alt="Logo" className="w-20 mr-2" />
        </Link>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Destination</Link>
            </li>
            <li>
              <Link to="/culture-history">Culture and History</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
          </ul>
          <div>
            <Link to="/" className="btn">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
