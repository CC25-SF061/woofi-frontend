import React from "react";
import logo from "../assets/navbar/logo.webp";
import instagram from "../assets/footer/mdi--instagram.svg";
import twitter from "../assets/footer/prime--twitter.svg";
import youtube from "../assets/footer/mdi--youtube.svg";
import whatsapp from "../assets/footer/mingcute--whatsapp-fill.svg";
import gmail from "../assets/footer/ic--baseline-email.svg";

const Footer = () => {
  return (
    <footer className="py-5 px-6 md:px-10 bg-neutral-800 text-neutral-100 flex flex-col gap-5">
      {/* Logo Section */}
      <div className="flex justify-center border-t border-neutral-700 pt-4">
        <img src={logo} alt="Logo" className="w-28 h-auto" />
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0 text-center md:text-left">
        {/* Social Media */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
          <h1 className="font-quicksand text-2xl pb-2">Sosial Media</h1>
          <div className="flex justify-center md:justify-start items-center gap-4">
            <img src={instagram} alt="Instagram" className="w-6 md:w-8" />
            <img src={twitter} alt="Twitter/X" className="w-6 md:w-8" />
            <img src={youtube} alt="Youtube" className="w-6 md:w-8" />
          </div>
        </div>

        {/* Woofi Team */}
        <div className="w-full text-center md:w-1/3 font-quicksand tracking-wider">
          <h1 className="text-2xl pb-2">Woofi Team</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is
            simply dummy text of the printing and
          </p>
        </div>

        {/* Contact Us */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-end">
          <h1 className="text-2xl pb-2">Contact Us</h1>
          <div className="flex flex-col gap-2 items-center md:items-end">
            <div className="flex gap-2 items-center">
              <img src={whatsapp} alt="WhatsApp" className="w-5 md:w-7" />
              <p>082147700295</p>
            </div>
            <div className="flex gap-2 items-center">
              <img src={gmail} alt="Email" className="w-5 md:w-7" />
              <p>WoofiTeam@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center font-quicksand mt-4 border-t border-neutral-700 pt-4">
        <p>Copyright © 2025. Woofi Team</p>
      </div>
    </footer>
  );
};

export default Footer;
