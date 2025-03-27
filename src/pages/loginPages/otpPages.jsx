import React, { useState } from "react";
import Image1 from "../../assets/logIn/image5.webp";
import BannerLogin from "../../components/bannerLogin";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpPages = () => {
  const [otpCode, setOtpCode] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!otpCode.trim()) {
      validationErrors.otpCode = "OTP Code field cannot be empty!";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    toast.success("OTP verified successfully", {
      position: "top-right",
      autoClose: 3000,
    });

    setOtpCode("");
    setErrors({});
  };

  return (
    <div className="bg-[#221122] min-h-screen w-full flex items-center justify-center p-5 md:p-10">
      <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg overflow-hidden shadow-lg bg-[#252527] min-h-[650px]">
        <div className="hidden md:flex md:w-1/2 min-h-screen max-h-[650px]">
          <BannerLogin imageSrc={Image1} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-10 md:px-8 flex-grow"
        >
          <h1 className="text-2xl md:text-3xl font-inknut-antiqua text-white mb-6 text-center">
            OTP CODE
          </h1>
          <p className="text-xl text-center md:text-lg font-quicksand text-white">
            We have sent an OTP Code
          </p>
          <p className="text-xl text-center md:text-sm font-quicksand text-white mb-6">
            to <span className="font-bold">(your register email)</span>
          </p>
          <div className="mb-2 w-full">
            <input
              type="text"
              placeholder="Enter OTP Code"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              className={`w-full p-3 pr-12 font-quicksand rounded text-white border ${
                errors.otpCode ? "border-red-500" : "border-white"
              } bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FFA666]`}
            />
            <div className="min-h-[20px]">
              {errors.otpCode && (
                <div className="error text-red-500 text-sm">
                  {errors.otpCode}
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-[#FFA666] text-black font-bold cursor-pointer font-quicksand rounded hover:bg-orange-500 transition"
          >
            Submit
          </button>
          <p className="text-sm text-gray-400 mt-2 text-center">
            Don't have an account yet?
            <span className="text-[#FFA666] font-quicksand underline ml-1">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OtpPages;
