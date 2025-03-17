import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import HeroSection from "../components/heroSection";
import Image1 from "../assets/cultureHistory/image1.webp";
import JoinUs from "../components/joinUs";
import CultureCard from "../components/culture/cultureCard";
import culturalData from "../components/culture/cultureData";
import { motion, AnimatePresence } from "framer-motion";

const CultureHistory = () => {
  const defaultCategory = "Traditional-Music";
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [displayedData, setDisplayedData] = useState([]);

  // Update displayedData setiap kali selectedCategory berubah
  useEffect(() => {
    if (culturalData[selectedCategory]) {
      setDisplayedData(culturalData[selectedCategory]);
    } else {
      setDisplayedData([]); // Jika tidak ada data, set ke array kosong
    }
  }, [selectedCategory]);

  return (
    <div>
      <Navbar />
      <HeroSection
        backgroundImage={Image1}
        title="Culture & History Of Indonesia"
        description="Uncovering Indonesia's Colorful Cultural and Historical Wealth"
      />

      {/* Cultural Diversity */}
      <section className="relative bg-[#221122] text-white">
        <div
          className="absolute top-0 w-full z-10"
          style={{
            background:
              "linear-gradient(to bottom, #221122 0%, rgba(34, 17, 34, 0.00) 61%)",
            height: "30%",
          }}
        ></div>
        <div className="px-6 md:px-10 pt-20 pb-30">
          <h1 className="font-inknut-antiqua text-2xl w-fit mb-3">
            <span className="text-[#FFA666]">Cultural</span> Diversity
          </h1>
          <hr className="border-t-2 border-white my-2" />
          <p className="font-quicksand mt-6 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            soluta possimus facilis, tempora quisquam laboriosam sunt placeat
            esse suscipit repellendus earum voluptates vitae ipsum harum
            deleniti rem nam recusandae omnis corrupti tempore quia ducimus
            maxime? Facilis sed officia nihil laudantium ea aliquam eligendi
            maxime. Aliquam numquam distinctio nihil corporis temporibus!
          </p>
        </div>
      </section>

      {/* Indonesian History */}
      <section className="relative bg-[#252527] text-white">
        <div className="px-6 md:px-10 pt-20 pb-30 text-right">
          <h1 className="font-inknut-antiqua text-2xl w-fit mb-3">
            Indonesian <span className="text-[#FFA666]">History</span>
          </h1>
          <hr className="border-t-2 border-white my-2" />
          <p className="font-quicksand mt-6 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            obcaecati eos asperiores fugit nisi necessitatibus maxime, possimus
            aspernatur impedit mollitia odio, nam ut quos eligendi hic eius
            aliquid natus reiciendis. Adipisci rem illo, eos ipsa nam delectus
            expedita accusamus magnam non corporis veniam, vero iste eaque
            atque, est tempore accusantium!
          </p>
        </div>
        <div
          className="absolute bottom-0 w-full"
          style={{
            background:
              "linear-gradient(to top, #221122 0%, rgba(34, 17, 34, 0.00) 61%)",
            height: "30%",
          }}
        ></div>
      </section>

      {/* Cultural Diversity of Indonesia */}

      <section className="w-5xl mx-auto py-20 px-8">
        <h1 className="font-inknut-antiqua text-3xl text-center">
          <span className="text-[#FFA666]">Cultural Diversity</span> of
          Indonesia
        </h1>
        <div className="flex divide-x-2 divide-white rounded-lg overflow-hidden justify-center mt-10">
          {Object.keys(culturalData).map((category) => (
            <motion.button
              key={category}
              className={`px-6 py-2 text-lg font-quicksand hover:underline transition-all ${
                selectedCategory === category
                  ? "font-bold text-[#FFA666] underline"
                  : ""
              }`}
              onClick={() => setSelectedCategory(category)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

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
                  <CultureCard
                    image={item.image}
                    name={item.name}
                    from={item.from}
                  />
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
      </section>
      <JoinUs />
      <Footer />
    </div>
  );
};

export default CultureHistory;
