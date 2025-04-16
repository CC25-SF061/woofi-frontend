import React from 'react';
import StarFull from '../../assets/icons/ratestar/full.svg';
import StarHalf from '../../assets/icons/ratestar/half.svg';
import StarEmpty from '../../assets/icons/ratestar/empty.svg';
import { motion } from 'framer-motion';
import countStars from '../../util/starRating';
import { Star } from 'lucide-react';
import { saveDestination } from '../../util/generatedDestinationManagement';
import { useNavigate, Link } from 'react-router-dom';
const DestinationCard = ({
    picture,
    name,
    detail,
    rating,
    destinationData,
}) => {
    console.log(destinationData);
    const MotionDiv = motion.div;
    const navigate = useNavigate();
    const { whole_rating, has_half_rating, empty_rating } = countStars(rating);
    // Format detail description
    const formattedDetail = detail?.replaceAll?.(/([\n]+[\w.,/ ]+)/g, '...');

    const seeDetail = async () => {
        const id = saveDestination(destinationData);
        await navigate(`/destination/${id}/generated`);
    };
    return (
        <div className="relative bg-[#252527] font-quicksand rounded-lg mx-auto sm:max-w-90  w-full h-95 shadow-lg overflow-hidden flex flex-col duration-75 scale-100 hover:scale-[103%] ease-in">
            {/* Image Section */}

            <div className="relativeskeleton w-full h-40 rounded-b-none">
                <div className="absolute top-2 right-1 z-10 ">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 px-4 py-1 rounded-full shadow-lg flex items-center">
                        <Star
                            size={14}
                            fill="#FFF"
                            color="#FFF"
                            className="mr-1"
                        />
                        <span className="text-xs font-bold text-white">
                            RECOMMENDED
                        </span>
                    </div>
                </div>
                <img
                    src={picture}
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
                <button
                    onClick={() => seeDetail()}
                    className="text-white text-xs md:text-base font-semibold px-4 py-1 border border-[#ffffff88] rounded-md bg-[#252527] hover:bg-[#fff] hover:text-black transition-all cursor-pointer"
                >
                    See Details
                </button>
            </div>
        </div>
    );
};

export default DestinationCard;
