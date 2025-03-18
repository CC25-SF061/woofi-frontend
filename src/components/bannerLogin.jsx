import React from "react";
import Logo from "../assets/navbar/logo.webp";

const bannerLogin = ({ imageSrc }) => {
  return (
    <div className="w-full h-full relative">
      <img
        src={imageSrc}
        alt="Background"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute w-full md:text-center inset-0 flex flex-col items-center justify-center text-white z-10">
        <img src={Logo} alt="Logo" className="w-30 mb-2" />
        <h2 className="font-quicksand text-3xl">Woofi</h2>
        <p className="font-quicksand text-3xl">(Wonderful Of Indonesia)</p>
      </div>

      <div
        className="absolute bottom-0 w-full"
        style={{
          background:
            "linear-gradient(to top, #221122 0%, rgba(34, 17, 34, 0.00) 61%)",
          height: "30%",
        }}
      ></div>
    </div>
  );
};

export default bannerLogin;
