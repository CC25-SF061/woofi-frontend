import React, { useState } from "react";
import Image1 from "../../assets/logIn/image2.webp";
import BannerLogin from "../../components/bannerLogin";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  return (
    <div className="bg-[#221122] min-h-screen w-full flex items-center justify-center p-5 md:p-10">
      <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg overflow-hidden shadow-lg bg-[#252527] min-h-[650px]">
        {/* Image Section */}
        <div className="hidden md:flex md:w-1/2 min-h-screen max-h-[650px]">
          <BannerLogin imageSrc={Image1} />
        </div>

        {/* Form Section */}
        <form className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-10 md:px-8 flex-grow">
          <h1 className="text-2xl md:text-3xl font-inknut-antiqua text-white mb-6 text-center">
            Register Account
          </h1>

          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 font-quicksand mb-4 rounded text-white border border-white bg-transparent focus:outline-none"
          />

          <input
            type="text"
            placeholder="Display Name"
            className="w-full p-3 font-quicksand mb-4 rounded text-white border border-white bg-transparent focus:outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 font-quicksand mb-4 rounded text-white border border-white bg-transparent focus:outline-none"
          />

          <div className="relative w-full mx-auto">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 font-quicksand mb-4 rounded text-white border border-white bg-transparent focus:outline-none"
            />
            <li
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </li>
          </div>

          <div className="relative w-full mx-auto">
            <input
              type={showPassword1 ? "text" : "password"}
              placeholder="Show Password"
              className="w-full p-3 font-quicksand mb-4 rounded text-white border border-white bg-transparent focus:outline-none"
            />
            <li
              onClick={() => setShowPassword1(!showPassword1)}
              className="absolute inset-y-0 right-3 flex items-center text-white"
            >
              {showPassword1 ? <FaEyeSlash /> : <FaEye />}
            </li>
          </div>
          
          <button className="w-full p-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition">
            Register
          </button>

          <div className="w-full flex items-center my-4">
            <hr className="flex-grow border-gray-400" />
            <span className="mx-2 text-gray-400">or</span>
            <hr className="flex-grow border-gray-400" />
          </div>

          <button className="w-full flex items-center justify-center p-3 bg-white text-black font-quicksand rounded shadow hover:bg-gray-200 transition mb-4">
            <FcGoogle className="text-2xl mr-2" />
            Register with Google
          </button>

          <p className="text-sm text-gray-400 mt-2">
            Already have an account{" "}
            <Link
              to={"/sign-in"}
              className="text-[#FFA666] font-quicksand underline cursor-pointer"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default register;
