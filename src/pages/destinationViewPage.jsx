import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import DestinationViewHeader from "../components/destination/view/destinationHeader";
import DestinationContent from "../components/destination/view/destinationContent";
import Footer from "../components/footer";

import NotFound from './notFound';

import Image1 from "../assets/gallery/image1.webp";
import Image2 from "../assets/gallery/image2.webp";
import Image3 from "../assets/gallery/lompatBatu.webp";
import Image4 from "../assets/gallery/rambuSolo.webp";

const destinations = [
  {
    id: "ncOA22d8",
    images: [Image2, Image1, Image2],
    rating: 2.65,
    name: "Wayank Wayank Wayank Wayank  ",
    detail: "Wayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jir",
    wishlisted: false,
    countRating: 6,
    avgRating: 2.5,
    province: "Nusa Tenggara Selatan",
    location: "Jl. Kartini No.133, Dauh Puri Kaja, Kec. Denpasar Utara, Kota Denpasar, 80231",
    writer: "Kak Gung Wah",
  },
  {
    id: "vQox27X1",
    images: [Image3],
    rating: 3.86,
    name: "OMAYGAT",
    detail: "LOMPATAN SUPERRRR",
    wishlisted: false,
    countRating: 6,
    avgRating: 2.5,
    province: "Papua Nugini",
    location: "Jl. Kartini No.133, Dauh Puri Kaja, Kec. Denpasar Utara, Kota Denpasar, 80231",
    writer: "Kak Sulih",
  },
  {
    id: "vzox27X1",
    images: [Image3],
    rating: 3.75,
    name: "OMAYGAT",
    detail: "LOMPATAN SUPERRRR",
    wishlisted: false,
    countRating: 6,
    avgRating: 2.5,
    province: "Kalimantan",
    location: "Jl. Kartini No.133, Dauh Puri Kaja, Kec. Denpasar Utara, Kota Denpasar, 80231",
    writer: "Dik Yana",
  },
  {
    id: "vQox7X1",
    images: [Image3],
    rating: 2.5,
    name: "OMAYGAT",
    detail: "LOMPATAN",
    wishlisted: false,
    countRating: 6,
    avgRating: 2.5,
    province: "Kalimantan",
    location: "Jl. Kartini No.133, Dauh Puri Kaja, Kec. Denpasar Utara, Kota Denpasar, 80231",
    writer: "Mr blabla lorem ipsum dolor sit anj",
  }
]


const DestinationViewPage = () => {

  const { destinationId } = useParams();

  const [destination, setDestination] = useState(null);

  useEffect(() => {
    // TODO: Make api call to backend instead
    const foundDestination = destinations.filter(v => v.id === destinationId);
    if (foundDestination.length > 1) console.warn(`There are duplicate Destination Id (${destinationId})`)
    
    setDestination(foundDestination[0] || null);
  }, [destinationId]);

  return destination ? (
    <div>
      <Navbar />
      <main className="flex flex-col px-10 pt-25 py-10 items-center bg-[#221122]">
        <DestinationViewHeader name={destination.name} images={destination.images} location={destination.location} province={destination.province} avgRating={destination.avgRating} countRating={destination.countRating} isWishlist={destination.wishlisted} />
        <DestinationContent name={destination.name} detail={destination.detail} writer={destination.writer}/>
      </main>
      <Footer />
    </div>
  ) : (
    <div>
      <NotFound />
    </div>
  );
};

export default DestinationViewPage;
