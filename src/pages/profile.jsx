import React, { useState } from "react";
import LogoHome from "../assets/profile/material-symbols--home-outline-rounded.svg";
import Logo from "../assets/navbar/logo.webp";
import Profile from "../assets/navbar/Icon.webp";
import Notification from "../assets/profile/ic--baseline-notifications-none.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const profil = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="bg-[#221122] h-screen w-full flex items-center justify-center p-5 md:p-10 gap-5 text-white">
        <div className="flex flex-col items-center justify-between rounded-lg overflow-hidden shadow-lg bg-[#252527] p-5 h-full w-1/4">
          <button className="flex gap-1 bg-[#252527] shadow-lg shadow-stone-950/50 p-2 rounded-lg">
            <img src={LogoHome} alt="Home Icon" className="w-6 h-6" />
            <p className="font-quicksand text-lg">Back To Home</p>
          </button>

          <div className="flex flex-col items-center justify-center gap-5">
            <img src={Logo} alt="Logo Woofi" className="w-25" />

            <div className="flex flex-col overflow-x-auto scroll-smooth whitespace-nowrap divide-y-2 divide-white rounded-lg justify-start md:justify-center w-50">
              <button className="lg:px-6 px-4 py-2 text-lg font-quicksand font-bold text-[#FFA666]">
                Profile
              </button>
              <button className="lg:px-6 px-4 py-2 text-lg font-quicksand font-bold text-[#FFA666]">
                Add Data
              </button>
              <button className="lg:px-6 px-4 py-2 text-lg font-quicksand font-bold text-[#FFA666]">
                Wishlist
              </button>
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <div className="rounded-full border-white border-2 p-2"></div>
            <div className="rounded-full border-white border-2 p-2"></div>
            <div className="rounded-full border-white border-2 p-2"></div>
          </div>
        </div>
        <div className="flex flex-col flex-1 rounded-lg overflow-hidden shadow-lg bg-[#252527] p-5 h-full w-3/4">
          <div className="flex justify-between items-center border-white border-b-2 pb-5 rounded-b-lg">
            <div className="flex flex-row gap-3 items-center">
              <img src={Profile} alt="Profile" className="rounded-full w-20" />
              <div className="flex flex-col gap-2">
                <h1 className="font-inknut-antiqua text-3xl">User 1</h1>
                <p className="font-quicksand">You have a writer role</p>
              </div>
            </div>
            <div>
              <button className="border-white border-2 text-white font-quicksand p-2 rounded-lg">
                <img src={Notification} alt="Notification" />
              </button>
            </div>
          </div>

          <h1 className="font-inknut-antiqua text-2xl text-center my-4">
            Account Information
          </h1>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col w-xl">
              <p className="font-quicksand text-white pb-2">Display Name</p>
              <div className="flex gap-3 w-full">
                <input
                  type="text"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Display Name"
                  className="flex-3 p-3 font-quicksand rounded text-white border border-white focus:outline-none"
                />
                <button className="flex-1 p-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition">
                  Edit
                </button>
              </div>
            </div>
            <div className="flex flex-col w-xl">
              <p className="font-quicksand text-white pb-2">Email</p>
              <div className="flex gap-3 w-full">
                <input
                  type="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="flex-3 p-3 font-quicksand rounded text-white border border-white focus:outline-none"
                />
                <button className="flex-1 p-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition">
                  Edit
                </button>
              </div>
            </div>
            <div className="flex flex-col w-xl">
              <p className="font-quicksand text-white pb-2">Password</p>
              <div className="flex gap-3 w-full">
                <div className="relative flex-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full p-3 pr-10 font-quicksand rounded text-white border border-white bg-transparent focus:outline-none"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <button className="w-38 p-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition">
                  Edit
                </button>
              </div>
            </div>
          </div>

          <button className="w-38 mt-auto p-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default profil;
