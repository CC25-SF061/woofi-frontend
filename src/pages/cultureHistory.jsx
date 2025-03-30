import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import HeroSection from "../components/heroSection";
import Image1 from "../assets/cultureHistory/image1.webp";
import JoinUs from "../components/joinUs";
import CulturalDiversity from "../components/culture/culturalDiversity";
import {fadeInUp } from "../util/animation";


const CultureHistory = () => {
  return (
    <div>
      <Navbar />
      <HeroSection
        backgroundImage={Image1}
        title="Culture & History Of Indonesia"
        highlightedWord="Indonesia"
        description="Uncovering Indonesia's Colorful Cultural and Historical Wealth"
      />

      {/* Cultural Diversity */}
      <motion.section
        className="relative bg-[#221122] text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
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
            maxime?
          </p>
        </div>
      </motion.section>

      {/* Indonesian History */}
      <motion.section
        className="relative bg-[#252527] text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <div className="px-6 md:px-10 pt-20 pb-30 text-right">
          <h1 className="font-inknut-antiqua text-2xl w-fit mb-3">
            Indonesian <span className="text-[#FFA666]">History</span>
          </h1>
          <hr className="border-t-2 border-white my-2" />
          <p className="font-quicksand mt-6 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            obcaecati eos asperiores fugit nisi necessitatibus maxime, possimus
            aspernatur impedit mollitia odio, nam ut quos eligendi hic eius
            aliquid natus reiciendis.
          </p>
        </div>
      </motion.section>

      <CulturalDiversity />
      <JoinUs />
      <Footer />
    </div>
  );
};

export default CultureHistory;
