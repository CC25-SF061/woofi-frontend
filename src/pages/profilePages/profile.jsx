import React, { useState } from "react";
import ProfileIcon from "../../assets/navbar/Icon.webp";
import Notification from "../../assets/profile/ic--baseline-notifications-none.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Sidebar from "../../components/profile/sidebar";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [editSection, setEditSection] = useState(null);

  return (
    <div className="bg-[#221122] h-screen w-full flex items-center justify-center p-5 md:p-10 gap-5 text-white">
      <Sidebar />
      <div className="flex flex-col flex-1 rounded-lg overflow-hidden shadow-lg bg-[#252527] p-5 h-full w-3/4">
        <div className="flex justify-between items-center border-white border-b-2 pb-5 rounded-b-lg">
          <div className="flex flex-row gap-3 items-center">
            <img src={ProfileIcon} alt="Profile" className="rounded-full w-20" />
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
          {editSection ? `Edit ${editSection}` : "Account Information"}
        </h1>

        {!editSection && (
          <div className="flex flex-col gap-2 h-full">
            <div className="flex flex-col w-xl">
              <p className="font-quicksand text-white pb-2">Display Name</p>
              <div className="flex gap-3 w-full">
                <input
                  type="text"
                  placeholder="Your Display Name"
                  className="flex-3 p-3 font-quicksand rounded text-white border border-white focus:outline-none"
                  disabled
                />
                <button
                  className="flex-1 p-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition"
                  onClick={() => setEditSection("Username")}
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="flex flex-col w-xl">
              <p className="font-quicksand text-white pb-2">Email</p>
              <div className="flex gap-3 w-full">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-3 p-3 font-quicksand rounded text-white border border-white focus:outline-none"
                  disabled
                />
                <button
                  className="flex-1 p-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition"
                  onClick={() => setEditSection("Email")}
                >
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
                    disabled
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <button
                  className="w-38 p-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition"
                  onClick={() => setEditSection("Password")}
                >
                  Edit
                </button>
              </div>
            </div>
            <button className="w-38 mt-auto p-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition">
              Logout
            </button>
          </div>
        )}

        {editSection && (
          <div className="flex flex-col gap-4 h-full">
            <div className="w-80">
              <p className="font-quicksand text-white pb-2">
                {editSection} Before
              </p>
              <input
                type="text"
                placeholder={`${editSection}-Before`}
                className="w-full p-3 font-quicksand rounded text-white border border-white focus:outline-none"
              />
            </div>
            <div className="w-80">
              <p className="font-quicksand text-white pb-2">
                {editSection} After
              </p>
              <input
                type="text"
                placeholder={`${editSection}-After`}
                className="w-full p-3 font-quicksand rounded text-white border border-white focus:outline-none"
              />
            </div>
            <div className="flex justify-between mt-auto">
              <button
                className="w-38 p-3 bg-red-500 text-white font-quicksand rounded hover:bg-red-700 transition"
                onClick={() => setEditSection(null)}
              >
                Cancel
              </button>
              <button
                className="w-38 p-3 bg-[#4AFF71] text-[#252527] font-quicksand rounded hover:bg-orange-500 transition"
                onClick={() => setEditSection(null)}
              >
                Save & Quit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
