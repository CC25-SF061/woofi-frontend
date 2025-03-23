import { useState, React, useRef } from "react";
import DestinationFilter from "./destinationTag";
import DestinationCard from "./destinationCard";

const DestinationGroup = ({destinations}) => {

  const [activeTags, setActiveTag] = useState([true, false, false]); // 0: Highest rating 1: Cheapest 2: Closest
  const [destinationList, setDestinationList] = useState(destinations);
  const containerRef = useRef(null);

  const onTagChanges = () => {
  };

  const onCardClick = (id) => {
  };

  return (
    <div ref={containerRef} className="flex flex-col" >
      <div className="mt-25 relative w-full">
        <div className="absolute right-0 left-0 h-[2px] top-[50%] bg-[#FFA66677]"></div>
        <h1 className="relative mx-auto px-3 font-inknut-antiqua text-5xl w-fit text-center text-[#FFA666] font-bold bg-[#221122]">
          Explore Destinations
        </h1>
      </div>

      {/* The Filters */}
      <div className="flex flex-row gap-5 mt-18 self-start caret-transparent">
        <DestinationFilter name="Highest Rating" order="0" activity={[activeTags, setActiveTag, onTagChanges]}></DestinationFilter>
        <DestinationFilter name="Cheapest" order="1" activity={[activeTags, setActiveTag, onTagChanges]}></DestinationFilter>
        <DestinationFilter name="Closest to you" order="2" activity={[activeTags, setActiveTag, onTagChanges]}></DestinationFilter>
      </div>

      {/* The Cards */}
      <div className="mt-8 mb-15 grid justify-stretch items-stretch 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 caret-transparent">
        {
          destinationList.map((element, order) => {
            return <DestinationCard key={element.id} id={element.id} order={order} picture={element.picture} name={element.name} desc={element.desc} rating={element.rating} onclick={onCardClick}></DestinationCard>
          })
        }
      </div>
    </div>
  );
};

export default DestinationGroup;
