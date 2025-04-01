import React from "react";
import SearchIcon from "../assets/icons/search.svg";

const searchDestination = () => {
  return (
    <>
      <form className="flex flex-col text-center items-center bg-[#252527] text-white px-5 md:px-8 py-5 gap-3 rounded-md w-full">
        <label htmlFor="province" className="font-quicksand text-md text-nowrap md:text-xl rounded-md w-full tracking-wide uppercase">Search For Tourist destination</label>
        <div className="flex md:flex-row flex-col w-full items-center">
          <input id="province" name="province" className="bg-[#252527] text-base w-full md:w-fit text-nowrap md:text-xl px-5 py-2 text-white font-quicksand placeholder-[#ffffff32] shadow-lg shadow-[#00000032] rounded-[10px]" type="text" placeholder="Search Province"></input>
          <div className="bg-[#ffffffaa] h-0 w-[2px] mx-3 invisible md:h-8 md:visible"></div>
          <div className="bg-[#ffffff55] h-[2px] w-full mt-4 mb-3 md:w-0 md:invisible"></div>
          <input id="destinationName" name="destinationName" className="bg-[#252527] w-full text-base text-nowrap md:text-xl px-5 py-2 text-white font-quicksand placeholder-[#ffffff32] shadow-lg shadow-[#00000032] rounded-[10px]" type="text" placeholder="Look up Destination"></input>
          <button type="submit" className="flex flex-col items-center border-white p-2 mt-3 md:mt-0 md:ml-2 border-solid border-[1px] md:border-2 md:aspect-square rounded-[8px] hover:bg-[#ffffff22] w-full md:w-fit" >
            <img src={SearchIcon} className="w-5 md:w-10" />
          </button>
        </div>
      </form>
    </>
  );
};

export default searchDestination;
