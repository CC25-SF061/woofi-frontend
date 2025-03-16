import React from "react";
import Image1 from "../assets/logIn/image2.webp";
import BannerLogin from "../components/bannerLogin";
import { Link } from "react-router-dom";

const register = () => {
  return (
    <div className="bg-[#221122] h-screen p-10">
      <div className="flex h-full rounded-lg overflow-hidden shadow-lg bg-[#252527]">
        <BannerLogin imageSrc={Image1} />

        <div className="w-1/2 flex flex-col justify-center items-center px-8">
          <h1 className="text-3xl font-inknut-antiqua text-white mb-6">
            Register Account
          </h1>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 font-quicksand mb-4 rounded text-white border border-white focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 font-quicksand mb-4 rounded text-white border border-white focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 font-quicksand mb-4 rounded text-white border border-white focus:outline-none"
          />
          <button className="w-full p-2 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition">
            Register
          </button>
          <p className="text-sm text-gray-400 mt-2">
          Already have an account{" "}
            <Link 
              to={"/signIn"}
              className="text-[#FFA666] font-quicksand cursor-pointer">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default register;
