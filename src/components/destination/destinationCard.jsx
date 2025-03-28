import React from 'react';
import StarFull from '../../assets/icons/ratestar/full.svg';
import StarHalf from '../../assets/icons/ratestar/half.svg';
import StarEmpty from '../../assets/icons/ratestar/empty.svg';
import WishlistEmpty from '../../assets/icons/wishlist/empty.svg';
import Wishlisted from '../../assets/icons/wishlist/full.svg';
import { motion } from 'framer-motion';

import countStars from '../../util/starRating';

const DestinationCard = ({id, picture, name, desc, rating, onclick}) => {

    const {whole_rating, has_half_rating, empty_rating} = countStars(rating);

    // Decompound description paragraph
    desc = desc.replaceAll(/([\n]+[\w.,/ ]+)/g, '...');

    // Trimming long title
    const trimmed_title = name.substring(0, 24) + '...';
    name = name.length > 24+3 ? trimmed_title : name;

    // Trimming long description
    const trimmed_desc = desc.substring(0, 90) + '...';
    desc = desc.length > 90+3 ? trimmed_desc : desc;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: 'backOut', delay: 0 }}
            whileHover={{ scale: 1.05 }}
            className='relative bg-[#252527] font-quicksand rounded-lg min-w-75 min-h-75 opacity-0 cursor-pointer shadow-[#18081825] shadow-lg' 
            onMouseUpCapture={()=>{onclick(id)}}
            >
            <img
                src={picture}
                className='w-auto max-h rounded-tl-lg rounded-tr-lg'
            />
            <div className='flex flex-col gap-2 p-3 pb-14'>
                <div className='flex flex-row'>
                    <div className='flex flex-row gap-2'>
                        {
                            Array.from({length: whole_rating}).map((_, i) => {
                                return <img key={i} src={StarFull} width='19'/>
                            })
                        }
                        {
                            has_half_rating ? <img key={10} src={StarHalf} width='19'/> : null
                        }
                        {
                            Array.from({length: empty_rating}).map((_, i) => {
                                return <img key={i} src={StarEmpty} width='19'/>
                            })
                        }
                    </div>
                    <img className='ml-auto' src={WishlistEmpty} width='21' />
                </div>
                <h2 className='text-xl text-white tracking-wide'>{name}</h2>
                <p className='text-md text-[#aaa]'>{desc}</p>
            </div>
            <div className='absolute bottom-3 right-3 flex flex-row'>
                <div
                    className='text-white text-md font-light px-4 py-1 mt-1 ml-auto w-auto h-fit rounded-md border-solid border-[1px] border-[#ffffff88] tracking-wider cursor-pointer'
                >See Detail</div>
            </div>
        </motion.div>
    );
};

export default DestinationCard;
