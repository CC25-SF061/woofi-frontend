import React from "react";
import StarFull from "../../assets/icons/ratestar/full.svg";
import StarHalf from "../../assets/icons/ratestar/half.svg";
import StarEmpty from "../../assets/icons/ratestar/empty.svg";
import WishlistEmpty from "../../assets/icons/wishlist/empty.svg";
import { motion } from "framer-motion";

import countStars from "../../util/starRating";

const DestinationCard = ({ id, picture, name, desc, rating, onclick }) => {
  const { whole_rating, has_half_rating, empty_rating } = countStars(rating);

  // Decompound description paragraph
  desc = desc.replaceAll(/([\n]+[\w.,/ ]+)/g, "...");

  // Trimming long title
  name = name.length > 27 ? name.substring(0, 24) + "..." : name;

  // Trimming long description
  desc = desc.length > 93 ? desc.substring(0, 90) + "..." : desc;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.25, ease: "backOut", delay: 0 }}
      whileHover={{ scale: 1.05 }}
      className="relative bg-[#252527] font-quicksand rounded-lg w-full h-80 cursor-pointer shadow-[#18081825] shadow-lg overflow-hidden"
      onMouseUpCapture={() => onclick(id)}
    >
      <div className="w-full h-40">
        <img
          src={picture}
          className="w-full h-full object-cover rounded-t-lg"
          alt={name}
        />
      </div>
      <div className="flex flex-col gap-2 p-3 pb-14">
        <div className="flex flex-row items-center">
          <div className="flex flex-row gap-1">
            {Array.from({ length: whole_rating }).map((_, i) => (
              <img key={i} src={StarFull} width="19" alt="Full Star" />
            ))}
            {has_half_rating && (
              <img key="half" src={StarHalf} width="19" alt="Half Star" />
            )}
            {Array.from({ length: empty_rating }).map((_, i) => (
              <img key={i + 10} src={StarEmpty} width="19" alt="Empty Star" />
            ))}
          </div>
          <img
            className="ml-auto"
            src={WishlistEmpty}
            width="21"
            alt="Wishlist"
          />
        </div>
        <h2 className="text-xl text-white tracking-wide truncate">{name}</h2>
        <p className="text-md text-[#aaa] line-clamp-3">{desc}</p>
      </div>
      <div className="absolute bottom-3 w-full h-18" style={{background: 'linear-gradient(0deg, rgb(37, 37, 39) 0%, rgba(37, 37, 39, 0) 100%)'}}></div>
      <div className="absolute bottom-3 right-3">
        <button className="text-white text-md font-light px-4 py-1 border border-[#ffffff88] rounded-md tracking-wider bg-[#252527] hover:bg-[#fff] hover:font-semibold hover:text-black transition-all">
          See Details
        </button>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
