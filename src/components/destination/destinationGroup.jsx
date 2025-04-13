import { useEffect, useRef, useState } from 'react';
import DestinationFilter from './destinationTag';
import DestinationCard from './destinationCard';
import DestinationFilterConstant from '../../util/destinationFilter';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import Dropdown from '../dropdown.jsx';

const DestinationGroup = ({
    containerRef,
    tagsChangeHandler,
    destinations = [],
    setLoginModalVisible,
    handleEndScroll,
    handleCategoryChange,
    hasMore,
}) => {
    const listRef = useRef(null);
    const [category, setCategory] = useState({ name: '' });

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
                    (window.innerWidth >= 768 && 3) ||
                    (window.innerWidth >= 640 && 2) ||
                    1,
            );
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const virtualizer = useWindowVirtualizer({
        count: destinations.length,
        overscan: 5,
        lanes: lane,
        gap: 15,
        estimateSize: () => 380,
        scrollMargin: listRef.current?.offsetTop ?? 0,
    });

    useEffect(() => {
        const virtualIndexes = virtualizer.getVirtualIndexes();
        if (
            virtualIndexes.length &&
            destinations.length - 1 ===
                virtualIndexes[virtualIndexes.length - 1] &&
            hasMore
        ) {
            handleEndScroll?.();
        }
    }, [virtualizer.getVirtualIndexes(), destinations.length]);

    const allCategories = [
        { name: 'Peak' },
        { name: 'Mountain' },
        { name: 'Forest' },
        { name: 'Beach' },
        { name: 'Waterfall' },
        { name: 'Lake' },
        { name: 'Museum' },
        { name: 'Recreational Park' },
        { name: 'Tourist Village' },
        { name: 'Others' },
    ];

    const handleSelectCategory = (selectedCategory) => {
        setCategory(selectedCategory);
        handleCategoryChange(selectedCategory);
    };

    return (
        <div
            id="category-dropdown-wrapper"
            ref={containerRef}
            className="mt-15 flex flex-col w-full"
        >
            {/* Title */}
            <div className="relative w-full caret-transparent">
                <div className="absolute right-0 left-0 h-[2px] top-[50%] bg-[#FFA66677]"></div>
                <h1 className="relative mx-auto px-3 font-inknut-antiqua text-2xl md:text-4xl w-fit text-center text-[#FFA666] font-bold bg-[#221122]">
                    Explore Destinations
                </h1>
            </div>

            {/* Dropdown Mobile */}
            <div className="block lg:hidden mt-5">
                <Dropdown
                    options={allCategories}
                    selected={category}
                    setSelected={handleSelectCategory}
                    placeholder="Select Category"
                    getOptionLabel={(opt) => opt.name}
                />
            </div>

            {/* Filters and Dropdown (Desktop) */}
            <div className="flex flex-row gap-3 lg:mx-auto md:mx-0 self-start caret-transparent w-full overflow-x-auto lg:overflow-x-visible py-5 px-1">
                <div className="hidden lg:flex">
                    <Dropdown
                        options={allCategories}
                        selected={category}
                        setSelected={handleSelectCategory}
                        placeholder="Select Category"
                        getOptionLabel={(opt) => opt.name}
                    />
                </div>
                <DestinationFilter
                    name="Highest Rating"
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.HIGHEST_RATING}
                />
                <DestinationFilter
                    name="Newest"
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.NEWEST}
                />
                <DestinationFilter
                    name="Oldest"
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.OLDEST}
                />
                <DestinationFilter
                    name="Written by you"
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.WRITTEN_BY_YOU}
                />
            </div>

            {/* Cards */}
            <div ref={listRef} className="mt-5 mb-10">
                <div
                    style={{
                        height: `${virtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {virtualizer.getVirtualItems().map((item) => {
                        const destination = destinations[item.index];
                        return (
                            <div
                                key={item.index}
                                style={{
                                    paddingInline: '10px',
                                    position: 'absolute',
                                    top: 0,
                                    left: `${item.lane * (100 / virtualizer.options.lanes)}%`,
                                    width: `calc(100% / ${virtualizer.options.lanes})`,
                                    height: `380px`,
                                    transform: `translateY(${item.start - virtualizer.options.scrollMargin}px)`,
                                }}
                            >
                                <DestinationCard
                                    id={destination.id}
                                    picture={
                                        new URL(
                                            destination.image,
                                            import.meta.env.VITE_STATIC_ASSET_BASE_URL,
                                        ).href
                                    }
                                    name={destination.name}
                                    detail={destination.detail}
                                    isWishlisted={destination.isWishlisted}
                                    rating={destination.rating}
                                    setLoginModalVisible={setLoginModalVisible}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DestinationGroup;
