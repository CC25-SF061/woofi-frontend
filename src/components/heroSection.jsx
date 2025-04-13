import React from "react";

const HeroSection = ({
  backgroundImage,
  title,
  highlightedWord,
  description,
}) => {
  const titleParts = title.split(" ");

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      <div className="absolute z-10 text-white px-8 lg:px-0">
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
      </div>

      <div
        className="absolute inset-0 w-full h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
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

export default HeroSection;
