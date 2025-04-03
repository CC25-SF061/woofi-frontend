import React, { useState } from "react";
import Sidebar from "../../components/profile/sidebar";
import { HiX, HiDotsHorizontal } from "react-icons/hi";
import { RiMenu2Line } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import DestinationCard from "../../components/destination/destinationCard";
import { IoClose } from "react-icons/io5";

import Image1 from "../../assets/cultureHistory/traditions/traditions3.webp";
import Image2 from "../../assets/cultureHistory/traditional-dance/Dance3.webp";
import Image3 from "../../assets/cultureHistory/traditional-dance/Dance3.webp";

const DataDestination = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
  const [selectedItemToEdit, setSelectedItemToEdit] = useState(null);

  const handleDelete = () => {
    console.log("Deleted item", selectedItemToDelete.id);
    setSelectedItemToDelete(null);
  };

  const wishlistDestinations = [
    {
      id: 1,
      images: [Image1],
      name: "Bali Beach Paradise",
      detail: "Enjoy the stunning beaches and vibrant culture of Bali...",
      avgRating: 4.5,
    },
    {
      id: 2,
      images: [Image2],
      name: "Mount Fuji Adventure",
      detail:
        "Experience the breathtaking view of Mount Fuji and its surroundings...",
      avgRating: 4.7,
    },
    {
      id: 3,
      images: [Image3],
      name: "Tokyo City Lights",
      detail:
        "Explore the dazzling nightlife and towering skyscrapers of Tokyo...",
      avgRating: 4.8,
    },
  ];

  return (
    <div>
      <div className="w-full bg-[#221122] flex lg:h-screen items-center justify-center p-5 lg:p-10 gap-5 text-white">
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
                Data Destination
              </h1>
              <hr className="border-t-2 border-white my-3 rounded" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full px-5 pb-5">
              {wishlistDestinations.map((element, order) => (
                <DestinationCard
                  key={order}
                  id={element.id}
                  order={order}
                  picture={element.images[0]}
                  name={element.name}
                  detail={element.detail}
                  rating={element.avgRating}
                  // onclick={onCardClick}
                  onRequestDelete={(item) => setSelectedItemToDelete(item)}
                  setSelectedItemToEdit={(item) => setSelectedItemToEdit(item)}
                  optionsIcon={<HiDotsHorizontal size={24} className="cursor-pointer text-white" />}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedItemToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-80 backdrop-blur-md z-50 font-quicksand">
          <div className="relative p-4 w-full max-w-lg bg-white rounded-lg shadow-lg dark:bg-gray-700">
            <div className="flex items-center justify-between border-b p-4 rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Confirm Delete
              </h3>
              <button
                onClick={() => setSelectedItemToDelete(null)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-sm text-xl cursor-pointer"
              >
                <IoClose />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Are you sure you want to delete {" "}
                <span className="text-red-600 font-bold">{selectedItemToDelete.name}</span>?
              </p>
            </div>
            <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b dark:border-gray-600 gap-3">
              <button
                onClick={() => setSelectedItemToDelete(null)}
                className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedItemToEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-80 backdrop-blur-md z-50 font-quicksand">
          <div className="relative p-4 w-full max-w-lg bg-white rounded-lg shadow-lg dark:bg-gray-700 
            max-h-[80vh] overflow-y-auto"> {/* Tambahkan max-h dan overflow-y-auto */}

            <div className="flex items-center justify-between border-b p-4 rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Destination
              </h3>
              <button
                onClick={() => setSelectedItemToEdit(null)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-sm text-xl cursor-pointer"
              >
                <IoClose />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Edit Name */}
              <label className="block text-gray-700 dark:text-gray-300">Destination Name:</label>
              <input
                type="text"
                value={selectedItemToEdit.name}
                onChange={(e) =>
                  setSelectedItemToEdit({ ...selectedItemToEdit, name: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-600 dark:text-white"
              />

              {/* Edit Location */}
              <label className="block text-gray-700 dark:text-gray-300">Location:</label>
              <input
                type="text"
                value={selectedItemToEdit.location}
                onChange={(e) =>
                  setSelectedItemToEdit({ ...selectedItemToEdit, location: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-600 dark:text-white"
              />

              {/* Edit Description */}
              <label className="block text-gray-700 dark:text-gray-300">Description:</label>
              <textarea
                value={selectedItemToEdit.detail}
                onChange={(e) =>
                  setSelectedItemToEdit({ ...selectedItemToEdit, detail: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-600 dark:text-white"
              />

              {/* Edit Image (Upload File) */}
              <label className="block text-gray-700 dark:text-gray-300">Image:</label>
              <div className="flex items-center justify-center w-full">
                  <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" />
                  </label>
              </div> 
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b dark:border-gray-600 gap-3">
              <button
                onClick={() => setSelectedItemToEdit(null)}
                className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Updated item:", selectedItemToEdit);
                  setSelectedItemToEdit(null);
                }}
                className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataDestination;
