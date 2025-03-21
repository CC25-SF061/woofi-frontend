import React, { useState } from "react";
import Profile from "../../assets/navbar/Icon.webp";
import Notification from "../../assets/profile/ic--baseline-notifications-none.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Sidebar from "../../components/profile/sidebar";

const addData = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="bg-[#221122] h-screen w-full flex items-center justify-center p-5 md:p-10 gap-5 text-white">
        <Sidebar/>
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
            Add Data
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

export default addData;
