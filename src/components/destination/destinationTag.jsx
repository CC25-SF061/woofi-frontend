import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react'; // ikon opsional

const DestinationTag = ({ name, stateChangeHandler, type }) => {
    const [isActive, setActive] = useState(false);
    const MotionButton = motion.button;

    const onToggle = () => {
        stateChangeHandler({
            active: !isActive,
            type: type,
            setActive,
        });
    };

    return (
        <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseUp={onToggle}
            className={`flex items-center gap-2 rounded-full px-5 py-2 transition-all duration-300 cursor-pointer
                ${isActive
                    ? 'bg-[#FFA666] text-white shadow-md'
                    : 'bg-transparent border border-white/60 hover:bg-white/10 text-white'}
            `}
        >
            {/* Ikon opsional: bisa dihapus jika tak ingin pakai */}
            <motion.div
                initial={false}
                animate={{ rotate: isActive ? 360 : 0 }}
                transition={{ duration: 0.4 }}
            >
                {isActive ? (
                    <CheckCircle size={18} />
                ) : (
                    <Circle size={18} />
                )}
            </motion.div>

            <p
                className={`whitespace-nowrap text-sm md:text-base font-quicksand transition-all duration-300
                    ${isActive ? 'font-bold' : 'font-medium'}
                `}
            >
                {name}
            </p>
        </MotionButton>
    );
};

export default DestinationTag;
