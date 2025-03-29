import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image1 from "../../assets/logIn/image3.webp";
import BannerLogin from "../../components/bannerLogin";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword2, setShowPassword2] = useState(false);
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!password) {
      validationErrors.password = "Password field cannot be empty!";
    }
    if (!password2) {
      validationErrors.password2 = "Confirm password field cannot be empty!";
    }
    if (password && password2 && password !== password2) {
      validationErrors.password2 = "Passwords do not match!";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    toast.success("Password reset successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    setPassword("");
    setPassword2("");
    setErrors({});
  };

  return (
    <div className="bg-[#221122] min-h-screen flex items-center justify-center p-5 md:p-10">
      <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg overflow-hidden shadow-lg bg-[#252527] min-h-[650px]">
        <div className="hidden md:flex md:w-1/2">
          <BannerLogin imageSrc={Image1} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-10 md:px-8"
        >
          <h1 className="text-2xl md:text-3xl font-inknut-antiqua text-white mb-4 text-center">
            New Password
          </h1>
          <p className="text-lg text-center font-quicksand text-white mb-6">
            Create your New Password
          </p>

          <div className="mb-2 w-full">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                className={`w-full p-3 pr-12 font-quicksand rounded text-white border ${
                  errors.password ? "border-red-500" : "border-white"
                } bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FFA666]`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="min-h-[20px]">
              {errors.password && (
                <div className="error text-red-500 text-sm">
                  {errors.password}
                </div>
              )}
            </div>
          </div>

          <div className="mb-2 w-full">
            <div className="relative">
              <input
                type={showPassword2 ? "text" : "password"}
                name="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Confirm New Password"
                className={`w-full p-3 pr-12 font-quicksand rounded text-white border ${
                  errors.password2 ? "border-red-500" : "border-white"
                } bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FFA666]`}
              />
              <button
                type="button"
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
              >
                {showPassword2 ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="min-h-[20px]">
              {errors.password && (
                <div className="error text-red-500 text-sm">
                  {errors.password}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-[#FFA666] text-black font-bold font-quicksand rounded hover:bg-orange-500 transition"
          >
            Reset Password
          </button>

          <p className="text-sm text-gray-400 mt-4 text-center">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="text-[#FFA666] font-quicksand underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewPassword;
