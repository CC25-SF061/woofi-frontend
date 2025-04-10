import React, { useEffect, useRef, useState } from 'react';
import StarFull from '../../assets/icons/ratestar/full.svg';
import StarHalf from '../../assets/icons/ratestar/half.svg';
import StarEmpty from '../../assets/icons/ratestar/empty.svg';
import WishlistEmpty from '../../assets/icons/wishlist/empty.svg';
import WishlistFill from '../../assets/icons/wishlist/full.svg';
import { motion } from 'framer-motion';
import countStars from '../../util/starRating';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import ErrorConstant from '../../util/ErrorConstant.js';

const DestinationCard = ({
    id,
    picture,
    name,
    detail,
    isWishlisted,
    rating,
    onclick,
    onRequestDelete,
    onConfirmRemoveWishlist,
    setSelectedItemToEdit,
    optionsIcon = null,
    setLoginModalVisible,
    onRequestWishlistDelete
}) => {
    const MotionDiv = motion.div;
    const { whole_rating, has_half_rating, empty_rating } = countStars(rating);
    const [dropdownOpen, setDropdownOpen] = useState(false);        
    const userId = useSelector((state) => state.user.data.id);
    const [wishlist, setWishlist] = useState(isWishlisted);
    const button = useRef(null);
    // Format detail description
    const formattedDetail = detail.replaceAll(/([\n]+[\w.,/ ]+)/g, '...');
    useEffect(() => {
        setWishlist(isWishlisted);
    }, [isWishlisted]);    
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (button.current && !button.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        if (dropdownOpen) {
            document.addEventListener('click', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [dropdownOpen]);

    const handleWishlist = async () => {
        if (!userId) {
            setLoginModalVisible();
            return;
        }
    
        if (wishlist) {
            if (onRequestWishlistDelete) {
                onRequestWishlistDelete({
                    id,
                    name,
                    isWishlisted: wishlist,
                    onConfirm: handleConfirmRemoveWishlist,
                });
            }
        } else {
            await addWishlist();
        }
    };

    const addWishlist = async () => {
        try {
            await axios.post(`/api/user/wishlist/${id}`);
            setWishlist(true);
            toast.success('Added to wishlist', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch {
            toast.error('Failed to add to wishlist', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    const handleConfirmRemoveWishlist = async () => {
        try {
            await axios.delete(`/api/user/wishlist/${id}`);
            setWishlist(false);
            toast.success('Removed from wishlist', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch {
            toast.error('Failed to remove from wishlist', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };    

    useEffect(() => {
        if (onConfirmRemoveWishlist) {
            onConfirmRemoveWishlist(id, handleConfirmRemoveWishlist);
        }
    }, [onConfirmRemoveWishlist]);

    return (
        <div className="relative bg-[#252527] font-quicksand rounded-lg mx-auto sm:max-w-90  w-full h-95 shadow-lg overflow-hidden flex flex-col duration-75 scale-100 hover:scale-[103%] ease-in">
            {/* Image Section */}
            <div className="skeleton w-full h-40 rounded-b-none">
                <img
                    src={
                        new URL(
                            picture,
                            import.meta.env.VITE_STATIC_ASSET_BASE_URL,
                        ).href
                    }
                    loading="lazy"
                    className="w-full h-full object-cover rounded-t-lg"
                    alt={`Picture of ${name}`}
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-2 p-3 flex-1">
                {/* Rating and Wishlist */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        {Array.from({ length: whole_rating }).map((_, i) => (
                            <img
                                key={i}
                                src={StarFull}
                                loading="lazy"
                                width="19"
                                alt="Full Star"
                            />
                        ))}
                        {has_half_rating && (
                            <img
                                key="half"
                                src={StarHalf}
                                loading="lazy"
                                width="19"
                                alt="Half Star"
                            />
                        )}
                        {Array.from({ length: empty_rating }).map((_, i) => (
                            <img
                                key={i + whole_rating + has_half_rating}
                                src={StarEmpty}
                                loading="lazy"
                                width="19"
                                alt="Empty Star"
                            />
                        ))}
                    </div>
                    <MotionDiv
                        animate={{ scale: 1 }}
                        transition={{
                            duration: 0.25,
                            ease: 'backOut',
                            delay: 0,
                        }}
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer caret-transparent flex-none"
                        onClick={handleWishlist}
                    >
                        <img
                            className="ml-auto cursor-pointer"
                            src={wishlist ? WishlistFill : WishlistEmpty}
                            width="21"
                            alt="Wishlist"
                        />
                    </MotionDiv>
                </div>

                {/* Title and Description */}
                <h2 className="text-lg md:text-xl text-white tracking-wide truncate">
                    {name}
                </h2>
                <p className="text-md text-[#aaa] font-light line-clamp-2">
                    {formattedDetail}
                </p>
            </div>

            {/* Footer Section */}
            <div className="flex justify-between items-center px-3 py-2 pb-3 bg-[#252527] relative">
                {optionsIcon && (
                    <div className="relative">
                        <button
                            ref={button}
                            className={`text-white cursor-pointer p-1 rounded-full bg-[#252527] ${
                                dropdownOpen
                                    ? 'bg-gray-700'
                                    : 'hover:bg-gray-700'
                            }`}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <span className="pointer-events-none">
                                {optionsIcon}
                            </span>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute left-9 bottom-0 mt-2 w-32 bg-[#333] text-white rounded-md shadow-lg z-10 divide-y divide-gray-600">
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-600 cursor-pointer rounded-t-md"
                                    onClick={() => setSelectedItemToEdit()}
                                >
                                    Edit
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-600 cursor-pointer rounded-b-md"
                                    onClick={() => onRequestDelete({ type: 'destination', data: { id, name, isWishlisted: isWishlisted } })                                }
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                )}
                <button
                    onMouseUp={() => onclick(id)}
                    className="text-white text-xs md:text-base font-semibold px-4 py-1 border border-[#ffffff88] rounded-md bg-[#252527] hover:bg-[#fff] hover:text-black transition-all cursor-pointer"
                >
                    See Details
                </button>
            </div>
        </div>
    );
};

export default DestinationCard;
