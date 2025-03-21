import React from "react";
import Logo from "../../assets/navbar/logo.webp";
import LogoHome from "../../assets/profile/material-symbols--home-outline-rounded.svg";
import { Link, useLocation } from "react-router-dom";

const sidebar = () => {
  const location = useLocation();

  return (
    <>
      <sidebar className="flex flex-col items-center justify-between rounded-lg overflow-hidden shadow-lg bg-[#252527] p-5 h-full w-1/4">
        <Link
          to="/"
          className="flex gap-1 bg-[#252527] shadow-lg shadow-stone-950/50 p-2 rounded-lg"
        >
          <img src={LogoHome} alt="Home Icon" className="w-6 h-6" />
          <p className="font-quicksand text-lg">Back To Home</p>
        </Link>

        <div className="flex flex-col items-center justify-center gap-5">
          <img src={Logo} alt="Logo Woofi" className="w-25" />

          <div className="text-center flex flex-col overflow-x-auto text-lg font-quicksand font-medium scroll-smooth whitespace-nowrap divide-y-1 divide-white rounded-lg justify-start md:justify-center w-50">
            <Link
              to="/profile"
              className={`py-1 hover:text-gray-300 transition ${
                location.pathname === "/profile"
                  ? "text-[#FFA666] font-bold"
                  : ""
              }`}
            >
              Profile
            </Link>
            <Link
              to="/profile/add-data"
              className={`py-1 hover:text-gray-300 transition ${
                location.pathname === "/profile/add-data"
                  ? "text-[#FFA666] font-bold"
                  : ""
              }`}
            >
              Add Data
            </Link>
            <Link
              to="/profile/wishlist"
              className={`py-1 hover:text-gray-300 transition ${
                location.pathname === "/profile/wishlist"
                  ? "text-[#FFA666] font-bold"
                  : ""
              }`}
            >
              Wishlist
            </Link>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div className="rounded-full border-white border-2 p-2"></div>
          <div className="rounded-full border-white border-2 p-2"></div>
          <div className="rounded-full border-white border-2 p-2"></div>
        </div>
      </sidebar>
    </>
  );
};

export default sidebar;
