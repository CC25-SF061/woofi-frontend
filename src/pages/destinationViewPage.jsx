import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import DestinationViewHeader from "../components/destination/view/destinationHeader";
import DestinationContent from "../components/destination/view/destinationContent";
import Footer from "../components/footer";
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
    desc: "Wayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jirWayank Lorem Ipsum jir",
    wishlisted: false,
    countRating: 6,
    avgRating: 2.5,
    location: "Jl. Kartini No.133, Dauh Puri Kaja, Kec. Denpasar Utara, Kota Denpasar, Bali 80231",
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
  }
]

const DestinationViewPage = () => {

  const { destinationId } = useParams();
  const navigate = useNavigate();

  const destination = destinations[0];

  return destination ? (
    <div>
      <Navbar />
      <main className="flex flex-col px-10 pt-25 py-10 items-center bg-[#221122]">
        <DestinationViewHeader name={destination.name} images={destination.images} location={destination.location} avgRating={destination.avgRating} countRating={destination.countRating} isWishlist={destination.wishlisted} />
        <DestinationContent name={destination.name} desc={destination.desc} writer="mr. blabla"/>
      </main>
      <Footer />
    </div>
  ) : (
    <div>
      <Navbar />
      <Footer />
    </div>
  );
};

export default DestinationViewPage;
