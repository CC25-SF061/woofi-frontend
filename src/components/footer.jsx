import React from "react";
import logo from "../assets/navbar/logo.webp";
import instagram from "../assets/footer/mdi--instagram.svg";
import twitter from "../assets/footer/prime--twitter.svg";
import youtube from "../assets/footer/mdi--youtube.svg";
import whatsapp from "../assets/footer/mingcute--whatsapp-fill.svg";
import gmail from "../assets/footer/ic--baseline-email.svg";

const footer = () => {
  return (
    <div>
      <div className="py-5 px-10 bg-neutral-800 text-neutral-100 flex flex-col gap-5">
        <div className="flex justify-center">
          <img src={logo} alt="" className="w-28 h-auto" />
        </div>
        <div className="flex justify-between">
          <div className="w-xs">
            <h1 className="font-quicksand text-2xl pb-2">Sosial Media</h1>
            <div className="flex items-center gap-4">
              <div>
                <img src={instagram} alt="Instagram" className="w-10" />
              </div>
              <div>
                <img src={twitter} alt="Twitter/X" className="w-10" />
              </div>
              <div>
                <img src={youtube} alt="Youtube" className="w-10" />
              </div>
            </div>
          </div>
          <div className="w-xs text-center font-quicksand tracking-wider">
            <h1 className="text-2xl pb-2">Woofi Team</h1>
            <p className="">
              Lorem Ipsum is simply dummy text of the printing and tLorem Ipsum
              is simply dummy text of the printing and{" "}
            </p>
          </div>
          <div className="w-xs font-quicksand">
            <h1 className="text-2xl pb-2">Contact Us</h1>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <img src={whatsapp} alt="WhatsApp" className="w-10" />
                <p>082147700295</p>
              </div>
              <div className="flex gap-2 items-center">
                <img src={gmail} alt="Email" className="w-10" />
                <p>WoofiTeam@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center font-quicksand">
          <p>Copyright © 2025. Woofi Team</p>
        </div>
      </div>
    </div>
  );
};

export default footer;
