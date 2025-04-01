import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import { slideInUp } from "../util/animation";
const HeroBanner = ({
  backgroundImages = [],
  title,
  highlightedWord,
  description,
}) => {
  const titleParts = title.split(" ");

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ staggerChildren: 0.15, once: true, amount: 0.1 }}
        variants={slideInUp}
        className="absolute z-10 text-white px-8 lg:px-0"
      >
        <h1 className="mb-5 lg:text-5xl text-3xl font-inknut-antiqua uppercase">
          {titleParts.map((word, index) => (
            <span
              key={index}
              className={word === highlightedWord ? "text-[#FFA666]" : ""}
            >
              {word}{" "}
            </span>
          ))}
        </h1>
        <p className="mb-5 lg:text-3xl text-xl font-quicksand">{description}</p>
      </motion.div>

      <Swiper
        className="swiper absolute inset-0 w-full h-screen"
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        {backgroundImages.map((image, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div
                className="absolute bottom-0 w-full"
                style={{
                  background:
                    "linear-gradient(to top, #221122 0%, rgba(34, 17, 34, 0.00) 61%)",
                  height: "60%",
                }}
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
