import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/navbar/finalLogo.png";
import notFoundImage from "../assets/images/notFound.png"; 

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white relative">
      {/* Logo */}
      <div className="absolute top-5 left-5">
        <img src={logo} alt="Logo" className="w-48"/>
      </div>

      {/* Ilustrasi 404 dengan animasi bounce */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl"
      >
        <motion.img 
          src={notFoundImage} 
          alt="404 Not Found" 
          className="w-full h-auto"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Tombol Go Home */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-5"
      >
        <Link
          to="/"
          className="px-6 py-3 bg-transparent text-white border border-orange-400 rounded-lg transition duration-300 hover:bg-orange-400 hover:text-gray-900"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;