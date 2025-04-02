import React, { useEffect, useRef, useState } from "react";
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
import axios from "axios";

const TemplateDestination = { // TODO: REMOVE
  id: "ncOA22d8",
  image: [Image2, Image1, Image2],
  rating: 2.65,
  name: "Wayank Wayank Wayank Wayank  ",
  detail: "Wayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jir",
  isWishlisted: false,
  countRating: 6,
  avgRating: 2.5,
  province: "Nusa Tenggara Selatan",
  location: "Jl. Kartini No.133, Dauh Puri Kaja, Kec. Denpasar Utara, Kota Denpasar, 80231",
  writer: "Kak Gung Wah",
};
const emptyDestination = {
  id: "null",
  image: "...",
  rating: null,
  name: "Undefined",
  detail: "Undefined",
  isWishlisted: false,
  countRating: 0,
  avgRating: 0,
  province: "Undefined",
  location: "Undefined",
  writer: "Unknown",
};


const DestinationPage = () => {

  const onTagChange = () => {
    if(activeTags[2] && activeTags[3]) { // both Newest & Oldest tag activation alternation mechanism
      let newTags = [...activeTags];

      if(prevActiveTags.current[2]) newTags[2] = false;
      else newTags[3] = false;

      prevActiveTags.current = newTags;
      setActiveTag(newTags);

      return;
    }

    // TODO : API Recall and Refresh view
    
    prevActiveTags.current = activeTags;
  };

  useEffect(() => {
    return async () => {
      await axios.get('/api/destinations') // TODO: LOADING
        .then(v => {
          setDestinationList(v.data.data);
        })
        .catch(console.err);
    }
  }, []);
  
  const [destinationList, setDestinationList] = useState([emptyDestination]);
  const [mapDisplay, setMapDisplay] = useState({ pos: [-1.748926, 120.0148634], zoom: 5 });
  const [activeTags, setActiveTag] = useState([true, false, false, false, false]); // 0: Highest Rating, 1: Wishlisted, 2: Newest, 3: Oldest, 4: Written by you
  const prevActiveTags = useRef(activeTags);

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
        <DestinationMap pos={mapDisplay.pos} zoom={mapDisplay.zoom} />
        <DestinationGroup tags={[activeTags, setActiveTag]} destinations={destinationList} />
      </div>
      <JoinUs />
      <Footer />
    </div>
  );
};

export default DestinationPage;
