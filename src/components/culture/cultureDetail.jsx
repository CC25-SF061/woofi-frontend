import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const modalVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.2 } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const CultureDetail = ({ item, onClose }) => {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden"; 
    }
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, [item]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose} // Klik di luar modal untuk menutup
      >
        {/* Modal */}
        <motion.div
          className="bg-[#252527] rounded-lg shadow-lg p-8 max-w-2xl max-h-[600px] w-full relative"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat diklik
        >
          {/* Tombol Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-50 cursor-pointer transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
              />
            </svg>
          </button>

          {/* Isi Modal */}
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-72 object-cover bg-center rounded-md"
          />
          <h2 className="text-lg font-inknut-antiqua text-white my-4">
            {item.name} - <span className="text-[#FFA666]">{item.from}</span>
          </h2>
          <p className="text-white">{item.desc}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CultureDetail;
