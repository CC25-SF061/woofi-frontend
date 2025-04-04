import { React, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DestinationFilter from './destinationTag';
import DestinationCard from './destinationCard';
import { useSelector } from 'react-redux';
import DestinationFilterConstant from '../../util/DestinationFilter.js';

const DestinationGroup = ({
    tagsChangeHandler,
    destinations,
    maxIndexable,
    setLoginModalVisible,
}) => {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const loading = useSelector((state) => state.loading.loading);

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
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.HIGHEST_RATING}
                ></DestinationFilter>

                <DestinationFilter
                    name="Newest"
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.NEWEST}
                ></DestinationFilter>
                <DestinationFilter
                    name="Oldest"
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.OLDEST}
                ></DestinationFilter>
                <DestinationFilter
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.WRITTEN_BY_YOU}
                    name="Written by you"
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
                                  picture={
                                      new URL(
                                          element.image,
                                          import.meta.env.VITE_STATIC_ASSET_BASE_URL,
                                      ).href
                                  }
                                  name={element.name}
                                  detail={element.detail}
                                  isWishlisted={element.isWishlisted}
                                  rating={element.rating}
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
