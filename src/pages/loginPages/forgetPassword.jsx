import React, { useState } from "react";
import Image1 from "../../assets/logIn/image3.webp";
import BannerLogin from "../../components/bannerLogin";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!email) {
      validationErrors.email = "Email field cannot be empty!";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    toast.success("Email link sent successfully", {
      position: "top-right",
      autoClose: 3000,
    });

    setEmail("");
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
            Forgot Password
          </h1>
          <p className="text-xl text-center md:text-lg font-quicksand text-white mb-6">
            We will send password reset link on your email Id
          </p>
          <div className="mb-2 w-full">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 pr-12 font-quicksand rounded text-white border ${
                errors.email ? "border-red-500" : "border-white"
              } bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FFA666]`}
            />
            <div className="min-h-[20px]">
              {errors.email && (
                <div className="error text-red-500 text-sm">{errors.email}</div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-[#FFA666] text-black font-bold cursor-pointer font-quicksand rounded hover:bg-orange-500 transition"
          >
            Send reset link
          </button>
          <p className="text-sm text-gray-400 mt-2 text-center">
            Don't have an account yet?
            <span className="text-[#FFA666] font-quicksand underline ml-1">
              <Link to={"/register"}>Register</Link>
            </span>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgetPassword;
