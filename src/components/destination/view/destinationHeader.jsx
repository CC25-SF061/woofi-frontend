import { useState, React, useRef } from 'react';

import StarFull from '../../../assets/icons/ratestar/full.svg';
import StarHalf from '../../../assets/icons/ratestar/half.svg';
import StarEmpty from '../../../assets/icons/ratestar/empty.svg';
import WishlistEmpty from '../../../assets/icons/wishlist/empty.svg';
import Wishlisted from '../../../assets/icons/wishlist/full.svg';
import DestinationCollage from './destinationCollage';
import { motion } from 'framer-motion';

import countStars from '../../../util/starRating';
import { useSelector } from 'react-redux';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import LoginModal from '../../loginModal';
import errorConstant from '../../../util/errorConstant';

const DestinationGroup = ({
    id,
    name,
    image,
    location,
    province,
    avgRating,
    countRating,
    isWishlist,
    personalRating,
}) => {
    const userId = useSelector((state) => state.user.data.id);

    const loginModal = useRef();
    const [rating, setRating] = useState(personalRating);
    const [wishlist, setWishlist] = useState(isWishlist);
    const { whole_rating, has_half_rating, empty_rating } = countStars(rating);

    async function handleWishlist() {
        if (!userId) {
            loginModal.current.showModal();
            return;
        }
        !wishlist ? await addWishlist() : await removeWishlist();
    }

    async function addWishlist() {
        try {
            setWishlist(true);
            await axios.post(`/api/user/wishlist/${id}`);
            toast.success('Added to wishlist!', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (e) {
            if (!(e instanceof AxiosError)) {
                return toast.error('Something went wrong while wishlisting', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
            const response = e.response.data.payload;
            if (response.errCode !== errorConstant.ERR_WISHLIST_ALREADY_EXIST) {
                return toast.error(
                    'Something went wrong while adding to wishlist',
                    {
                        position: 'top-right',
                        autoClose: 3000,
                    },
                );
            }
        }
    }

    async function removeWishlist() {
        try {
            setWishlist(false);
            await axios.delete(`/api/user/wishlist/${id}`);
            toast.info('Removed from wishlist', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (e) {
            toast.error('Something went wrong while removing from wishlist', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    }

    async function handleRating(value) {
        try {
            if (!userId) {
                loginModal.current.showModal();
                return;
            }
            setRating(value);
            await axios.post(`/api/destination/rating/${id}`, { score: value });
        } catch (e) {
            toast.error('Something went wrong while rating', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    }

    return (
        <div className="text-white flex flex-col w-full mb-4 gap-4">
            <LoginModal dialogRef={loginModal} />
            <div className="flex flex-row gap-4 items-center">
                <h1 className="font-inknut-antiqua font-normal text-lg md:font-semibold md:text-3xl">
                    {name}
                </h1>
                <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, ease: 'backOut', delay: 0 }}
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer caret-transparent flex-none"
                    onMouseUp={handleWishlist}
                >
                    <img
                        aria-hidden
                        src={wishlist ? Wishlisted : WishlistEmpty}
                        width="28"
                    />
                </motion.div>
            </div>
            <DestinationCollage image={image}></DestinationCollage>
            <div className="flex flex-row">
                <div className="font-quicksand text-sm md:text-2xl pr-8">
                    <p className="text-white">{location}</p>
                    <p className="text-[#bbb] font-light">{province}</p>
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
                    <p className="text-[#FFA666] text-right text-xl font-quicksand tracking-wider">
                        {avgRating} ·{' '}
                        <span className="text-[#FFA666DD] text-base tracking-normal">
                            {countRating} ratings
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DestinationGroup;
