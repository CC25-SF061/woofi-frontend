import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import SearchDestination from "../components/searchDestination";
import DestinationMap from "../components/destination/destinationMap";
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
    images: [Image2, Image1, Image2],
    rating: 2.65,
    name: "Wayank Wayank Wayank Wayank  ",
    desc: "Wayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jir",
    wishlisted: false,
    countRating: 6,
    avgRating: 2.5,
    location: "Jl. Kartini No.133, Dauh Puri Kaja, Kec. Denpasar Utara, Kota Denpasar, Bali 80231",
    writer: "Kak Gung Wah",
  },
  {
    id: "vQox27X1",
    images: [Image3],
    rating: 3.86,
    name: "OMAYGAT",
    desc: "LOMPATAN SUPERRRR",
    wishlisted: false,
    countRating: 6,
    avgRating: 2.5,
    location: "Jl. Kartini No.133, Dauh Puri Kaja, Kec. Denpasar Utara, Kota Denpasar, Bali 80231",
    writer: "Kak Sulih",
  },
  {
    id: "vzox27X1",
    images: [Image3],
    rating: 3.75,
    name: "OMAYGAT",
    desc: "LOMPATAN SUPERRRR",
    wishlisted: false,
    countRating: 6,
    avgRating: 2.5,
    location: "Jl. Kartini No.133, Dauh Puri Kaja, Kec. Denpasar Utara, Kota Denpasar, Bali 80231",
    writer: "Dik Yana",
  },
  {
    id: "vQox7X1",
    images: [Image3],
    rating: 2.5,
    name: "OMAYGAT",
    desc: "LOMPATAN",
    wishlisted: false,
    countRating: 6,
    avgRating: 2.5,
    location: "Jl. Kartini No.133, Dauh Puri Kaja, Kec. Denpasar Utara, Kota Denpasar, Bali 80231",
    writer: "Mr blabla lorem ipsum dolor sit anj",
  }
]


const DestinationPage = () => {

  const onTagChange = () => {
    // TODO : API Recall and Refresh view
  };
  
  const [destinationList, setDestinationList] = useState(destinations);
  const [activeTags, setActiveTag] = useState([true, false, false, false, false]); // 0: Highest Rating, 1: Wishlisted, 2: Newest, 3: Oldest, 4: Written by you
  
  useEffect(() => {
    onTagChange();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTags]);

  return (
    <div>
      <Navbar />
      <HeroSection
        backgroundImage={Image1}
        title="Explore the Best Destinations"
        highlightedWord="Destinations"
        description="Explore the best places in Indonesia with complete information."
      />
      <div className="flex flex-col px-10 items-center bg-[#221122] w-full">
        <SearchDestination />
        <DestinationMap pos={[-1.748926, 120.0148634]} />
        <DestinationGroup tags={[activeTags, setActiveTag]} destinations={destinationList} />
      </div>
      <JoinUs />
      <Footer />
    </div>
  );
};

export default DestinationPage;
