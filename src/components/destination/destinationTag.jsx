import React from "react";
import { motion } from "framer-motion";

const DestinationTag = ({name, order, activity}) => {

    const [isActive, setActive, onChanged] = activity;

    const onToggle = () => {
        const newState = !isActive[order];
        const newActive = [...isActive];
        newActive[order] = newState;
        setActive(newActive);
        onChanged();
    };

    return (
        <motion.button 
        whileHover={{ scale: 1.05 }}        
        className={
            isActive[order] ?
            "rounded-md px-4 py-2 border-solid border-[2px] border-transparent bg-[#FFA666] box-border tracking-wider" :
            "rounded-md px-4 py-2 border-solid border-[2px] border-white hover:bg-[#ffffff55] box-border tracking-wide"
        } onMouseUp={onToggle} >
            <p className={
                isActive[order] ?
                "text-white text-lg font-quicksand font-bold" :
                "text-white text-lg font-quicksand"
            }>
                {name}
            </p>
        </motion.button>
    );
};

export default DestinationTag;
