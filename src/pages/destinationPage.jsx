import React, { useEffect, useRef, useState } from 'react';

import Navbar from '../components/navbar';
import SearchDestination from '../components/searchDestination';
import DestinationMap from '../components/destination/destinationMap';
import DestinationGroup from '../components/destination/destinationGroup';
import JoinUs from '../components/joinUs';
import Footer from '../components/footer';
import HeroSection from '../components/heroSection';
import Image1 from '../assets/gallery/image1.webp';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { showLoading, hideLoading } from '../stores/loadingReducer';
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
// Geolocation
import DestinationFilter from '../util/DestinationFilter';
import LoginModal from '../components/loginModal';
import { nanoid } from 'nanoid';
import { getProvince } from '../util/province';
const maxCardsToIndexable = 16;
const DestinationPage = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.data.id);
    const destinationListContainer = useRef(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [destinations, setDestinations] = useState([]);
    const [provinces, setProvinces] = useState(getProvince() || []);
    const loginModal = useRef(null);
    const [isLoading, setLoading] = useState(false);
    const [mapDisplay, setMapDisplay] = useState({
        pos: [-1.748926, 120.0148634],
        zoom: 5,
        name: '',
        isSelected: false,
    });
    const [hasMore, setHasMore] = useState(true);
    const [searchState, setSearchState] = useState();
    const [activeTags, setActiveTags] = useState([]);

    const searchDestination = async (
        province,
        name,
        category,
        filter = [],
        pageIdx = 0,
        append = false,
    ) => {
        try {
            if (pageIdx === 0) {
                setHasMore(() => true);
            }
            setPageIndex(pageIdx);
            const response = await axios.get('/api/destinations', {
                params: {
                    province: province || undefined,
                    name: name || undefined,
                    category: category || undefined,
                    filter: filter,
                    page: pageIdx,
                },
            });
            if (!response.data.data.length) {
                setHasMore(() => false);
            }
            if (append) {
                return setDestinations((state) => [
                    ...state,
                    ...response.data.data,
                ]);
            }
            return setDestinations(response.data.data);
        } catch (e) {
            toast.error(
                'Something went wrong while getting destinations, Please try again later.',
                {
                    position: 'top-right',
                },
            );
        }
    };

    const handleEndScroll = async () => {
        setLoading(() => true);
        await searchDestination(
            searchState?.province?.name,
            searchState?.destination?.name,
            searchState?.category?.name,
            searchState?.tags,
            pageIndex + 1,
            true,
        ).catch((e) => {});

        setLoading(() => false);
    };
    const tagsChangeHandler = async ({ type, active, setActive }) => {
        const keyLoading = nanoid();
        const loading = () => {
            dispatch(showLoading(keyLoading));
        };
        let tags = [...activeTags];
        let filterToggle = [];

        if (type === DestinationFilter.WRITTEN_BY_YOU && !userId) {
            setLoginModalVisible(true);
            return;
        }
        loading();

        if (!active) {
            setActive(false);
            tags = tags.filter((tag) => tag.type !== type);
            setActiveTags(tags);
            setSearchState((state) => ({
                ...state,
                tags: tags.map((tag) => tag.type),
            }));
            await searchDestination(
                searchState?.province?.name,
                searchState?.destination?.name,
                searchState?.category?.name,
                tags.map((tag) => tag.type),
            ).catch((e) => {});
            dispatch(hideLoading(keyLoading));
            return;
        }

        if (
            type === DestinationFilter.NEWEST &&
            tags.find((tag) => tag.type === DestinationFilter.OLDEST)
        ) {
            filterToggle = tags.filter(
                (tag) => tag.type === DestinationFilter.OLDEST,
            );
            tags = tags.filter((tag) => tag.type !== DestinationFilter.OLDEST);
        }

        if (
            type === DestinationFilter.OLDEST &&
            tags.find((tag) => tag.type === DestinationFilter.NEWEST)
        ) {
            filterToggle = tags.filter(
                (tag) => tag.type === DestinationFilter.NEWEST,
            );
            tags = tags.filter((tag) => tag.type !== DestinationFilter.NEWEST);
        }

        filterToggle.forEach((tag) => tag.setActive(false));
        tags.push({ type, active, setActive });
        setActive(true);
        await searchDestination(
            searchState?.province?.name,
            searchState?.destination?.name,
            searchState?.category?.name,
            tags.map((tag) => tag.type),
        ).catch((e) => {});
        dispatch(hideLoading(keyLoading));
        setSearchState((state) => ({
            ...state,
            tags: tags.map((tag) => tag.type),
        }));
        setActiveTags(tags);
    };

    const onSearchSubmit = async (province, destination) => {
        const keyLoading = nanoid();
        dispatch(showLoading(keyLoading));
        setSearchState((state) => ({
            ...state,
            province: province,
            destination: destination,
        }));
        await searchDestination(
            province.name,
            destination.name,
            searchState?.category?.name,
            searchState?.tags,
        ).catch((e) => {});
        dispatch(hideLoading(keyLoading));
    };

    const setLoginModalVisible = () => {
        if (!loginModal) return;
        loginModal.current.showModal();
    };

    const onProvinceSelected = async (province) => {
        const keyLoading = nanoid();
        dispatch(showLoading(keyLoading));
        setSearchState((state) => ({ ...state, province: province }));
        await searchDestination(
            province.name,
            searchState?.destination?.name,
            searchState?.category?.name,
            searchState?.tags,
        ).catch((e) => {});
        dispatch(hideLoading(keyLoading));
        setMapDisplay((state) => ({
            ...state,
            zoom: 7,
            pos: [province.lat, province.long],
            name: province.name,
            isSelected: true,
        }));
    };

    const handleCategoryChange = async (selectedCategory) => {
        setSearchState((state) => ({
            ...state,
            category: selectedCategory,
        }));
        await searchDestination(
            searchState?.province?.name,
            searchState?.destination?.name,
            selectedCategory.name,
        );
    };
    useEffect(() => {
        (async () => {
            const keyLoading = nanoid();
            try {
                dispatch(showLoading(keyLoading));
                const destination = searchDestination();
                await destination;
            } catch (e) {
                if (!(e instanceof AxiosError)) {
                    return toast.error(
                        'Something went wrong , Please try again later.',
                        {
                            position: 'top-right',
                        },
                    );
                }
                if (e.code === 'ERR_NETWORK') {
                    return toast.error(
                        'Connection offline , Please try again later.',
                        {
                            position: 'top-right',
                        },
                    );
                }
            } finally {
                dispatch(hideLoading(keyLoading));
            }
        })();
    }, []);

    return (
        <div>
            <Navbar />
            <HeroSection
                backgroundImage={Image1}
                title="Explore the Best Destinations"
                highlightedWord="Destinations"
                description="Explore countless places in Indonesia with complete information."
            />
            <div className="flex flex-col px-10 items-center bg-[#221122] w-full">
                <SearchDestination
                    handleSubmit={onSearchSubmit}
                    provinces={provinces}
                    selectedHandler={onProvinceSelected}
                />
                <DestinationMap
                    pos={mapDisplay.pos}
                    zoom={mapDisplay.zoom}
                    name={mapDisplay.name}
                    provinces={provinces}
                    isSelected={mapDisplay.isSelected}
                />
                <DestinationGroup
                    containerRef={destinationListContainer}
                    tags={[activeTags, setActiveTags]}
                    destinations={destinations}
                    maxIndexable={maxCardsToIndexable}
                    tagsChangeHandler={tagsChangeHandler}
                    setLoginModalVisible={setLoginModalVisible}
                    handleEndScroll={handleEndScroll}
                    hasMore={hasMore}
                    handleCategoryChange={handleCategoryChange}
                />
                {isLoading && (
                    <div className="text-center mb-6">
                        <span className="loading loading-spinner loading-xl text-[#FFA666]"></span>
                    </div>
                )}
            </div>

            <JoinUs />
            <Footer />
            {/* <ToastContainer /> */}
            <LoginModal dialogRef={loginModal} />
        </div>
    );
};

export default DestinationPage;
