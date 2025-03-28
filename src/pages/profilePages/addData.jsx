import React, { useState } from "react";
import Profile from "../../assets/navbar/Icon.webp";
import Sidebar from "../../components/profile/sidebar";
import { HiX } from "react-icons/hi";
import { RiMenu2Line } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import ErrorConstant from "../../util/ErrorConstant";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddData = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageLink: "",
    location: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null});
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!formData.title.trim()) {
      validationErrors.title = "Title field cannot be empty!";
    }
    if (!formData.description.trim()) {
      validationErrors.description = "Description field cannot be empty!";
    }
    if (!formData.imageLink.trim()) {
      validationErrors.imageLink = "Image link field cannot be empty!";
    }
    if (!formData.location.trim()) {
      validationErrors.location = "Location field cannot be empty!";
    }

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Jika validasi berhasil
    toast.success("Data added successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    // Reset form setelah submit
    setFormData({
      title: "",
      description: "",
      imageLink: "",
      location: "",
    });
    setErrors({});
  };

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

        <div className="flex flex-col flex-1 rounded-lg overflow-hidden shadow-lg bg-[#252527] p-5 m-5 lg:m-0 h-full lg:w-3/4 mt-20">
          <div className="flex justify-between items-center border-white border-b-2 pb-5 rounded-b-lg">
            <div className="flex flex-row gap-3 items-center">
              <img src={Profile} alt="Profile" className="rounded-full w-20" />
              <div className="flex flex-col gap-2">
                <h1 className="font-inknut-antiqua text-3xl">User 1</h1>
                <p className="font-quicksand">You have a writer role</p>
              </div>
            </div>
            <div className="hidden lg:flex">
              <button className="border-white border-2 text-white font-quicksand p-2 rounded-lg cursor-pointer">
                <IoIosNotifications size={24} />
              </button>
            </div>
          </div>

          <h1 className="font-inknut-antiqua text-2xl text-center my-4">
            Add Destination
          </h1>

          <div className="flex flex-col lg:flex-row lg:gap-10">
            <div className="flex-1 flex flex-col lg:gap-2">
              <div className="flex flex-col mb-2 lg:mb-0">
                <p className="font-quicksand text-white pb-2">Title</p>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Input Title"
                  className={`flex-3 p-3 font-quicksand rounded text-white border ${
                    errors.title ? "border-red-500" : "border-white"
                  } bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]`}
                />
                <div className="min-h-[20px]">
                  {errors.title && (
                    <div className="text-red-500 text-sm">{errors.title}</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col mb-2 lg:mb-0">
                <p className="font-quicksand text-white pb-2">Description</p>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Input Description"
                  rows={4}
                  className={`flex-3 p-3 font-quicksand rounded text-white border ${
                    errors.description ? "border-red-500" : "border-white"
                  } bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666] resize-none`}
                ></textarea>
                <div className="min-h-[20px]">
                  {errors.description && (
                    <div className="text-red-500 text-sm">
                      {errors.description}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col lg:gap-2">
              <div className="flex flex-col mb-2 lg:mb-0">
                <p className="font-quicksand text-white pb-2">Link Image</p>
                <input
                  type="text"
                  name="imageLink"
                  value={formData.imageLink}
                  onChange={handleChange}
                  placeholder="Image Link"
                  className={`flex-3 p-3 font-quicksand rounded text-white border ${
                    errors.imageLink ? "border-red-500" : "border-white"
                  } bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]`}
                />
                <div className="min-h-[20px]">
                  {errors.imageLink && (
                    <div className="text-red-500 text-sm">
                      {errors.imageLink}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col mb-2 lg:mb-0">
                <p className="font-quicksand text-white pb-2">Location</p>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Input Location"
                  className={`flex-3 p-3 font-quicksand rounded text-white border ${
                    errors.location ? "border-red-500" : "border-white"
                  } bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]`}
                />
                <div className="min-h-[20px]">
                  {errors.location && (
                    <div className="text-red-500 text-sm">
                      {errors.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="font-bold mt-5 lg:mt-auto p-3 bg-[#FFA666] text-black font-quicksand rounded hover:bg-orange-500 transition cursor-pointer"
          >
            Add Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddData;
