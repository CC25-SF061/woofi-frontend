import React from "react";
import Navbar from "../components/navbar";
import JoinUs from "../components/joinUs";
import Footer from "../components/footer";
import HeroSection from "../components/heroSection";
import Image1 from "../assets/gallery/image1.png";
import Image2 from "../assets/gallery/image2.png";
import Image3 from "../assets/gallery/lompatBatu.jpeg";
import Image4 from "../assets/gallery/rambuSolo.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";

const images = [Image2, Image3, Image4];

const galleryPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection
        backgroundImage={Image1}
        title="Gallery"
        description="Lorem Ipsum is simply dummy text of the printing and t"
      />
      <div className="flex flex-col px-10 items-center bg-[#221122]">
        <div className="flex flex-col text-center items-center bg-[#252527] text-white px-7 py-12 gap-3 rounded-md">
          <h1 className="font-inknut-antiqua text-2xl">Title</h1>
          <p className="font-quicksand">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quae
            libero, quod vitae doloremque perspiciatis illum ab doloribus fuga
            non animi itaque molestiae dolorem maxime rem, eos mollitia ut
            debitis!
          </p>
        </div>

        <div className="relative w-full h-96 my-10 overflow-hidden rounded-xl">
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
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div class="grid gap-4">
            <div>
              <img
                class="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                class="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                class="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
                alt=""
              />
            </div>
          </div>
          <div class="grid gap-4">
            <div>
              <img
                class="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                class="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                class="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
                alt=""
              />
            </div>
          </div>
          <div class="grid gap-4">
            <div>
              <img
                class="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                class="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                class="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
                alt=""
              />
            </div>
          </div>
          <div class="grid gap-4">
            <div>
              <img
                class="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                class="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                class="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <JoinUs />
      <Footer />
    </div>
  );
};

export default galleryPage;
