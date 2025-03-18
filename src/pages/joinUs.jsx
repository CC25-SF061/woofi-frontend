import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Image1 from "../assets/logIn/image4.webp";
import BannerLogin from "../components/bannerLogin";
import Logo from "../assets/navbar/logo.webp";
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
      <section className="bg-[#221122] min-h-screen w-full flex items-center justify-center px-5 pb-5 pt-20 md:px-10 md:pb-10 md:pt-25">
        <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg overflow-hidden shadow-lg bg-[#252527] min-h-[650px]">
          {/* Form section */}
          <form className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-10 md:px-8 flex-grow">
            <img src={Logo} alt="Logo Woofi" className="w-36 mb-5 lg:hidden" />
            <h1 className="text-2xl md:text-3xl font-inknut-antiqua text-white mb-6 text-center">
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
              <p className="font-quicksand text-white pb-2">
                Alasan Request Role
              </p>
              <div className="relative">
                <select
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-full p-3 font-quicksand rounded text-white border border-white bg-[#333] focus:outline-none appearance-none"
                >
                  <option value="" disabled>
                    Choose a Reason
                  </option>
                  <option value="Developer">I Want to be a developer</option>
                  <option value="Designer">I Want to be a designer</option>
                  <option value="Admin">I Want to be an admin</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </div>
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

export default joinUs;
