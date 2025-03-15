import React from "react";
import Navbar from "../components/navbar";
import JoinUs from "../components/joinUs";
import Footer from "../components/footer";
import HeroSection from "../components/heroSection";
import Image1 from "../assets/gallery/image1.png";

const galleryPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection
        backgroundImage={Image1}
        title="Gallery"
        description="Lorem Ipsum is simply dummy text of the printing and t"
      />
      <JoinUs />
      <Footer />
    </div>
  );
};

export default galleryPage;
