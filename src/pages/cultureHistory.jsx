import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import HeroSection from '../components/heroSection';
import Image1 from '../assets/cultureHistory/image1.webp';
import JoinUs from '../components/joinUs';
import CulturalDiversity from '../components/culture/culturalDiversity';
import { fadeInUp, slideInLeft, slideInRight } from '../util/animation';

const CultureHistory = () => {
    return (
        <div>
            <Navbar />
            <HeroSection
                backgroundImage={Image1}
                title="Culture & History Of Indonesia"
                highlightedWord="Indonesia"
                description="Uncovering Indonesia's Colorful Cultural and Historical Wealth"
            />

            {/* Cultural Diversity */}
            <motion.section
                className="relative bg-[#221122] text-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.1 }}
                variants={slideInLeft}
            >
                <div className="px-6 md:px-10 pt-20 pb-30">
                    <h1 className="font-inknut-antiqua text-2xl w-fit mb-3">
                        <span className="text-[#FFA666]">Cultural</span>{' '}
                        Diversity
                    </h1>
                    <hr className="border-t-2 border-white my-2 rounded" />
                    <p className="font-quicksand mt-6 text-lg">
                        Indonesia is a land of incredible cultural richness,
                        home to hundreds of ethnic groups, languages, and
                        traditions. From the mesmerizing dances of Bali to the
                        sacred rituals of Toraja, every region offers a unique
                        story to explore. Experience vibrant festivals,
                        traditional crafts, and local wisdom that have been
                        passed down for generations. Discover the beauty of
                        Indonesia’s cultural heritage with Woofi!
                    </p>
                </div>
            </motion.section>

            {/* Indonesian History */}
            <motion.section
                className="relative bg-[#252527] text-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.1 }}
                variants={slideInRight}
            >
                <div className="px-6 md:px-10 pt-20 pb-30 text-right">
                    <h1 className="font-inknut-antiqua text-2xl w-fit mb-3">
                        Indonesian{' '}
                        <span className="text-[#FFA666]">History</span>
                    </h1>
                    <hr className="border-t-2 border-white my-2 rounded" />
                    <p className="font-quicksand mt-6 text-lg">
                        Indonesia’s history is a journey through time, shaped by
                        ancient kingdoms, colonial rule, and the spirit of
                        independence. From the majestic Borobudur and Prambanan
                        temples to the struggles that led to freedom in 1945,
                        every chapter tells a story of resilience and unity.
                        Explore Indonesia’s rich historical heritage and uncover
                        the legacy that defines the nation today!
                    </p>
                </div>
            </motion.section>

            <CulturalDiversity />
            <JoinUs />
            <Footer />
        </div>
    );
};

export default CultureHistory;
