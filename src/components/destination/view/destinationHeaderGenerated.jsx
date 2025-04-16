import { useState, React, useRef } from 'react';

import StarFull from '../../../assets/icons/ratestar/full.svg';
import StarHalf from '../../../assets/icons/ratestar/half.svg';
import StarEmpty from '../../../assets/icons/ratestar/empty.svg';
import WishlistEmpty from '../../../assets/icons/wishlist/empty.svg';
import Wishlisted from '../../../assets/icons/wishlist/full.svg';
import DestinationCollage from './destinationCollage';
import { motion } from 'framer-motion';

import countStars from '../../../util/starRating';
import { useNavigate } from 'react-router-dom';
const DestinationGroup = ({
    name,
    image,
    location,
    province,
    category,
    rating,
}) => {
    const { whole_rating, has_half_rating, empty_rating } = countStars(rating);
    const navigate = useNavigate();

    return (
        <div className="text-white flex flex-col w-full mb-4 gap-4">
            <div className="flex flex-row lg:gap-4 justify-between lg:justify-normal items-center">
                <h1 className="font-inknut-antiqua font-normal text-lg md:font-semibold md:text-3xl">
                    {name}
                </h1>
            </div>
            <DestinationCollage image={image}></DestinationCollage>
            <div className="lg:flex flex-row">
                <div className="font-quicksand text-sm md:text-2xl lg:pr-8 pb-4 lg:pb-0">
                    <p className="text-white">{location}</p>
                    {
                        // Others category check
                        category === 'Others' ? (
                            <p className="text-[#bbb] font-light text-base">
                                <span className="font-medium text-xl">
                                    {province}
                                </span>
                                &nbsp;(Others)
                            </p>
                        ) : (
                            <p className="text-[#bbb] font-light text-xl">
                                {category && (
                                    <>
                                        <span className="font-medium">
                                            {category}
                                        </span>
                                        &nbsp;at&nbsp;
                                    </>
                                )}
                                <span className="font-medium">{province}</span>
                            </p>
                        )
                    }
                </div>
                <div className="flex flex-col ml-auto">
                    <div className="flex flex-row gap-2 md:gap-4">
                        {Array.from({ length: whole_rating }).map((_, i) => {
                            return (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.25,
                                        ease: 'backOut',
                                        delay: 0,
                                    }}
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="cursor-pointer caret-transparent min-w-6"
                                    onMouseUp={() => handleRating(1 + i)}
                                >
                                    <img src={StarFull} width="33" />
                                </motion.div>
                            );
                        })}
                        {has_half_rating ? (
                            <motion.div
                                key={whole_rating + 1}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.25,
                                    ease: 'backOut',
                                    delay: 0,
                                }}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-pointer caret-transparent min-w-6"
                                onMouseUp={() => handleRating(whole_rating + 1)}
                            >
                                <img src={StarHalf} width="33" />
                            </motion.div>
                        ) : null}
                        {Array.from({ length: empty_rating }).map((_, i) => {
                            return (
                                <motion.div
                                    key={
                                        whole_rating +
                                        i +
                                        (has_half_rating ? 1 : 0)
                                    }
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.25,
                                        ease: 'backOut',
                                        delay: 0,
                                    }}
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="cursor-pointer caret-transparent min-w-6"
                                    onMouseUp={() =>
                                        handleRating(
                                            1 +
                                                i +
                                                whole_rating +
                                                (has_half_rating ? 1 : 0),
                                        )
                                    }
                                >
                                    <img src={StarEmpty} width="33" />
                                </motion.div>
                            );
                        })}
                    </div>
                    <p className="text-[#FFA666] lg:text-right text-xl font-quicksand tracking-wider">
                        <span className="text-[#FFA666DD] text-base tracking-normal">
                            Google Maps Rating {/* {countRating} ratings */}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DestinationGroup;
