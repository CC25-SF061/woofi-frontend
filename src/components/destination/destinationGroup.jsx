import { React, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DestinationFilter from './destinationTag';
import DestinationCard from './destinationCard';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const DestinationGroup = ({
    tags,
    destinations,
    maxIndexable,
    setLoginModalVisible,
}) => {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const loading = useSelector((state) => state.loading.loading);

    const [activeTags, setActiveTag] = tags;

    const onCardClick = (id) => {
        // TODO? : Add to user statistic
        navigate(`/destination/${id}`);
    };

    return (
        <div ref={containerRef} className="mt-15 flex flex-col w-full">
            <div className="relative w-full caret-transparent">
                <div className="absolute right-0 left-0 h-[2px] top-[50%] bg-[#FFA66677]"></div>
                <h1 className="relative mx-auto px-3 font-inknut-antiqua text-2xl md:text-5xl w-fit text-center text-[#FFA666] font-bold bg-[#221122]">
                    Explore Destinations
                </h1>
            </div>

            {/* The Filters */}
            <div className="flex flex-row gap-2 mx-auto md:mx-0 md:gap-5 mt-5 md:mt-18 self-start caret-transparent">
                <DestinationFilter
                    name="Highest Rating"
                    order="0"
                    activity={[activeTags, setActiveTag]}
                ></DestinationFilter>
                <DestinationFilter
                    name="Wishlisted"
                    order="1"
                    activity={[activeTags, setActiveTag]}
                ></DestinationFilter>
                <DestinationFilter
                    name="Newest"
                    order="2"
                    activity={[activeTags, setActiveTag]}
                ></DestinationFilter>
                <DestinationFilter
                    name="Oldest"
                    order="3"
                    activity={[activeTags, setActiveTag]}
                ></DestinationFilter>
                <DestinationFilter
                    name="Written by you"
                    order="4"
                    activity={[activeTags, setActiveTag]}
                ></DestinationFilter>
            </div>

            {/* The Cards */}
            <div className="mt-8 mb-10 grid justify-stretch items-stretch 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 caret-transparent">
                {loading.length === 0
                    ? destinations.map((element, order) => {
                          return (
                              <DestinationCard
                                  key={order}
                                  id={element.id}
                                  order={order}
                                  picture={element.image}
                                  name={
                                      element.name ||
                                      'Nunggu kesava return nama nih' /*TODO: REMOVE PIPE WHEN BACKEND UPDATES*/
                                  }
                                  detail={element.detail}
                                  isWishlisted={element.isWishlisted}
                                  rating={element.avgRating}
                                  onclick={onCardClick}
                                  setLoginModalVisible={setLoginModalVisible}
                              ></DestinationCard>
                          );
                      })
                    : Array.from({ length: maxIndexable }).map((_, order) => {
                          return (
                              <div
                                  key={order}
                                  className="skeleton duration-75 border-solid border-[#252527] border-[2px] w-73 sm:w-85 mx-auto md:mx-0 md:w-full h-85 cursor-not-allowed shadow-[#18081825] shadow-lg"
                              ></div>
                          );
                      })}
            </div>
        </div>
    );
};

export default DestinationGroup;
