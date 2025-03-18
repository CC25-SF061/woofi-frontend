import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import HeroSection from "../components/heroSection";
import Image1 from "../assets/cultureHistory/image1.webp";
import JoinUs from "../components/joinUs";
import CulturalDiversity from "../components/culture/culturalDiversity";

const CultureHistory = () => {

  return (
    <div>
      <Navbar />
      <HeroSection
        backgroundImage={Image1}
        title="Culture & History Of Indonesia"
        description="Uncovering Indonesia's Colorful Cultural and Historical Wealth"
      />

      {/* Cultural Diversity */}
      <section className="relative bg-[#221122] text-white">
        <div
          className="absolute top-0 w-full z-10"
          style={{
            background:
              "linear-gradient(to bottom, #221122 0%, rgba(34, 17, 34, 0.00) 61%)",
            height: "30%",
          }}
        ></div>
        <div className="px-6 md:px-10 pt-20 pb-30">
          <h1 className="font-inknut-antiqua text-2xl w-fit mb-3">
            <span className="text-[#FFA666]">Cultural</span> Diversity
          </h1>
          <hr className="border-t-2 border-white my-2" />
          <p className="font-quicksand mt-6 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            soluta possimus facilis, tempora quisquam laboriosam sunt placeat
            esse suscipit repellendus earum voluptates vitae ipsum harum
            deleniti rem nam recusandae omnis corrupti tempore quia ducimus
            maxime? Facilis sed officia nihil laudantium ea aliquam eligendi
            maxime. Aliquam numquam distinctio nihil corporis temporibus!
          </p>
        </div>
      </section>

      {/* Indonesian History */}
      <section className="relative bg-[#252527] text-white">
        <div className="px-6 md:px-10 pt-20 pb-30 text-right">
          <h1 className="font-inknut-antiqua text-2xl w-fit mb-3">
            Indonesian <span className="text-[#FFA666]">History</span>
          </h1>
          <hr className="border-t-2 border-white my-2" />
          <p className="font-quicksand mt-6 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            obcaecati eos asperiores fugit nisi necessitatibus maxime, possimus
            aspernatur impedit mollitia odio, nam ut quos eligendi hic eius
            aliquid natus reiciendis. Adipisci rem illo, eos ipsa nam delectus
            expedita accusamus magnam non corporis veniam, vero iste eaque
            atque, est tempore accusantium!
          </p>
        </div>
        <div
          className="absolute bottom-0 w-full"
          style={{
            background:
              "linear-gradient(to top, #221122 0%, rgba(34, 17, 34, 0.00) 61%)",
            height: "30%",
          }}
        ></div>
      </section>

      <CulturalDiversity/>
      <JoinUs />
      <Footer />
    </div>
  );
};

export default CultureHistory;
