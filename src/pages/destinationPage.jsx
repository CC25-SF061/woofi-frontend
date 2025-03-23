import React from "react";
import Navbar from "../components/navbar";
import SearchDestination from "../components/searchDestination";
import DestinationGroup from "../components/destination/destinationGroup";
import JoinUs from "../components/joinUs";
import Footer from "../components/footer";
import HeroSection from "../components/heroSection";
import Image1 from "../assets/gallery/image1.webp";
import Image2 from "../assets/gallery/image2.webp";
import Image3 from "../assets/gallery/lompatBatu.webp";
import Image4 from "../assets/gallery/rambuSolo.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";

const destinations = [
  {
    id: "ncOA22d8",
    picture: Image2,
    rating: 2.65,
    name: "Wayank Wayank Wayank Wayank  ",
    desc: "Wayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jir"
  },
  {
    id: "vQox27X1",
    picture: Image3,
    rating: 3.86,
    name: "OMAYGAT",
    desc: "LOMPATAN SUPERRRR"
  },
  {
    id: "vzox27X1",
    picture: Image3,
    rating: 3.75,
    name: "OMAYGAT",
    desc: "LOMPATAN SUPERRRR"
  },
  {
    id: "vQox7X1",
    picture: Image3,
    rating: 2.5,
    name: "OMAYGAT",
    desc: "LOMPATAN"
  }
]

const destinationPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection
        backgroundImage={Image1}
        title="Explore the Best Destinations"
        description="Explore the best places in Indonesia with complete information."
      />
      <div className="flex flex-col px-10 items-center bg-[#221122] w-full">
        <SearchDestination></SearchDestination>
        <DestinationGroup destinations={destinations}></DestinationGroup>
      </div>
      <JoinUs />
      <Footer />
    </div>
  );
};

export default destinationPage;
