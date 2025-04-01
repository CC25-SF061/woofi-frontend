import React, { useState } from "react";
import Profile from "../../assets/navbar/Icon.webp";
import Notification from "../../assets/profile/ic--baseline-notifications-none.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Sidebar from "../../components/profile/sidebar";
import { HiX } from "react-icons/hi";
import { RiMenu2Line } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import DestinationCard from "../../components/destination/DestinationCard";
import Image1 from "../../assets/cultureHistory/traditions/traditions3.webp";
import Image2 from "../../assets/cultureHistory/traditional-dance/Dance3.webp";
import Image3 from "../../assets/cultureHistory/traditional-dance/Dance3.webp";
import Image4 from "../../assets/cultureHistory/traditional-dance/Dance3.webp";
import Image5 from "../../assets/cultureHistory/traditional-dance/Dance3.webp";
import Image6 from "../../assets/cultureHistory/traditional-dance/Dance3.webp";
import Image7 from "../../assets/cultureHistory/traditional-dance/Dance3.webp";
import Image8 from "../../assets/cultureHistory/traditional-dance/Dance3.webp";

const Wishlist = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const wishlistDestinations = [
    {
      id: 1,
      picture: [Image1],
      name: "Bali Beach Paradise",
      desc: "Enjoy the stunning beaches and vibrant culture of Bali...",
      rating: 4.5,
    },
    {
      id: 2,
      picture: [Image2],
      name: "Mount Fuji Adventure",
      desc: "Experience the breathtaking view of Mount Fuji and its surroundings...",
      rating: 4.7,
    },
    {
      id: 3,
      picture: [Image3],
      name: "Mount Fuji Adventure",
      desc: "Experience the breathtaking view of Mount Fuji and its surroundings...",
      rating: 4.7,
    },
    {
      id: 4,
      picture: [Image4],
      name: "Mount Fuji Adventure",
      desc: "Experience the breathtaking view of Mount Fuji and its surroundings...",
      rating: 4.7,
    },
    {
      id: 5,
      picture: [Image5],
      name: "Mount Fuji Adventure",
      desc: "Experience the breathtaking view of Mount Fuji and its surroundings...",
      rating: 4.7,
    },
    {
      id: 6,
      picture: [Image6],
      name: "Mount Fuji Adventure",
      desc: "Experience the breathtaking view of Mount Fuji and its surroundings...",
      rating: 4.7,
    },
    {
      id: 7,
      picture: [Image7],
      name: "Mount Fuji Adventure",
      desc: "Experience the breathtaking view of Mount Fuji and its surroundings...",
      rating: 4.7,
    },
    {
      id: 8,
      picture: [Image8],
      name: "Mount Fuji Adventure",
      desc: "Experience the breathtaking view of Mount Fuji and its surroundings...",
      rating: 4.7,
    },
  ];

  return (
    <div>
      <div className="w-full bg-[#221122] flex lg:h-screen items-center justify-center p-5 lg:p-10 gap-5 text-white">
        {/* Header Mobile */}
        <div className="lg:hidden p-5 fixed z-60 top-0 w-full bg-[#252527] flex justify-between items-center shadow-xl">
          <button
            className="bg-[#FFA666] p-2 rounded-lg text-black cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <HiX size={24} /> : <RiMenu2Line size={24} />}
          </button>
          <button className="bg-[#FFA666] text-black font-quicksand p-2 rounded-lg cursor-pointer">
            <IoIosNotifications size={24} />
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#252527] transform transition-transform duration-300 ease-in-out shadow-lg lg:hidden lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </div>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        <div className="hidden lg:flex h-full">
          <Sidebar />
        </div>

        <div className="flex flex-col flex-1 rounded-lg overflow-hidden shadow-lg bg-[#252527] m-5 lg:m-0 h-full lg:w-3/4 mt-20 overflow-y-auto">
          <div className="w-full max-w-6xl flex flex-col items-center relative">
            <div className="mb-5 sticky top-0 bg-[#252527] p-3 pb-0 w-full shadow-md z-10">
              <h1 className="text-center font-quicksand text-2xl">
                Wishlist Destination
              </h1>
              <hr className="border-t-2 border-white my-3 rounded" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-5 pb-5">
              {wishlistDestinations.map((destination) => (
                <div
                  key={destination.id}
                  className="flex flex-col "
                >
                  <DestinationCard
                    id={destination.id}
                    picture={destination.picture}
                    name={destination.name}
                    desc={destination.desc}
                    rating={destination.rating}
                    onclick={() =>
                      console.log("Clicked on destination", destination.id)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
