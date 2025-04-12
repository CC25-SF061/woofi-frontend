import { useState, React } from 'react';

import { motion } from 'framer-motion';

const DestinationGroup = ({ name, detail, writer, creationDate, userId }) => {
    return (
        <div className="text-white flex flex-col gap-5 w-full">
            <hr className="opacity-25"></hr>
            <p className="font-quicksand text-lg font-semibold tracking-wider">
                {name}
            </p>
            <p className="font-quicksand font-light tracking-wide whitespace-pre-wrap">
                {detail}
            </p>
            <hr className="opacity-75"></hr>
            <div className="flex flex-row">
                <h2 className="text-xl font-inknut-antiqua font-black tracking-wider md:text-3xl">
                    Written By
                </h2>
                <div className="ml-auto font-quicksand">
                    <h3 className="text-xl text-right md:text-2xl font-semibold">
                        <a
                            href={`/user-detail/${userId}`}
                            className="underline"
                        >
                            {writer}
                        </a>
                    </h3>
                    <h3 className="text-md text-right text-gray-100 font-light">
                        {`at ${new Date(creationDate).toDateString()}`}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default DestinationGroup;
