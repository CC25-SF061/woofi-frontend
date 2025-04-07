import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/profile/sidebar';
import DestinationCard from '../../components/destination/destinationCard';
import { HiX } from 'react-icons/hi';
import { RiMenu2Line } from 'react-icons/ri';
import { IoIosNotifications } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { hideLoading, showLoading } from '../../stores/loadingReducer';
import { nanoid } from 'nanoid';

const Wishlist = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [wishlistDestinations, setWishlistDestinations] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const keyLoading = nanoid();
            try {
                dispatch(showLoading(keyLoading));
                const response = await axios.get('/api/user/profile/wishlists');
                setWishlistDestinations(response.data.data);
            } catch (e) {
                console.log(e);
            } finally {
                dispatch(hideLoading(keyLoading));
            }
        })();
    }, []);

    const onCardClick = (id) => {
        navigate(`/destination/${id}`);
    };

    return (
        <div className="min-h-screen bg-[#221122] flex flex-col items-center lg:justify-center">
            <div className="w-full lg:h-screen flex items-center justify-center p-5 lg:p-10 gap-5 text-white">
                <div className="lg:hidden p-5 fixed z-60 top-0 w-full bg-[#252527] flex justify-between items-center shadow-xl">
                    <button
                        className="bg-[#FFA666] p-2 rounded-lg text-black cursor-pointer"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? (
                            <HiX size={24} />
                        ) : (
                            <RiMenu2Line size={24} />
                        )}
                    </button>
                    <button className="bg-[#FFA666] text-black font-quicksand p-2 rounded-lg cursor-pointer">
                        <IoIosNotifications size={24} />
                    </button>
                </div>

                <div
                    className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#252527] transform transition-transform duration-300 ease-in-out shadow-lg lg:hidden lg:translate-x-0 ${
                        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <Sidebar />
                </div>
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                <div className="hidden lg:flex h-full">
                    <Sidebar />
                </div>

                <div className="flex flex-col flex-1 rounded-lg  shadow-lg bg-[#252527]  lg:m-0 lg:h-full  lg:w-3/4 mt-20 lg:overflow-auto">
                    <div className="w-full max-w-6xl flex flex-col lg:items-center relative mx-auto">
                        <div className="mb-5 sticky top-0 bg-[#252527] p-3 pb-0 w-full shadow-md z-10">
                            <h1 className="text-center font-quicksand text-2xl">
                                Wishlist Destination
                            </h1>
                            <hr className="border-t-2 border-white my-3 rounded" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-5  w-full px-5 pb-5">
                            {wishlistDestinations.map((element, order) => (
                                <DestinationCard
                                    key={element.id}
                                    id={element.id}
                                    order={order}
                                    picture={
                                        new URL(
                                            element.image,
                                            import.meta.env.VITE_STATIC_ASSET_BASE_URL,
                                        ).href
                                    }
                                    name={element.name}
                                    isWishlisted={true}
                                    detail={element.detail}
                                    rating={element.rating}
                                    onclick={onCardClick}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
