import { React, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DestinationFilter from './destinationTag';
import DestinationCard from './destinationCard';
import DestinationFilterConstant from '../../util/DestinationFilter.js';
import { useVirtualizer, useWindowVirtualizer } from '@tanstack/react-virtual';
import DestinationCategory from './destinationCategory.jsx';

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
    const [category, setCategory] = useState({ name: '' });
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [filteredCategories, setFilteredCategories] = useState([]);
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
        setCategoryDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('#category-dropdown-wrapper')) {
                setCategoryDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div id="category-dropdown-wrapper" ref={containerRef} className="mt-15 flex flex-col w-full">
            <div className="relative w-full caret-transparent">
                <div className="absolute right-0 left-0 h-[2px] top-[50%] bg-[#FFA66677]"></div>
                <h1 className="relative mx-auto px-3 font-inknut-antiqua text-2xl md:text-4xl w-fit text-center text-[#FFA666] font-bold bg-[#221122]">
                    Explore Destinations
                </h1>
            </div>

            <div className="block lg:hidden mt-5">
                <DestinationCategory
                    category={category}
                    setCategory={setCategory}
                    allCategories={allCategories}
                    categoryDropdownOpen={categoryDropdownOpen}
                    setCategoryDropdownOpen={setCategoryDropdownOpen}
                    filteredCategories={filteredCategories}
                    setFilteredCategories={setFilteredCategories}
                    handleSelectCategory={handleSelectCategory}
                />
            </div>
            {/* The Filters */}
            <div className="flex flex-row gap-3 lg:mx-auto md:mx-0 self-start caret-transparent w-full overflow-x-auto lg:overflow-x-visible py-5 px-1">
                <div className="hidden lg:flex">
                    <DestinationCategory
                        category={category}
                        setCategory={setCategory}
                        allCategories={allCategories}
                        categoryDropdownOpen={categoryDropdownOpen}
                        setCategoryDropdownOpen={setCategoryDropdownOpen}
                        filteredCategories={filteredCategories}
                        setFilteredCategories={setFilteredCategories}
                        handleSelectCategory={handleSelectCategory}
                    />
                </div>
                {/* Filters */}
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
                    stateChangeHandler={tagsChangeHandler}
                    type={DestinationFilterConstant.WRITTEN_BY_YOU}
                    name="Written by you"
                />
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
