import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Image1 from "../assets/logIn/image4.webp";
import BannerLogin from "../components/bannerLogin";
import React, { useState } from "react";

const joinUs = () => {
  const [email, setEmail] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter email.");
      return;
    }

    if (!selectedReason) {
      alert("Please select a reason for requesting the role.");
      return;
    }

    if (!isChecked) {
      alert("Please agree to the terms before submitting a request..");
      return;
    }

    alert("Request sent succesfully!");

    // Reset input setelah berhasil submit
    setEmail("");
    setSelectedReason("");
    setIsChecked(false);
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="bg-[#221122] h-screen p-10">
      <div className="flex h-full rounded-lg overflow-hidden shadow-lg bg-[#252527]">
        <div className="w-1/2 flex flex-col justify-center items-center px-8">
          <h1 className="text-3xl font-inknut-antiqua text-white mb-6">
            Request Role
          </h1>

          {/* Email Input */}
          <div className="flex flex-col w-full mb-4">
            <p className="font-quicksand text-white pb-2">Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full p-3 font-quicksand rounded text-white border border-white bg-transparent focus:outline-none"
            />
          </div>

          {/* Dropdown untuk alasan request role */}
          <div className="flex flex-col w-full mb-4">
            <p className="font-quicksand text-white pb-2">Alasan Request Role</p>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="w-full p-3 font-quicksand rounded text-white border border-white bg-[#333] focus:outline-none"
            >
              <option value="" disabled>Choose a Reason</option>
              <option value="Developer">I Want to be a developer</option>
              <option value="Designer">I Want to be a designer</option>
              <option value="Admin">I Want to be a admin</option>
            </select>
          </div>

          {/* Checkbox untuk validasi */}
          <div className="flex items-center w-full mb-4">
            <input
              type="checkbox"
              id="terms"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="mr-2 w-4 h-4 accent-[#FFA666]"
            />
            <label htmlFor="terms" className="text-white font-quicksand">
              I agree to the terms of the role request.
            </label>
          </div>

          {/* Tombol Submit */}
          <button
            onClick={handleSubmit}
            className="w-full p-2 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition"
          >
            Submit
          </button>
        </div>

        {/* Banner Login */}
        <BannerLogin imageSrc={Image1} />
      </div>
    </div>
      <Footer></Footer>
    </>
  );
};

export default joinUs;
