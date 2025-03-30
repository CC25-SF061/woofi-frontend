import React from "react";
import { motion } from "framer-motion";
import {slideInLeft } from "../util/animation";

const heroSection = ({
  backgroundImage,
  title,
  highlightedWord,
  description,
}) => {
  const titleParts = title.split(" ");

  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content">
          <motion.div
            className="max-w-full px-8 lg:px-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={slideInLeft}
          >
            <h1 className="mb-5 lg:text-5xl text-3xl font-inknut-antiqua uppercase">
              {titleParts.map((word, index) => (
                <span
                  key={index}
                  className={word === highlightedWord ? "text-[#FFA666]" : ""}
                >
                  {word}{" "}
                </span>
              ))}
            </h1>
            <p className="mb-5 lg:text-3xl text-xl font-quicksand">
              {description}
            </p>
          </motion.div>
        </div>
        <div
          className="absolute bottom-0 w-full"
          style={{
            background:
              "linear-gradient(to top, #221122 0%, rgba(34, 17, 34, 0.00) 61%)",
            height: "60%",
          }}
        ></div>
      </div>
    </div>
  );
};

export default heroSection;
