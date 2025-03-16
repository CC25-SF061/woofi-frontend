import React from "react";
import Image1 from "../assets/logIn/image3.webp";
import BannerLogin from "../components/bannerLogin";
import { Link } from "react-router-dom";

const forgetPassword = () => {
  return (
    <div className="bg-[#221122] h-screen p-10">
      <div className="flex h-full rounded-lg overflow-hidden shadow-lg bg-[#252527]">
        <BannerLogin imageSrc={Image1} />

        <div className="w-1/2 flex flex-col justify-center items-center px-8">
          <h1 className="text-3xl font-inknut-antiqua text-white mb-6">
            Forgot Password
          </h1>
          <p className="text-xl font-quicksand text-white mb-6">We will send password reset link on your email Id</p>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 font-quicksand mb-4 rounded text-white border border-white focus:outline-none"
          />
          <button className="w-full p-2 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition">
            Send reset link
          </button>
          <p className="text-sm text-gray-400 mt-2">
            Don't have an account yet?{" "}
            <span className="text-[#FFA666] font-quicksand cursor-pointer">
              <Link to={"/register"}>
                Register
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default forgetPassword;
