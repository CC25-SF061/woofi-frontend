import React, { useState } from 'react';
import StarFull from '../../assets/icons/ratestar/full.svg';
import StarHalf from '../../assets/icons/ratestar/half.svg';
import StarEmpty from '../../assets/icons/ratestar/empty.svg';
import WishlistEmpty from '../../assets/icons/wishlist/empty.svg';
import WishlistFill from '../../assets/icons/wishlist/full.svg';
import { motion } from 'framer-motion';
import countStars from '../../util/starRating';

const DestinationCard = ({
    id,
    picture,
    name,
    detail,
    location,
    isWishlisted,
    rating,
    onclick,
    onRequestDelete,
    setSelectedItemToEdit,
    optionsIcon = null,
}) => {
    const { whole_rating, has_half_rating, empty_rating } = countStars(rating);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [wishlist, setWishlist] = useState(isWishlisted);

    const handleWishlist = () => {
        // TODO: Make api call Wishlist Feature & Redirect to login page when user not logged in
        setWishlist((v) => !v);
    };

    // Format detail description
    const formattedDetail = detail.replaceAll(/([\n]+[\w.,/ ]+)/g, '...');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: 'backOut', delay: 0 }}
            whileHover={{ scale: 1.05 }}
            className="relative bg-[#252527] font-quicksand rounded-lg mx-auto w-73 sm:w-85 md:w-full h-85 shadow-lg overflow-hidden flex flex-col"
        >
            {/* Image Section */}
            <div className="w-full h-40">
                <img
                    src={picture}
                    className="w-full h-full object-cover rounded-t-lg"
                    alt={name}
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
                                width="19"
                                alt="Full Star"
                            />
                        ))}
                        {has_half_rating && (
                            <img
                                key="half"
                                src={StarHalf}
                                width="19"
                                alt="Half Star"
                            />
                        )}
                        {Array.from({ length: empty_rating }).map((_, i) => (
                            <img
                                key={i + whole_rating + has_half_rating}
                                src={StarEmpty}
                                width="19"
                                alt="Empty Star"
                            />
                        ))}
                    </div>
                    <motion.img
                        transition={{
                            duration: 0.25,
                            ease: 'backOut',
                            delay: 0,
                        }}
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.95 }}
                        className="ml-auto cursor-pointer"
                        src={wishlist ? WishlistFill : WishlistEmpty}
                        width="21"
                        alt="Wishlist"
                        onClick={handleWishlist}
                    />
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
            <div className="flex justify-between items-center px-3 py-2 bg-[#252527] relative">
                {optionsIcon && (
                    <div className="relative">
                        <button
                            className={`text-white cursor-pointer p-1 rounded-full bg-[#252527] ${
                                dropdownOpen ? 'bg-gray-700' : 'hover:bg-gray-700'
                            }`}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {optionsIcon}
                        </button>
                        {dropdownOpen && (
                            <div className="absolute left-9 bottom-0 mt-2 w-32 bg-[#333] text-white rounded-md shadow-lg z-10 divide-y divide-gray-600">
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-600 cursor-pointer rounded-t-md"
                                    onClick={() =>
                                        setSelectedItemToEdit({
                                            id,
                                            name,
                                            detail,
                                            location,
                                            picture,
                                        })
                                    }
                                >
                                    Edit
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-600 cursor-pointer rounded-b-md"
                                    onClick={() =>
                                        onRequestDelete({ id, name })
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                )}
                <button
                    onMouseUpCapture={() => onclick(id)}
                    className="text-white text-xs md:text-base font-semibold px-4 py-1 border border-[#ffffff88] rounded-md bg-[#252527] hover:bg-[#fff] hover:text-black transition-all cursor-pointer"
                >
                    See Details
                </button>
            </div>
        </motion.div>
    );
};

export default DestinationCard;
