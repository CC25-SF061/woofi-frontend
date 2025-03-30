import React from "react";
import LogoHome from "../../assets/profile/material-symbols--home-outline-rounded.svg";
import { Link } from "react-router-dom";

const Header = () => {
  
  return (
    <>
      <div className="flex flex-col items-center p-4 pt-25 h-fit gap-5 w-full font-quicksand">
        <div className="flex flex-row-reverse items-center w-full tracking-wide text-[#aaa] gap-5">
          <div>
            <p>Actions</p>
          </div>
          <div>
            <p>Refresh Data</p>
          </div>
        </div>
        <div className="flex flex-row items-center w-full gap-3">
          <div className="flex flex-col items-center p-5 px-10 gap-1 rounded-md shadow-lg bg-[#252527] text-[#aaa] font-semibold">
            <p>Active Users</p>
            <p className="text-3xl tracking-wider">24.3k</p>
          </div>
          <div className="flex flex-col items-center p-5 px-10 gap-1 rounded-md shadow-lg bg-[#252527] text-[#aaa] font-semibold">
            <p>Destinations</p>
            <p className="text-3xl tracking-wider">554</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-[#aaa] font-semibold tracking-wider text-3xl">User Data</h2>
        </div>
        <div className="flex">
          <h2 className="text-[#aaa] font-semibold tracking-wider text-3xl">Destination Data</h2>
        </div>
      </div>
    </>
  );
};

export default Header;
