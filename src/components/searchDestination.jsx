import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "../assets/icons/search.svg";
import GrayBottomArrow from "../assets/icons/arrow_b_gray.svg";

const provincesTemplate = [
  'Bali',
  'Jawa Barat',
  'Jawa Timur',
  'Surabaya',
  'Sumatra Utara',
  'Sumatra Selatan',
  'Kalimantan Utara',
  'Kalimantan Selatan',
];

const SearchProvince = ({ values }) => {
  
  const handleChange = e => {
    setProvince(e.target.value);
  }
  const handleSelect = e => {
    setProvince(e.target.attributes['data-value'].value);
  }
  function handleBlur () {
    setTimeout(()=>{
      setDropdownShown(false);
    }, 250);
  }
  const [province, setProvince] = useState('');
  const [dropdownShown, setDropdownShown] = useState(false);

  useEffect(() => {
    if (dropdownShown || !province) return;
    const autoSelectValue = values.filter(v => province != '' && v.match(new RegExp(province.replaceAll('/','').replaceAll('\\','').trim(),'i')))[0];
    setProvince(!autoSelectValue ? '' : autoSelectValue);
  }, [dropdownShown]);


  return (
    <div className="relative font-quicksand">
      <input  id="province" name="province" className="bg-[#252527] text-base w-full md:w-fit text-nowrap md:text-xl px-5 py-2 text-white placeholder-[#ffffff32] shadow-lg shadow-[#00000032] rounded-[10px]" 
              type="text" 
              placeholder="Search Province" 
              onChange={handleChange}
              onFocus={() => setDropdownShown(true)}
              onBlur={handleBlur}
              value={province} 
              required>
      </input>
      {
        dropdownShown ? 
        (<div className="absolute flex flex-col bg-[#252527] right-0 left-0 h-fit max-h-64 top-15 z-50 rounded-md overflow-y-auto caret-transparent">
          { values.map((v, i) => {
              if(province != '' && 
                !v.match(new RegExp(province.replaceAll('/','').replaceAll('\\','').trim(),'i'))) return;
              return <a key={i} className="w-full hover:bg-white hover:text-black hover:font-semibold duration-200 py-2" onClick={handleSelect} data-value={v}>
                {v}
              </a>
            })
          }
        </div>) : null
      }
      <img src={GrayBottomArrow} className="absolute right-2 top-5 w-3" />
    </div>
  );
}

const SearchDestination = ({ handleSubmit }) => {
  return (
    <>
      <form className="flex flex-col text-center items-center bg-[#252527] text-white px-5 md:px-8 py-5 gap-3 rounded-md w-full">
        <label htmlFor="province" className="font-quicksand text-sm sm:text-md text-nowrap md:text-xl rounded-md w-full tracking-tight sm:tracking-wide uppercase">Search For Tourist destination</label>
        <div className="flex md:flex-row flex-col w-full items-center">
          <SearchProvince values={provincesTemplate} />
          <div className="bg-[#ffffffaa] h-0 w-[2px] mx-3 invisible md:h-8 md:visible"></div>
          <div className="bg-[#ffffff55] h-[2px] w-full mt-4 mb-3 md:w-0 md:invisible"></div>
          <input id="destinationName" name="destinationName" className="bg-[#252527] w-full text-base text-nowrap md:text-xl px-5 py-2 text-white font-quicksand placeholder-[#ffffff32] shadow-lg shadow-[#00000032] rounded-[10px]" type="text" placeholder="Look up Destination" required></input>
          <button type="submit" className="flex flex-col items-center border-[#ffffff55] md:border-white p-2 mt-3 md:mt-0 md:ml-2 border-solid border-[1px] md:border-2 md:aspect-square rounded-[8px] hover:bg-[#ffffff22] w-full md:w-fit" onSubmit={handleSubmit}>
            <img src={SearchIcon} className="w-5 md:w-10" />
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchDestination;
