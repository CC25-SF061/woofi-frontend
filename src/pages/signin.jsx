import React from "react";
import Image1 from "../assets/logIn/image1.webp";
import BannerLogin from "../components/bannerLogin";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  return (
    <section className="bg-[#221122] min-h-screen w-full flex items-center justify-center p-5 md:p-10">
      <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg overflow-hidden shadow-lg bg-[#252527] min-h-[650px]">
        {/* Form Section */}
        <form className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-10 md:px-8 flex-grow">
          <h1 className="text-2xl md:text-3xl font-inknut-antiqua text-white mb-6 text-center">Login</h1>
          
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 font-quicksand mb-4 rounded text-white border border-white bg-transparent focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 font-quicksand mb-4 rounded text-white border border-white bg-transparent focus:outline-none"
          />
          <button className="w-full p-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition">
            Login
          </button>
          
          <div className="w-full flex items-center my-4">
            <hr className="flex-grow border-gray-400" />
            <span className="mx-2 text-gray-400">or</span>
            <hr className="flex-grow border-gray-400" />
          </div>
          
          <button className="w-full flex items-center justify-center p-3 bg-white text-black font-quicksand rounded shadow hover:bg-gray-200 transition mb-4">
            <FcGoogle className="text-2xl mr-2" /> Sign in with Google
          </button>
          
          <Link to="/forget-password" className="text-sm text-[#FFA666] font-quicksand underline mt-4">
            Forgot password?
          </Link>
          <p className="text-sm text-gray-400 mt-2 text-center">
            Don't have an account yet? 
            <Link to="/register" className="text-[#FFA666] font-quicksand underline ml-1">
              Register
            </Link>
          </p>
        </form>

        {/* Image Section */}
        <div className="hidden md:flex md:w-1/2 min-h-screen max-h-[650px]">
          <BannerLogin imageSrc={Image1} />
        </div>
      </div>
    </section>
  );
};

export default SignIn;
