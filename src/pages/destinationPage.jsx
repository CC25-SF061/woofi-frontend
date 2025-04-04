import React, { useEffect, useRef, useState } from 'react';

import Navbar from '../components/navbar';
import SearchDestination from '../components/searchDestination';
import DestinationMap from '../components/destination/destinationMap';
import DestinationGroup from '../components/destination/destinationGroup';
import PageIndexer from '../components/destination/destinationPageIndexer';
import JoinUs from '../components/joinUs';
import Footer from '../components/footer';
import HeroSection from '../components/heroSection';
import Image1 from '../assets/gallery/image1.webp';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { showLoading, hideLoading } from '../stores/loadingReducer';
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DestinationFilter from '../util/DestinationFilter';

const maxCardsToIndexable = 8;
const DestinationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [destinationList, setDestinationList] = useState([]);
    const [destinationDisplay, setDestinationDisplay] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [provinces, setProvinces] = useState([]);
    const loginModal = useRef(null);
    const [mapDisplay, setMapDisplay] = useState({
        pos: [-1.748926, 120.0148634],
        zoom: 5,
        name: '',
        isSelected: false,
    });
    const [searchState, setSearchState] = useState();
    const [activeTags, setActiveTags] = useState([]);

    const prevActiveTags = useRef(activeTags);
    const maxPages = useRef(0);
    const searchDestination = async (province, name, filter = []) => {
        try {
            dispatch(showLoading('DestinationPageLoading'));
            const response = await axios.get('/api/destinations', {
                params: {
                    province: province || undefined,
                    name: name || undefined,
                    filter: filter,
                },
            });
            setDestinationList(response.data.data);
        } catch (e) {
            console.log(e);
            toast.error(
                'Something went wrong while getting destinations, Please try again later.',
                {
                    position: 'top-right',
                },
            );
        } finally {
            dispatch(hideLoading('DestinationPageLoading'));
        }
    };
    const handleTagChange = (tags) => {};
    const tagsChangeHandler = ({ type, active, setActive }) => {
        let tags = [...activeTags];
        let filterToggle = [];
        if (!active) {
            setActive(false);
            tags = tags.filter((tag) => tag.type !== type);
            setActiveTags(tags);
            setSearchState((state) => ({
                ...state,
                tags: tags.map((tag) => tag.type),
            }));
            searchDestination(
                searchState?.province.name,
                searchState?.destination?.name,
                tags.map((tag) => tag.type),
            );
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
        searchDestination(
            searchState?.province.name,
            searchState?.destination?.name,
            tags.map((tag) => tag.type),
        );
        setSearchState((state) => ({
            ...state,
            tags: tags.map((tag) => tag.type),
        }));
        setActiveTags(tags);
    };
    const onTagChange = () => {
        if (activeTags[2] && activeTags[3]) {
            // both Newest & Oldest tag activation alternation mechanism
            let newTags = [...activeTags];

            if (prevActiveTags.current[2]) newTags[2] = false;
            else newTags[3] = false;

            prevActiveTags.current = newTags;
            setActiveTags(newTags);

            return;
        }

        // TODO : API Recall, Refresh destination list & display

        prevActiveTags.current = activeTags;
    };

    const onSearchSubmit = (province, destination) => {
        setSearchState((state) => ({
            ...state,
            province: province,
            destination: destination,
        }));

        searchDestination(province.name, destination.name, searchState?.tags);
    };

    const handleLoginNavigation = async () => {
        await navigate('/sign-in');
    };

    const setLoginModalVisible = () => {
        if (!loginModal) return;
        loginModal.current.showModal();
    };

    useEffect(() => {
        searchDestination();
    }, []);

    useEffect(() => {
        // Index pages & rerender when destinationList refresh
        setCurrentPageIndex(0);
        if (destinationList.length <= maxCardsToIndexable) {
            return;
        }
        const pagesCount = Math.ceil(
            destinationList.length / maxCardsToIndexable,
        );
        maxPages.current = pagesCount;
    }, [destinationList]);

    useEffect(() => {
        // Display Destinations
        setDestinationDisplay(
            destinationList.slice(
                currentPageIndex * maxCardsToIndexable,
                (currentPageIndex + 1) * maxCardsToIndexable,
            ),
        );
    }, [currentPageIndex, destinationList]);

    const onProvinceSelected = (province) => {
        setSearchState((state) => ({ ...state, province: province }));
        searchDestination(
            province.name,
            searchState?.destination?.name,
            searchState?.tags,
        );
        setMapDisplay((state) => ({
            ...state,
            zoom: 7,
            pos: [province.lat, province.long],
            name: province.name,
            isSelected: true,
        }));
    };
    useEffect(() => {
        // Get available provinces
        (async () => {
            try {
                const response = await axios.get('/api/geolocation/provinces');
                setProvinces(response.data.data || []);
            } catch (e) {
                if (!(e instanceof AxiosError)) {
                    return toast.error(
                        'Something went wrong while getting provinces, Please try again later.',
                        {
                            position: 'top-right',
                        },
                    );
                }
                if (e.code === 'ERR_NETWORK') {
                    return toast.error(
                        'Connection offline while getting provinces, Please try again later.',
                        {
                            position: 'top-right',
                        },
                    );
                }
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
                description="Explore the best places in Indonesia with complete information."
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
                    tags={[activeTags, setActiveTags]}
                    destinations={destinationDisplay}
                    maxIndexable={maxCardsToIndexable}
                    tagsChangeHandler={tagsChangeHandler}
                    setLoginModalVisible={setLoginModalVisible}
                />
                {maxPages.current > 0 ? (
                    <PageIndexer
                        current={{
                            get: currentPageIndex,
                            set: setCurrentPageIndex,
                        }}
                        count={maxPages}
                    />
                ) : null}
            </div>
            <JoinUs />
            <Footer />
            <ToastContainer />
            <dialog
                ref={loginModal}
                id="modal-not-login"
                className="modal font-quicksand"
            >
                <div className="modal-box bg-[#252527]">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <motion.button
                            transition={{
                                ease: 'backOut',
                                delay: 0,
                            }}
                            whileHover={{ scale: 1.125 }}
                            className="w-fit aspect-square rounded-[360px] hover:bg-gray-700 px-2 absolute right-2 top-2"
                        >
                            ✕
                        </motion.button>
                    </form>
                    <h3 className="font-bold text-xl">
                        You are not{' '}
                        <span className="text-[#FFA666] font-bold">
                            Logged In
                        </span>
                        , yet
                    </h3>
                    <p className="pb-6 font-light tracking-wide">
                        Login to continue
                    </p>
                    <motion.button
                        transition={{
                            ease: 'backOut',
                            delay: 0,
                        }}
                        whileHover={{ scale: 1.05 }}
                        className="rounded-md hover:bg-[#FFA66622] border-solid border-[#FFA666] text-[#FFA666] border-[1px] px-2 py-1 font-semibold tracking-wider"
                        onClick={handleLoginNavigation}
                    >
                        Login right away
                    </motion.button>
                </div>
            </dialog>
        </div>
    );
};

export default DestinationPage;
