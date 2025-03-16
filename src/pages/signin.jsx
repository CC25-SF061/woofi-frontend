import React from "react";
import Image1 from "../assets/logIn/image1.webp";
import BannerLogin from "../components/bannerLogin";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="bg-[#221122] h-screen p-10">
      <div className="flex h-full rounded-lg overflow-hidden shadow-lg bg-[#252527]">
        <div className="w-1/2 flex flex-col justify-center items-center px-8">
          <h1 className="text-3xl font-inknut-antiqua text-white mb-6">
            Login
          </h1>
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
            Login
          </button>
          <Link 
            to={"/forgetPassword"}
            className="text-sm text-[#FFA666] font-quicksand mt-4 cursor-pointer">
            Forgot password?
          </Link>
          <p className="text-sm text-gray-400 mt-2">
            Don't have an account yet?{" "}
            <span className="text-[#FFA666] font-quicksand cursor-pointer">
              <Link to={"/register"}>
                Register
              </Link>
            </span>
          </p>
        </div>

        <BannerLogin 
          imageSrc={Image1}
        /> 
      </div>
    </div>
  );
};

export default SignIn;
