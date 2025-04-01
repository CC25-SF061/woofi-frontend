import React from "react";
import HeroBanner from "../components/heroBanner";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import LogoWoofi from "../assets/navbar/logo.webp";
import Image1 from "../assets/homePage/whatWoofi.webp";
import Image2 from "../assets/homePage/image2.webp";
import Image3 from "../assets/homePage/image3.webp";
import Image4 from "../assets/homePage/image4.webp";

import SeeDetail from "../components/seeDetail";
import JoinUs from "../components/joinUs";
import { slideInLeft, slideInRight, fadeInUp } from "../util/animation";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import TopDestination from "../components/home/topDestination";

const backgroundImages = [
  "/src/assets/homePage/borobudur.webp",
  "/src/assets/homePage/gunung-rinjani.webp",
  "/src/assets/homePage/raja-ampat.webp",
];

const home = () => {
  return (
    <>
      <Navbar></Navbar>
      <HeroBanner
        backgroundImages={backgroundImages}
        title="Indonesia's natural beauty"
        highlightedWord="natural"
        description="Discover the natural beauty, culture and history of Indonesia in one place."
      />

      {/* What is Woofi */}
      <div className="relative flex w-full min-h-screen items-center justify-center bg-[#252527]">
        <div
          className="absolute top-0 w-full z-10"
          style={{
            background:
              "linear-gradient(to bottom, #221122 0%, rgba(34, 17, 34, 0.00) 61%)",
            height: "30%",
          }}
        ></div>

        <div className="flex flex-col lg:flex-row items-center justify-center px-8 py-20 lg:py-0 gap-8 lg:gap-0 lg:px-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
            variants={slideInLeft}
            className="flex flex-col items-center justify-center lg:w-1/3 text-center px-8"
          >
            <h1 className="text-white lg:text-2xl text-xl font-inknut-antiqua">
              What is <span className="text-[#FFA666]">Woofi?</span>
            </h1>
            <hr className="w-full border-t-2 border-white my-2" />
            <p className="text-white max-w-xs font-quicksand">
              Lorem Ipsum is simply dummy text of the printing and t
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
            variants={fadeInUp}
            className="relative lg:w-1/3 h-full flex justify-center"
          >
            <div className="relative w-full h-full">
              <img
                src={Image1}
                alt="Image 1"
                className="object-cover h-full w-full rounded-lg"
              />
              <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
            </div>
            <img
              src={LogoWoofi}
              alt="Logo Woofi"
              className="h-auto w-38 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
            variants={slideInRight}
            className="flex flex-col items-center justify-center lg:w-1/3 text-center px-8"
          >
            <h1 className="text-white lg:text-2xl text-xl font-inknut-antiqua">
              Why Choose <span className="text-[#FFA666]">Woofi?</span>
            </h1>
            <hr className="w-full border-t-2 border-white my-2" />
            <p className="text-white max-w-xs font-quicksand">
              Lorem Ipsum is simply dummy text of the printing and t
            </p>
          </motion.div>
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

      {/* Explore your favorite dentination */}
      <div className="relative flex flex-col lg:flex-row w-full min-h-screen items-center justify-center bg-[#221122] px-8 gap-8 lg:gap-8 py-12 pt-0 lg:pt-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
          variants={slideInLeft}
          className="flex flex-col items-center justify-center lg:w-2/5 text-center text-white gap-6"
        >
          <img src={LogoWoofi} alt="Logo Woofi" className="w-38" />
          <hr className="w-full border-t-2 border-white" />
          <h2 className="font-inknut-antiqua lg:text-3xl text-xl">
            Explore Your <span className="text-[#FFA666]">Favorite</span>{" "}
            Destination
          </h2>
          <p className="font-quicksand lg:text-xl">
            Lorem Ipsum is simply dummy text of the printing and t
          </p>
          <button className="font-quicksand text-lg p-2 border-2 border-white rounded-md border-solid">
            Start Exploring
          </button>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
          variants={slideInRight}
          className="flex lg:w-3/5 flex-col lg:flex-row h-full items-center gap-4"
        >
          <div className="relative w-xs lg:w-1/3 h-full rounded-lg overflow-hidden">
            <img
              src={Image2}
              alt="Destination 1"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>

          <SeeDetail
            image={Image3}
            title="Wonderful of Bali"
            description="Lorem Ipsum is simply dummy text of the printing and f"
          />

          <div className="relative w-xs lg:w-1/3 h-full rounded-lg overflow-hidden">
            <img
              src={Image4}
              alt="Destination 3"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
        </motion.div>
      </div>

      <TopDestination/>

      <div
        className="absolute bottom-0 w-full"
        style={{
          background:
            "linear-gradient(to top, #221122 0%, rgba(34, 17, 34, 0.00) 61%)",
          height: "30%",
        }}
      ></div>

      <JoinUs></JoinUs>
      <Footer></Footer>
    </>
  );
};

export default home;
