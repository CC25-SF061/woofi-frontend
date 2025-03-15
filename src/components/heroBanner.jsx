import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroBanner = ({ backgroundImages = [], title, description }) => {
  console.log("Background Images:", backgroundImages);
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center text-white">
      {/* Teks yang selalu muncul */}
      <div className="absolute z-10 text-center">
        <h1 className="mb-5 text-5xl font-inknut-antiqua uppercase">{title}</h1>
        <p className="mb-5 text-3xl font-quicksand">{description}</p>
      </div>

      {/* Swiper untuk background berganti otomatis */}
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="absolute inset-0 w-full h-full"
      >
        {backgroundImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
