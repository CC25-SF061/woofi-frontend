import React from "react";
import Logo from "../../assets/navbar/logo.webp";
import LogoHome from "../../assets/profile/material-symbols--home-outline-rounded.svg";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  PlusCircle,
  Heart,
  MapPin,
} from "lucide-react"; // lucide-react icons

const Sidebar = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Profile", path: "/profile", icon: <User size={18} /> },
    { name: "Add Data", path: "/profile/add-data", icon: <PlusCircle size={18} /> },
    { name: "Wishlist", path: "/profile/wishlist", icon: <Heart size={18} /> },
    { name: "Data Destination", path: "/profile/data-destination", icon: <MapPin size={18} /> },
  ];

  return (
    <div className="flex flex-col items-center justify-between rounded-lg overflow-hidden shadow-lg pt-20 lg:pt-5 bg-[#252527] p-6 h-full w-full">
      <Link
        to="/"
        className="flex items-center gap-2 bg-[#252527] shadow-sm shadow-stone-950/50 px-4 py-2 rounded-xl border-2 border-white hover:bg-[#FFA666] transition duration-300 font-semibold"
      >
        <img src={LogoHome} alt="Home Icon" className="w-5 h-5" />
        <p className="font-quicksand text-base">Back To Home</p>
      </Link>

      {/* Logo + Navigation */}
      <div className="flex flex-col items-center gap-6">
        <img src={Logo} alt="Logo Woofi" className="w-18 h-auto" />

        <div className="relative flex flex-col text-base font-quicksand font-medium rounded-lg w-56">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <div key={link.path} className="relative py-1.5 px-3">
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-md bg-[#FFA666]/20 z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </AnimatePresence>

                <Link
                  to={link.path}
                  className={`relative z-10 flex items-center gap-4 transition duration-200 ${
                    isActive
                      ? "text-[#FFA666] font-bold"
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <div className="rounded-full border-white border-2 w-3 h-3"></div>
        <div className="rounded-full border-white border-2 w-3 h-3"></div>
        <div className="rounded-full border-white border-2 w-3 h-3"></div>
      </div>
    </div>
  );
};

export default Sidebar;
