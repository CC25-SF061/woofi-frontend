import React from "react";

const destinationFilter = ({name, order, activity}) => {

    const [isActive, setActive, onChanged] = activity;

    const onToggle = () => {
        const newState = !isActive[order];
        const newActive = [...isActive];
        newActive[order] = newState;
        setActive(newActive);
        onChanged();
    };

    return (
        <button className={
            isActive[order] ?
            "rounded-md px-4 py-2 bg-[#FFA666] hover:scale-105 box-content tracking-wider transition-all duration-75" :
            "rounded-md px-4 py-2 border-solid border-[2px] border-white hover:bg-[#ffffff55] hover:scale-105 box-content tracking-wide transition-all duration-75"
        } onMouseUp={onToggle} >
            <p className={
                isActive[order] ?
                "text-white text-lg font-quicksand font-bold" :
                "text-white text-lg font-quicksand"
            }>
                {name}
            </p>
        </button>
    );
};

export default destinationFilter;
