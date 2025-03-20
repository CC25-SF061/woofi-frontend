import React from "react";
import StarFull from "../../assets/icons/ratestar/full.svg";
import StarHalf from "../../assets/icons/ratestar/half.svg";
import StarEmpty from "../../assets/icons/ratestar/empty.svg";

const destinationCard = ({id, order, picture, name, desc, rating, onclick}) => {

    // Rating star display
    const lowest_half = 0.46;
    const highest_half = 0.76;

    let whole_rating = 0;
    let has_half_rating = false;
    let empty_rating = 5;

    if((rating % 1.0) < lowest_half) {
        whole_rating = Math.floor(rating);
    } else if ((rating % 1.0) > highest_half) {
        whole_rating = Math.ceil(rating);
    } else {
        whole_rating = Math.floor(rating);
        has_half_rating = true;
    }

    if (whole_rating > 5) {
        has_half_rating = false;
        whole_rating = 5
    }
    
    empty_rating -= whole_rating;
    empty_rating -= has_half_rating ? 1 : 0;

    let fade_in_time = order;
    if(order > 8) fade_in_time = 1;

    return (
        <div style={{animation: `fade-in 500ms ${75*fade_in_time}ms forwards`}} className="bg-[#252527] font-quicksand rounded-lg min-w-75 min-h-75 opacity-0 cursor-pointer shadow-[#18081825] shadow-lg" onMouseUp={()=>{onclick(id)}}>
            <img
                src={picture}
                className="w-auto max-h rounded-tl-lg rounded-tr-lg"
            />
            <div className="p-5 pb-10">
                <div className="flex flex-row gap-2">
                    {
                        Array.from({length: whole_rating}).map(() => {
                            return <img src={StarFull} width="20"/>
                        })
                    }
                    {
                        has_half_rating ? <img src={StarHalf} width="20"/> : null
                    }
                    {
                        Array.from({length: empty_rating}).map(() => {
                            return <img src={StarEmpty} width="20"/>
                        })
                    }
                </div>
                <h2 className="mb-1/2 mt-1 text-2xl text-white tracking-wide">{name}</h2>
                <p className="my-1/2 mt-2 text-md text-[#aaa]">{desc}</p>
            </div>
        </div>
    );
};

export default destinationCard;
