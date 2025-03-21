import React from "react";
import SearchIcon from "../assets/icons/search.svg";

const searchDestination = () => {
  return (
    <>
      <form className="flex flex-col text-center items-center bg-[#252527] text-white px-8 py-5 gap-3 rounded-md w-full">
        <label htmlFor="destinationSearchInput" className="font-quicksand text-2xl rounded-md w-full tracking-wide">Search for a Destination</label>
        <div className="w-full relative">
          <input id="destinationSearchInput" name="destinationSearchInput" className="bg-white w-full text-xl px-5 py-2 text-black font-quicksand placeholder-[#12121477] rounded-[10px]" type="text" placeholder="Start searching"></input>
          <div className="absolute right-0 top-0 h-full p-1">
            <button type="submit" className="text-black border-black px-2 border-solid border-2 h-full rounded-[8px] shadow-[#00000025] shadow-md" >
              <img src={SearchIcon} width="20" />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default searchDestination;
