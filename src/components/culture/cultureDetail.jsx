import React,{useEffect} from "react";
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
          document.body.style.overflow = "hidden"; // Matikan scroll saat modal terbuka
        }
        return () => {
          document.body.style.overflow = "auto"; // Pulihkan scroll saat modal ditutup
        };
      }, [item]);
    if (!item) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose} // Klik di luar modal untuk menutup
      >
        {/* Modal */}
        <motion.div
          className="bg-[#252527] rounded-lg shadow-lg p-6 max-w-2xl max-h-[500px] h-full w-full relative"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat diklik
        >
          
          <button onClick={onClose} className="absolute top-1 right-1 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12"></path><path fill="currentColor" d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"></path></svg>
          </button>

          {/* Isi Modal */}
          <img src={item.image} alt={item.name} className="w-full h-72 object-cover rounded-md" />
          <h2 className="text-lg font-inknut-antiqua text-white font-bold mt-4">{item.name} - <span className="text-[#FFA666]">{item.from}</span></h2>
          <p className="text-white">{item.desc}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CultureDetail;
