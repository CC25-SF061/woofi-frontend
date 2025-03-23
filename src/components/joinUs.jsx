import React from "react";
import Image8 from "../assets/homePage/image8.webp";
import LogoWoofi from "../assets/navbar/logo.webp";
import { Link } from "react-router-dom";

const JoinUs = () => {
  return (
    <div>
      <div
        className="relative flex flex-col items-center text-white py-12 bg-cover bg-center bg-no-repeat min-h-full"
        style={{ backgroundImage: `url(${Image8})` }}
      >
        {/* Overlay Background */}
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div
          className="absolute top-0 w-full z-10"
          style={{
            background:
              "linear-gradient(to bottom, #221122 0%, rgba(34, 17, 34, 0.00) 61%)",
            height: "40%",
          }}
        ></div>

        {/* Content */}
        <div className="relative z-20 w-full max-w-md px-6 flex flex-col items-center text-center">
          <img src={LogoWoofi} alt="Logo Woofi" className="w-28 mb-4" />
          <hr className="w-full border-t-2 border-white my-4" />
          <h1 className="font-inknut-antiqua text-2xl md:text-3xl mb-6">
            Join With Us
          </h1>
          <p className="font-quicksand text-lg md:text-xl mb-4 max-w-lg">
            Lorem Ipsum is simply dummy text of the printing and f
          </p>
          <Link
            to="/join-us"
            className="px-5 py-3 border border-white rounded-md hover:bg-white hover:text-black transition duration-300"
          >
            Click Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
