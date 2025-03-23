import React from "react";
import SearchIcon from "../assets/icons/search.svg";

const searchDestination = () => {
  return (
    <>
      <form className="flex flex-col text-center items-center bg-[#252527] text-white px-8 py-5 gap-3 rounded-md w-full">
        <label htmlFor="provinceSearchInput" className="font-quicksand text-xl rounded-md w-full tracking-wide uppercase">Search For Tourist destination</label>
        <div className="flex flex-row w-full items-center">
          <input id="provinceSearchInput" name="provinceSearchInput" className="bg-[#252527] text-xl px-5 py-2 text-white font-quicksand placeholder-[#ffffff32] shadow-lg shadow- shadow-[#00000032] rounded-[10px]" type="text" placeholder="Search Province"></input>
          <div className="bg-[#ffffffaa] h-8 w-[2px] mx-2"></div>
          <div className="w-full relative grow">
            <input id="destinationSearchInput" name="destinationSearchInput" className="bg-[#252527] w-full text-xl px-5 py-2 text-white font-quicksand placeholder-[#ffffff32] shadow-lg shadow- shadow-[#00000032] rounded-[10px]" type="text" placeholder="Look up Destination"></input>
            <div className="absolute right-0 top-0 h-full p-1">
              <button type="submit" className="border-white px-2 border-solid border-2 h-full rounded-[8px]" >
                <img src={SearchIcon} width="20" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default searchDestination;
