import { React } from 'react';

const DestinationContentGenerated = ({ name, detail, writer }) => {
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
            <div className="lg:flex flex-row">
                <h2 className="text-xl font-inknut-antiqua font-black tracking-wider md:text-3xl">
                    Written By
                </h2>
                <div className="ml-auto font-quicksand pt-1 lg:pt-0">
                    <h3 className="text-xl lg:text-right md:text-2xl font-semibold">
                        {writer}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default DestinationContentGenerated;
