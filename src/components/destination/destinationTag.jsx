import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DestinationTag = ({ name, stateChangeHandler, type }) => {
    const [isActive, setActive] = useState(false);
    const onToggle = () => {
        stateChangeHandler({
            active: !isActive,
            type: type,
            setActive,
        });
    };
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            className={
                isActive
                    ? 'rounded-md px-1 sm:px-2 py-1 md:px-4 md:py-2 border-solid border-[1px] border-transparent bg-[#FFA666] box-border tracking-tight md:tracking-wider'
                    : 'rounded-md px-1 sm:px-2 py-1 md:px-4 md:py-2 border-solid border-[1px] border-[#ffffffaa] hover:bg-[#ffffff55] box-border md:tracking-wide'
            }
            onMouseUp={onToggle}
        >
            <p
                className={
                    isActive
                        ? 'text-white text-xs md:text-lg font-quicksand font-bold'
                        : 'text-white text-xs md:text-lg font-quicksand'
                }
            >
                {name}
            </p>
        </motion.button>
    );
};

export default DestinationTag;
