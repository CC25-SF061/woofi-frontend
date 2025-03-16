import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import HeroSection from "../components/heroSection";
import Image1 from "../assets/cultureHistory/image1.webp";
import JoinUs from "../components/joinUs";
import Image2 from "../assets/cultureHistory/image2.webp";
import Image3 from "../assets/cultureHistory/image3.webp";
import Image4 from "../assets/cultureHistory/image4.webp";
import Image5 from "../assets/cultureHistory/image5.webp";
import Image6 from "../assets/cultureHistory/image6.webp";
import Image7 from "../assets/cultureHistory/image7.webp";

const cultureHistory = () => {
  return (
    <div>
      <Navbar />
      <HeroSection
        backgroundImage={Image1}
        title="Culture & History Of Indonesia"
        description="Uncovering Indonesia's Colorful Cultural and Historical Wealth"
      />
      {/* Cultural Diversity */}
      <div className="relative bg-[#221122] text-white">
        <div
          className="absolute top-0 w-full z-10"
          style={{
            background:
              "linear-gradient(to bottom, #221122 0%, rgba(34, 17, 34, 0.00) 61%)",
            height: "30%",
          }}
        ></div>
        <div className="px-10 pt-20 pb-30">
          <div className="w-md">
            <h1 className="font-inknut-antiqua text-2xl w-fit ml-5 mb-3">
              <span className="text-[#FFA666]">Cultural</span> Diversity
            </h1>
            <hr className="w-full border-t-2 border-white my-2" />
          </div>
          <p className="font-quicksand mt-6 text-lg">
            Lorem Ipsum is simply dummy text of the printing and tLorem Ipsum is
            simply dummy text of the printing and tLorem Ipsum is simply dummy
            text of the printing and t Ipsum is simply dummy text of the
            printing and tLorem Ipsum is simply dummy text of the printing and
            tLorem Ipsum is simply dummy text of the printing and t Ipsum is
            simply dummy text of the printing and tLorem Ipsum is simply dummy
            text of the printing and tLorem Ipsum is simply dummy text of the
            printing and t
          </p>
        </div>
      </div>

      {/* Indonesian History */}
      <div className="relative bg-[#252527] text-white">
        <div className="px-10 pt-20 pb-30 flex flex-col items-end text-right">
          <div className="w-md flex flex-col items-end text-right">
            <h1 className="font-inknut-antiqua text-2xl w-fit mb-3">
              Indonesian <span className="text-[#FFA666]">History</span>
            </h1>
            <hr className="w-full border-t-2 border-white my-2" />
          </div>

          <p className="font-quicksand mt-6 text-lg">
            Lorem Ipsum is simply dummy text of the printing and tLorem Ipsum is
            simply dummy text of the printing and tLorem Ipsum is simply dummy
            text of the printing and t Ipsum is simply dummy text of the
            printing and tLorem Ipsum is simply dummy text of the printing and
            tLorem Ipsum is simply dummy text of the printing and t Ipsum is
            simply dummy text of the printing and tLorem Ipsum is simply dummy
            text of the printing and tLorem Ipsum is simply dummy text of the
            printing and t
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
      </div>

      {/* Cultural Diversity of Indonesia */}
      <div className="relative bg-[#221122] text-white py-20 flex flex-col items-center justify-center">
        <h1 className="font-inknut-antiqua text-3xl">
          <span className="text-[#FFA666]">Cultural Diversity</span> of
          Indonesia
        </h1>
        <div className="w-5xl">
          <div className="flex divide-x-2 divide-white rounded-lg overflow-hidden justify-center mt-10">
            <button className="px-6 py-2 text-lg font-quicksand hover:bg-[#FFA666] hover:text-[#221122] transition-all">
              Traditional Arts
            </button>
            <button className="px-6 py-2 text-lg font-quicksand hover:bg-[#FFA666] hover:text-[#221122] transition-all">
              Traditional Music
            </button>
            <button className="px-6 py-2 text-lg font-quicksand hover:bg-[#FFA666] hover:text-[#221122] transition-all">
              Traditions
            </button>
            <button className="px-6 py-2 text-lg font-quicksand hover:bg-[#FFA666] hover:text-[#221122] transition-all">
              Traditional Clothes
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-10">
            <div className="bg-[#342034] p-4 rounded-lg shadow-lg relative">
              <div className="relative">
                <img
                  src={Image2}
                  alt="Angklung"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
              </div>
              <p className="font-quicksand text-center mt-2">
                Angklung - West Java
              </p>
            </div>

            <div className="bg-[#342034] p-4 rounded-lg shadow-lg relative">
              <div className="relative">
                <img
                  src={Image3}
                  alt="Gamelan"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
              </div>
              <p className="font-quicksand text-center mt-2">
                Gamelan - Bali/Java
              </p>
            </div>

            <div className="bg-[#342034] p-4 rounded-lg shadow-lg relative">
              <div className="relative">
                <img
                  src={Image4}
                  alt="Sasando"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
              </div>
              <p className="font-quicksand text-center mt-2">Sasando - NTT</p>
            </div>

            <div className="bg-[#342034] p-4 rounded-lg shadow-lg relative">
              <div className="relative">
                <img
                  src={Image5}
                  alt="Rebab"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
              </div>
              <p className="font-quicksand text-center mt-2">
                Rebab - Java/Sumatera
              </p>
            </div>

            <div className="bg-[#342034] p-4 rounded-lg shadow-lg relative">
              <div className="relative">
                <img
                  src={Image6}
                  alt="Saluang"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
              </div>
              <p className="font-quicksand text-center mt-2">
                Saluang - West Sumatera
              </p>
            </div>

            <div className="bg-[#342034] p-4 rounded-lg shadow-lg relative">
              <div className="relative">
                <img
                  src={Image7}
                  alt="Japen"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
              </div>
              <p className="font-quicksand text-center mt-2">
                Japen - Central Kalimantan
              </p>
            </div>
          </div>
        </div>
      </div>
      <JoinUs />
      <Footer />
    </div>
  );
};

export default cultureHistory;
