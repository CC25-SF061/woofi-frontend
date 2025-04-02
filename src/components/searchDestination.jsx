import React, { useState } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";

const provinces = [
  "Bali",
  "Jakarta",
  "Yogyakarta",
  "West Java",
  "East Java",
  "Central Java",
  "Sumatra",
  "Kalimantan",
  "Sulawesi",
  "Papua",
];

const SearchDestination = () => {
  const [province, setProvince] = useState("");
  const [filteredProvinces, setFilteredProvinces] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleProvinceChange = (e) => {
    const value = e.target.value;
    setProvince(value);
    setDropdownOpen(true);

    if (value) {
      const filtered = provinces.filter((p) =>
        p.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProvinces(filtered);
    } else {
      setFilteredProvinces(provinces);
    }
  };

  const handleSelectProvince = (selectedProvince) => {
    setProvince(selectedProvince);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    if (!dropdownOpen) {
      setFilteredProvinces(provinces);
    }
  };

  return (
    <form className="flex flex-col text-center items-center bg-[#252527] text-white px-5 md:px-8 py-5 gap-3 rounded-md w-full">
      <label
        htmlFor="province"
        className="font-quicksand text-sm sm:text-md text-nowrap md:text-xl rounded-md w-full tracking-tight sm:tracking-wide"
      >
        Search For Tourist Destination
      </label>
      <div className="flex md:flex-row flex-col w-full items-center gap-6">
        <div className="relative w-full md:w-2/5">
          <div className="flex items-center">
            <input
              id="province"
              name="province"
              className="bg-[#252527] w-full text-nowrap px-5 py-2 text-white font-quicksand placeholder-[#ffffff32] shadow-md shadow-stone-950 rounded-sm"
              type="text"
              placeholder="Search Province"
              value={province}
              onChange={handleProvinceChange}
            />
            <button
              type="button"
              onClick={toggleDropdown}
              className="absolute inset-y-0 right-0 flex items-center justify-center p-2 pl-4 rounded-sm rounded-l-2xl bg-[#FFA666] cursor-pointer transition-all duration-200 hover:bg-white group"
            >
              <FaChevronDown
                className={`text-lg text-black group-hover:text-[#FFA666] transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>

          {dropdownOpen && filteredProvinces.length > 0 && (
            <ul className="absolute left-0 mt-1 w-full bg-[#252527] text-white border border-[#FFA666] rounded-sm shadow-md shadow-stone-950 z-10">
              {filteredProvinces.map((p) => (
                <li
                  key={p}
                  className="px-4 py-2 cursor-pointer hover:bg-[#FFA666] hover:text-black transition-all duration-200"
                  onClick={() => handleSelectProvince(p)}
                >
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative w-full md:w-3/5">
          <input
            id="destinationName"
            name="destinationName"
            className="bg-[#252527] w-full text-nowrap px-5 py-2 pr-12 text-white font-quicksand placeholder-[#ffffff32] shadow-md shadow-stone-950 rounded-lg"
            type="text"
            placeholder="Look up Destination"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center justify-center p-2 pl-4 rounded-lg rounded-l-2xl bg-[#FFA666] cursor-pointer transition-all duration-200 hover:bg-white group"
          >
            <FaSearch className="text-lg text-black group-hover:text-[#FFA666]" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchDestination;
