import React from "react";

const SeeDetail = ({ image, title, description }) => {
  return (
    <div className="relative w-1/3 h-full rounded-lg overflow-hidden">
      <img src={image} alt={title} className="object-cover w-full h-full" />
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
        <h3 className="text-lg font-inknut-antiqua mb-3">{title}</h3>
        <p className="text-sm font-quicksand">{description}</p>
        <button className="mt-3 px-3 py-1 border border-white rounded-md font-quicksand">
          See Detail
        </button>
      </div>
    </div>
  );
};

export default SeeDetail;
