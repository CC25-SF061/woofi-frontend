import { useState, React, useRef, useEffect } from "react";
import DestinationFilter from "./destinationFilter";
import DestinationCard from "./destinationCard";

const SearchDestination = ({destinations}) => {

  const [activeTags, setActiveTag] = useState([true, false, false]); // 0: Highest rating 1: Cheapest 2: Closest
  const [destinationList, setDestinationList] = useState(destinations);
  const containerRef = useRef(null);

  const onTagChanges = () => {
  };

  const onCardClick = (id) => {
    console.log(id)
  };

  return (
    <div ref={containerRef} className="flex flex-col" >
      <h1 className="font-inknut-antiqua text-5xl self-center mt-25">
        Top Destinations at <em className="text-[#FFA666] not-italic font-bold">Bali</em>
      </h1>

      {/* The Filters */}
      <div className="flex flex-row gap-5 mt-18 self-start caret-[#00000000]">
        <DestinationFilter name="Highest Rating" order="0" activity={[activeTags, setActiveTag, onTagChanges]}></DestinationFilter>
        <DestinationFilter name="Cheapest" order="1" activity={[activeTags, setActiveTag, onTagChanges]}></DestinationFilter>
        <DestinationFilter name="Closest to you" order="2" activity={[activeTags, setActiveTag, onTagChanges]}></DestinationFilter>
      </div>

      {/* The Cards */}
      <div className="mt-8 mb-15 grid justify-stretch items-stretch 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 caret-[#00000000]" draggable="false">
        {
          destinationList.map((element, order) => {
            return <DestinationCard key={element.id} id={element.id} order={order} picture={element.picture} name={element.name} desc={element.desc} rating={element.rating} onclick={onCardClick}></DestinationCard>
          })
        }
      </div>
    </div>
  );
};

export default SearchDestination;
