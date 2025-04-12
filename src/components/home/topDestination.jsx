import React from 'react';
import Image5 from '../../assets/homePage/image5.webp';
import Image6 from '../../assets/homePage/image6.webp';
import Image7 from '../../assets/homePage/image7.webp';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../util/animation';
import { Link } from 'react-router-dom';
import SeeDetail from '../seeDetail';

const topDestination = () => {
    return (
        <>
            {/* Top Destination */}

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.1 }}
                variants={fadeInUp}
                className=" flex flex-col items-center justify-center gap-4 py-12 px-8 lg:px-0 bg-[#252527] text-white"
            >
                <h1 className="font-inknut-antiqua lg:text-4xl text-2xl">
                    <span className="text-[#FFA666]">Top</span> Destination
                </h1>
                <p className="font-quicksand lg:text-2xl w-full md:w-3/4 text-xl text-center">
                    Explore Indonesia’s most stunning destinations, from
                    pristine beaches to majestic mountains. Find your next
                    adventure with Woofi!
                </p>

                <div className="lg:w-5xl">
                    <Link
                        to="/destination"
                        className="relative inline-block font-quicksand font-semibold hover:text-[#FFA666] transition-colors duration-300 group"
                    >
                        <span className="relative z-10">
                            See More Destination
                        </span>
                        <span className="absolute left-0 bottom-0 h-[2px] bg-[#FFA666] transition-all duration-300 w-0 group-hover:w-full"></span>
                    </Link>

                    <div className="flex flex-col lg:flex-row items-center gap-5 mt-4 lg:mt-0 aspect-square lg:aspect-auto">
                        <SeeDetail
                            image={Image5}
                            title="Bromo Mountain"
                            description="Explore the majestic Bromo Mountain, a breathtaking view of the sunrise."
                            // province="Jawa Timur"
                            name="Bromo Mountain"
                        />

                        <SeeDetail
                            image={Image6}
                            title="Raja Ampat"
                            description="Explore the beautiful Raja Ampat, a paradise for divers and snorkelers."
                            name="Raja Ampat"
                        />

                        <SeeDetail
                            image={Image7}
                            title="Komodo Island"
                            description="Explore the unique Komodo Island, home to the largest lizards in the world."
                            name="Komodo Island"
                        />
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default topDestination;
