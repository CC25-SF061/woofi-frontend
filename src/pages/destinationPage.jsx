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
import Image2 from '../assets/gallery/image2.webp';
import Image3 from '../assets/gallery/lompatBatu.webp';
import Image4 from '../assets/gallery/rambuSolo.webp';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
import { showLoading, hideLoading } from '../stores/loadingReducer';

import axios, { AxiosError } from 'axios';
import ErrorConstants from '../util/errorConstant';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';

const maxCardsToIndexable = 8;
const DestinationPage = () => {
    const dispatch = useDispatch();

    const [destinationList, setDestinationList] = useState([]);
    const [destinationDisplay, setDestinationDisplay] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [provinces, setProvinces] = useState([]);
    const [mapDisplay, setMapDisplay] = useState({
        pos: [-1.748926, 120.0148634],
        zoom: 5,
        name: '',
        isSelected: false,
    });
    const [activeTags, setActiveTag] = useState([
        true,
        false,
        false,
        false,
        false,
    ]); // 0: Highest Rating, 1: Wishlisted, 2: Newest, 3: Oldest, 4: Written by you

    const prevActiveTags = useRef(activeTags);
    const maxPages = useRef(0);

    const onTagChange = () => {
        if (activeTags[2] && activeTags[3]) {
            // both Newest & Oldest tag activation alternation mechanism
            let newTags = [...activeTags];

            if (prevActiveTags.current[2]) newTags[2] = false;
            else newTags[3] = false;

            prevActiveTags.current = newTags;
            setActiveTag(newTags);

            return;
        }

        // TODO : API Recall, Refresh destination list & display

        prevActiveTags.current = activeTags;
    };

    const onSearchSubmit = (province, destination) => {
        // TODO : API Recall, Refrsh destination list & display
        console.log(
            `searching province : ${province.name} & destination : ${destination.name}`,
        );
    };

    useEffect(() => {
        // Initialize API Call
        return async () => {
            try {
                dispatch(showLoading('DestinationPageLoading'));
                const response = (await axios.get('/api/destinations')).data;
                setDestinationList(response.data);
            } catch (e) {
                if (!(e instanceof AxiosError)) {
                    return toast.error(
                        'Something went wrong while getting destinations, Please try again later.',
                        {
                            position: 'top-right',
                        },
                    );
                }
                if (e.code === 'ERR_NETWORK') {
                    return toast.error(
                        'Connection offline while getting destinations, Please try again later.',
                        {
                            position: 'top-right',
                        },
                    );
                }
            } finally {
                dispatch(hideLoading('DestinationPageLoading'));
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // Tag changes
        onTagChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTags]);

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
        return async () => {
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
        };
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
                    tags={[activeTags, setActiveTag]}
                    destinations={destinationDisplay}
                    maxIndexable={maxCardsToIndexable}
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
        </div>
    );
};

export default DestinationPage;
