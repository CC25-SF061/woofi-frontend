import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import culturalData from "./cultureData";
import CultureCard from "./cultureCard";
import CultureDetail from "./cultureDetail";

const CulturalDiversity = () => {
  const [selectedCategory, setSelectedCategory] = useState("Traditional-Music");
  const [selectedItem, setSelectedItem] = useState(null); // State untuk modal

  const displayedData = culturalData[selectedCategory] || [];

  return (
    <section className="max-w-5xl w-full mx-auto py-20 px-8">
      <h1 className="font-inknut-antiqua text-3xl text-center">
        <span className="text-[#FFA666]">Cultural Diversity</span> of Indonesia
      </h1>

      {/* Category Buttons */}
      <div className="flex overflow-x-auto scroll-smooth whitespace-nowrap divide-x-2 divide-white rounded-lg justify-start md:justify-center mt-10 px-4 py-2">
        {Object.keys(culturalData).map((category) => (
          <motion.button
            key={category}
            className={`px-6 py-2 text-lg font-quicksand hover:underline transition-all ${
              selectedCategory === category ? "font-bold text-[#FFA666] underline" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Culture Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        <AnimatePresence mode="wait">
          {displayedData.length > 0 ? (
            displayedData.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Klik untuk membuka modal */}
                <div onClick={() => setSelectedItem(item)} className="cursor-pointer">
                  <CultureCard image={item.image} name={item.name} from={item.from} />
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p
              key="no-data"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-lg mt-10"
            >
              No data available for this category.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Modal Popup */}
      <CultureDetail item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
};

export default CulturalDiversity;
