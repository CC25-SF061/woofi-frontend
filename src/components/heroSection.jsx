import React from "react";

const heroSection = ({ backgroundImage, title, description }) => {
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
          <div className="max-w-full">
            <h1 className="mb-5 text-5xl font-inknut-antiqua uppercase">
              {title}
            </h1>
            <p className="mb-5 text-3xl font-quicksand">{description}</p>
          </div>
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
