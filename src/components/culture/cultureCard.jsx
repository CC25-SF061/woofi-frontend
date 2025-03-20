import React from "react";
import { motion } from "framer-motion";

const CultureCard = ({ image, name, from }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
      className="p-2 rounded-l shadow-lg relative"
    >
      <div className="relative md:w-[210px] md:h-[210px] w-[280px] h-[280px]  isolate flex flex-col justify-end overflow-hidden rounded-lg px-8 pb-8 pt-40  mx-auto group">
        <motion.img
          src={image}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover transition duration-300 ease-in-out group-hover:blur-sm"
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 transition duration-300 ease-in-out group-hover:opacity-90"></div>
        <motion.p
          className="font-quicksand z-10 mt-3 text-white opacity-0 transition duration-300 ease-in-out group-hover:opacity-100"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          {from}
        </motion.p>
        <h3 className="font-bold font-quicksand text-white z-10 mt-2">{name}</h3>
      </div>
    </motion.div>
  );
};

export default CultureCard;
