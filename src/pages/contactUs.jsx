import React,{useState} from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Image1 from "../assets/logIn/image4.webp";
import BannerLogin from "../components/bannerLogin";
import { Link } from "react-router-dom";

const contactUs = () => {
  const[email,setEmail] = useState("");
  const[message,setMessage] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(!email.trim()){
      alert("Please enter email");
      return;
    }

    if(!message.trim()){
      alert("Please enter your message");
      return;
    }
    alert("Your message sent succesfully")

    setEmail("");
    setMessage("");
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="bg-[#221122] h-screen p-10">
        <div className="flex h-full rounded-lg overflow-hidden shadow-lg bg-[#252527]">
          <div className="w-1/2 flex flex-col justify-center items-center px-8">
            <h1 className="text-3xl font-inknut-antiqua text-white mb-6">
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
              className="w-full p-2 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition">
              Submit
            </button>
          </div>

          <BannerLogin imageSrc={Image1} />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default contactUs;
