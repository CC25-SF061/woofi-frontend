import React from 'react';
import { motion } from 'framer-motion';

import ArrowLeft from '../../assets/icons/arrow_l.svg';
import ArrowRight from '../../assets/icons/arrow_r.svg';

const DestinationPageIndexer = ({ current, count }) => {
    const setPage = (index) => {
        if (index > count.current - 1 || index < 0 || index == current.get)
            return;
        current.set(index);
    };

    return (
        <div className="flex flex-row font-quicksand font-light text-white mb-18">
            <motion.button
                className="cursor-pointer mr-2 py-2 px-3"
                onClick={() => setPage(current.get - 1)}
            >
                <img src={ArrowLeft} className="w-3 md:w-2" />
            </motion.button>

            <div className="flex flex-row divide-x divide-[#555] text-xl">
                {Array.from({ length: count.current }).map((_, i) => {
                    return (
                        <motion.button
                            key={i}
                            className={
                                i === current.get
                                    ? 'px-3 py-1 text-[#FFA666] text-2xl font-semibold cursor-pointer'
                                    : 'px-3 py-1 cursor-pointer'
                            }
                            onClick={() => setPage(i)}
                        >
                            {1 + i}
                        </motion.button>
                    );
                })}
            </div>

            <motion.button
                className="cursor-pointer ml-2 py-2 px-3"
                onClick={() => setPage(current.get + 1)}
            >
                <img src={ArrowRight} className="w-3 md:w-2" />
            </motion.button>
        </div>
    );
};

export default DestinationPageIndexer;
