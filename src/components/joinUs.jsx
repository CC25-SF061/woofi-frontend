import React from "react";
import Image8 from "../assets/homePage/image8.webp";
import LogoWoofi from "../assets/navbar/logo.webp";
import { Link } from "react-router-dom";


const joinUs = () => {
  

  return (
    <div>
      <div
        className="relative flex flex-col items-center text-white py-12 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Image8})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div
          className="absolute top-0 w-full z-10"
          style={{
            background:
              "linear-gradient(to bottom, #221122 0%, rgba(34, 17, 34, 0.00) 61%)",
            height: "40%",
          }}
        ></div>
        <div className="w-xs flex flex-col items-center justify-center z-20">
          <img src={LogoWoofi} alt="Logo Woofi" className="w-28" />
          <hr className="w-full border-t-2 border-white my-4" />
          <h1 className="font-inknut-antiqua text-3xl mb-7">Join With Us</h1>
          <p className="font-quicksand text-xl mb-3 text-center">
            Lorem Ipsum is simply dummy text of the printing and f
          </p>
          <Link
            to="/joinUs"
            className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-black transition"
          >
            Click Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default joinUs;
