import React from 'react';
import Navbar from '../components/navbar';
import JoinUs from '../components/joinUs';
import Footer from '../components/footer';
import HeroSection from '../components/heroSection';
import Image1 from '../assets/gallery/image1.webp';
import Image2 from '../assets/gallery/image2.webp';
import Image3 from '../assets/gallery/image3.webp';
import Image4 from '../assets/gallery/image4.webp';
import Image5 from '../assets/gallery/image5.webp';
import Image6 from '../assets/gallery/image6.webp';
import Image7 from '../assets/gallery/image7.webp';
import Image8 from '../assets/gallery/image8.webp';
import Image9 from '../assets/gallery/image9.webp';
import Image10 from '../assets/gallery/image10.webp';
import Image11 from '../assets/gallery/lompatBatu.webp';
import Image12 from '../assets/gallery/rambuSolo.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { fadeInUp } from '../util/animation';
const images = [Image10, Image11, Image12];

const galleryPage = () => {
    return (
        <div>
            <Navbar />
            <HeroSection
                backgroundImage={Image9}
                title="Discover the Beauty of Indonesia"
                highlightedWord="Indonesia"
                description="Explore our curated gallery showcasing Indonesia's stunning landscapes,and unforgettable moments"
            />

            <div className="flex flex-col px-10 items-center bg-[#221122]">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.1 }}
                    variants={fadeInUp}
                    className="flex flex-col text-center items-center bg-[#252527] text-white px-7 py-12 gap-3 rounded-md"
                >
                    <h1 className="font-inknut-antiqua text-2xl">
                        Explore Our{' '}
                        <span className="text-[#FFA666]">Gallery</span>
                    </h1>
                    <p className="font-quicksand w-full md:w-3/4">
                        Immerse yourself in the breathtaking beauty of Indonesia
                        through our gallery. From stunning landscapes to vibrant
                        cultural moments, every picture tells a story. Discover
                        the wonders of Indonesia, one snapshot at a time!
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.1 }}
                    variants={fadeInUp}
                    className="relative w-full h-96 my-10 overflow-hidden rounded-xl"
                >
                    <Swiper
                        modules={[EffectFade, Autoplay, Pagination]}
                        effect="fade"
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop={true}
                        pagination={{ clickable: true }}
                        className="w-full h-full"
                    >
                        {images.map((img, i) => (
                            <SwiperSlide key={i}>
                                <div className="relative w-full h-full">
                                    <img
                                        src={img}
                                        alt={`Slide ${i + 1}`}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.1 }}
                    variants={fadeInUp}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
                >
                    <div className="grid gap-4">
                        <div className="overflow-hidden">
                            <img
                                className="h-full hover:scale-105 transition-transform duration-300 w-full rounded-lg"
                                src={Image1}
                                alt=""
                            />
                        </div>
                        <div className="overflow-hidden">
                            <img
                                className="h-full hover:scale-105 transition-transform duration-300 w-full rounded-lg"
                                src={Image2}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="overflow-hidden">
                            <img
                                className="h-full hover:scale-105 transition-transform duration-300 w-full rounded-lg"
                                src={Image3}
                                alt=""
                            />
                        </div>
                        <div className="overflow-hidden">
                            <img
                                className="h-full hover:scale-105 transition-transform duration-300 w-full rounded-lg"
                                src={Image4}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="overflow-hidden">
                            <img
                                className="h-full hover:scale-105 transition-transform duration-300 w-full rounded-lg"
                                src={Image5}
                                alt=""
                            />
                        </div>
                        <div className="overflow-hidden">
                            <img
                                className="h-full hover:scale-105 transition-transform duration-300 w-full rounded-lg"
                                src={Image6}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="overflow-hidden">
                            <img
                                className="h-full hover:scale-105 transition-transform duration-300 w-full rounded-lg"
                                src={Image7}
                                alt=""
                            />
                        </div>
                        <div className="overflow-hidden">
                            <img
                                className="h-full hover:scale-105 transition-transform duration-300 w-full rounded-lg"
                                src={Image8}
                                alt=""
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
            <JoinUs />
            <Footer />
        </div>
    );
};

export default galleryPage;
