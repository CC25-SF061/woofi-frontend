import { React, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DestinationFilter from './destinationTag';
import DestinationCard from './destinationCard';
import DestinationFilterConstant from '../../util/DestinationFilter.js';
import { useVirtualizer, useWindowVirtualizer } from '@tanstack/react-virtual';

const DestinationGroup = ({
    containerRef,
    tagsChangeHandler,
    destinations = [],
    setLoginModalVisible,
    handleEndScroll,
    hasMore,
}) => {
    const navigate = useNavigate();
    const onCardClick = (id) => {
        // TODO? : Add to user statistic
        navigate(`/destination/${id}`);
    };
    const listRef = useRef(null);
    const [lane, setLane] = useState(
        (window.innerWidth >= 1536 && 5) ||
            (window.innerWidth >= 1280 && 4) ||
            (window.innerWidth >= 1024 && 3) ||
            (window.innerWidth >= 768 && 2) ||
            1,
    );
    useEffect(() => {
        const handleResize = () => {
            setLane(
                (window.innerWidth >= 1536 && 5) ||
                    (window.innerWidth >= 1280 && 4) ||
                    (window.innerWidth >= 1024 && 3) ||
                    (window.innerWidth >= 768 && 2) ||
                    1,
            );
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    const virtualizer = useWindowVirtualizer({
        count: destinations.length,
        overscan: 5,
        lanes: lane,
        gap: 15,
        estimateSize: () => 380,
        scrollMargin: listRef.current?.offsetTop ?? 0,
    });

    useEffect(() => {
        if (!virtualizer.getVirtualItems().length) return;

        if (
            destinations.length - 1 ===
                virtualizer.getVirtualIndexes()[
                    virtualizer.getVirtualIndexes().length - 1
                ] &&
            hasMore
        ) {
            handleEndScroll?.();
        }
    }, [virtualizer.getVirtualIndexes(), destinations.length]);
    return (
        <div ref={containerRef} className="mt-15 flex flex-col w-full">
            <div className="relative w-full caret-transparent">
                <div className="absolute right-0 left-0 h-[2px] top-[50%] bg-[#FFA66677]"></div>
                <h1 className="relative mx-auto px-3 font-inknut-antiqua text-2xl md:text-4xl w-fit text-center text-[#FFA666] font-bold bg-[#221122]">
                    Explore Destinations
                </h1>
            </div>

            {/* The Filters */}
            <div className="flex flex-row gap-3 lg:mx-auto md:mx-0 self-start caret-transparent w-full overflow-x-auto py-5 px-1">
                <DestinationFilter
                    name="Peak"
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.PEAK}
                ></DestinationFilter>
                <DestinationFilter
                    name="Mountain"
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.MOUNTAIN}
                ></DestinationFilter>
                <DestinationFilter
                    name="Forest"
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.FOREST}
                ></DestinationFilter>
                <DestinationFilter
                    name="Beach"
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.BEACH}
                ></DestinationFilter>
                <DestinationFilter
                    name="Waterfall"
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.WATERFALL}
                ></DestinationFilter>
                <DestinationFilter
                    name="Lake"
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.LAKE}
                ></DestinationFilter>
                <DestinationFilter
                    name="Museum"
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.MUSEUM}
                ></DestinationFilter>
                <DestinationFilter
                    name="Recreational Park"
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.RECREATIONAL_PARK}
                ></DestinationFilter>
                <DestinationFilter
                    name="Tourist Village"
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.TOURIST_VILLAGE}
                ></DestinationFilter>
                <DestinationFilter
                    name="Others"
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.OTHERS}
                ></DestinationFilter>
            </div>

            {/* The Cards */}
            <div ref={listRef} className="mt-5 mb-10">
                <div
                    style={{
                        height: `${virtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {virtualizer.getVirtualItems().map((item) => {
                        const row = item.index;
                        const element = destinations[row];
                        return (
                            <div
                                key={item.index}
                                style={{
                                    // padding: '0px 5px 30px',
                                    paddingInline: '10px',
                                    position: 'absolute',
                                    top: 0,
                                    left: `${item.lane * (100 / virtualizer.options.lanes)}%`,
                                    width: `calc(100% / ${virtualizer.options.lanes})`,
                                    height: `${380}px`,
                                    transform: `translateY(${
                                        item.start -
                                        virtualizer.options.scrollMargin
                                    }px)`,
                                }}
                            >
                                <DestinationCard
                                    key={element.id}
                                    id={element.id}
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
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DestinationGroup;
