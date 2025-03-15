import React from 'react'
import HeroBanner from '../components/heroBanner'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Borobudur from "../assets/homePage/borobudur.png";
import GunungRinjani from "../assets/homePage/gunung-rinjani.jpeg";
import RajaAmpat from "../assets/homePage/raja-ampat.jpeg";

const backgroundImages = [
  "/src/assets/homePage/borobudur.png",
  "/src/assets/homePage/gunung-rinjani.jpeg",
  "/src/assets/homePage/raja-ampat.jpeg",
];

const home = () => {
  return (
    <>
        <Navbar></Navbar>
        <HeroBanner
          backgroundImages={backgroundImages}
          title="Indonesia's natural beauty"
          description="Discover the natural beauty, culture and history of Indonesia in one place."
        />
        <Footer></Footer>
    </>
  )
}

export default home
