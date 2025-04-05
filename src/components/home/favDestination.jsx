import React from 'react';
import bali1 from '../../assets/homePage/image2.webp';
import bali2 from '../../assets/homePage/image3.webp';
import bali3 from '../../assets/homePage/image4.webp';

import jawa1 from '../../assets/gallery/image4.webp'; 
import jawa2 from '../../assets/homePage/image5.webp'; 
import jawa3 from '../../assets/homePage/jawa3.webp'; 

import papua1 from '../../assets/gallery/image8.webp'; 
import papua2 from '../../assets/homePage/papua2.webp'; 
import papua3 from '../../assets/homePage/papua3.webp'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { motion } from 'framer-motion';
import { slideInRight } from '../../util/animation';
import SeeDetail from '../seeDetail';

const FavDestination = () => {
  return (
    <Swiper
      className="swiper absolute inset-0 w-full lg:w-3/5 h-screen lg:h-[720px] md:h-[960]"
      modules={[Autoplay, Pagination, EffectCoverflow]}
      effect="coverflow"
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
          variants={slideInRight}
          className="flex flex-col lg:flex-row h-full items-stretch gap-4"
        >
          {/* Card Kiri */}
          <div className="relative hidden md:block lg:w-1/3 h-full rounded-lg overflow-hidden">
            <img
              src={bali1}
              alt="Destination 1"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>

          {/* Card Tengah */}
          <SeeDetail
            image={bali2}
            title="Wonderful of Bali"
            description="Experience the natural wonders, culture and tradition of Bali-a place where every corner inspires and soothes the soul."
          />

          {/* Card Kanan */}
          <div className="relative hidden md:block lg:w-1/3 h-full rounded-lg overflow-hidden">
            <img
              src={bali3}
              alt="Destination 3"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
        </motion.div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
          variants={slideInRight}
          className="flex flex-col lg:flex-row h-full items-stretch gap-4"
        >
          {/* Card Kiri */}
          <div className="relative hidden md:block lg:w-1/3 h-full rounded-lg overflow-hidden">
            <img
              src={jawa1}  
              alt="Destination 4"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>

          {/* Card Tengah dengan tipe berbeda */}
          <SeeDetail
            image={jawa2}
            title="Magnificent of Java"
            description="Explore the majestic landscapes and rich cultural heritage of Java."
          />

          {/* Card Kanan */}
          <div className="relative hidden md:block lg:w-1/3 h-full rounded-lg overflow-hidden">
            <img
              src={jawa3}
              alt="Destination 5"
              className="object-cover object-center w-full h-full"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
        </motion.div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
          variants={slideInRight}
          className="flex flex-col lg:flex-row h-full items-stretch gap-4"
        >
          {/* Card Kiri */}
          <div className="relative hidden md:block lg:w-1/3 h-full rounded-lg overflow-hidden">
            <img
              src={papua1}  
              alt="Destination 4"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>

          {/* Card Tengah dengan tipe berbeda */}
          <SeeDetail
            image={papua2}
            title="Papua: An Amazing Natural Paradise"
            description="Explore the incredible landscapes and rich cultural heritage of Papua, a place where natural beauty meets authentic tradition."
          />

          {/* Card Kanan */}
          <div className="relative hidden md:block lg:w-1/3 h-full rounded-lg overflow-hidden">
            <img
              src={papua3}
              alt="Destination 5"
              className="object-cover object-center w-full h-full"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
        </motion.div>
      </SwiperSlide>
    </Swiper>
  );
};

export default FavDestination;
 