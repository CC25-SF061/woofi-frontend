import React from "react";
import Image1 from "../assets/logIn/image3.webp";
import BannerLogin from "../components/bannerLogin";
import { Link } from "react-router-dom";

const forgetPassword = () => {
  return (
    <div className="bg-[#221122] min-h-screen w-full flex items-center justify-center p-5 md:p-10">
      <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg overflow-hidden shadow-lg bg-[#252527] min-h-[650px]">
        
        {/* Image Section */}
        <div className="hidden md:flex md:w-1/2 min-h-screen max-h-[650px]">
          <BannerLogin imageSrc={Image1} />
        </div>

        {/* Form section */}
        <form className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-10 md:px-8 flex-grow">
          <h1 className="text-2xl md:text-3xl font-inknut-antiqua text-white mb-6 text-center">
            Forgot Password
          </h1>
          <p className="text-xl text-center md:text-lg font-quicksand text-white mb-6">We will send password reset link on your email Id</p>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 font-quicksand mb-4 rounded text-white border border-white bg-transparent focus:outline-none"
          />
          <button className="w-full p-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition">
            Send reset link
          </button>
          <p className="text-sm text-gray-400 mt-2 text-center">
            Don't have an account yet?
            <span className="text-[#FFA666] font-quicksand ml-1">
              <Link to={"/register"}>
                Register
              </Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default forgetPassword;
