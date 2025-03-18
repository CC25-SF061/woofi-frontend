import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Image1 from "../assets/logIn/image4.webp";
import BannerLogin from "../components/bannerLogin";
import { Link } from "react-router-dom";

const contactUs = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter email");
      return;
    }

    if (!message.trim()) {
      alert("Please enter your message");
      return;
    }
    alert("Your message sent succesfully");

    setEmail("");
    setMessage("");
  };
  return (
    <>
      <Navbar></Navbar>
      <section className="bg-[#221122] min-h-screen w-full flex items-center justify-center p-8 pt-30 lg:pt-30">
        <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg overflow-hidden shadow-lg bg-[#252527] min-h-[650px]">
          <form className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-10 md:px-8 flex-grow">
            <h1 className="text-2xl md:text-3xl font-inknut-antiqua text-white mb-6 text-center">
              Get In Touch
            </h1>

            <div className="flex flex-col w-full mb-4">
              <p className="font-quicksand text-white pb-2">Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full p-3 font-quicksand rounded text-white border border-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col w-full mb-4">
              <p className="font-quicksand text-white pb-2">Message</p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
                className="w-full p-3 font-quicksand mb-4 rounded text-white border border-white focus:outline-none"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full p-2 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition"
            >
              Submit
            </button>
          </form>

          {/* Image Section */}
          <div className="hidden md:flex md:w-1/2 min-h-screen max-h-[650px]">
            <BannerLogin imageSrc={Image1} />
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};

export default contactUs;
