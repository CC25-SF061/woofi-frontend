import React, { useState, useEffect } from 'react';
import Image8 from '../assets/homePage/image8.webp';
import LogoWoofi from '../assets/navbar/logo.webp';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp } from '../util/animation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../stores/userReducer';

const JoinUs = () => {
    const user = useSelector((state) => state.user.data);

    return (
        <>
            <motion.div
                className="relative flex flex-col items-center text-white py-12 bg-cover bg-center bg-no-repeat min-h-full"
                style={{ backgroundImage: `url(${Image8})` }}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.1 }}
                variants={fadeInUp}
            >
                {/* Overlay Background */}
                <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
                <div
                    className="absolute top-0 w-full z-10"
                    style={{
                        background:
                            'linear-gradient(to bottom, #221122 0%, rgba(34, 17, 34, 0.00) 61%)',
                        height: '40%',
                    }}
                ></div>

                {/* Content */}
                <div className="relative z-20 w-full max-w-md px-6 flex flex-col items-center text-center">
                    <img
                        src={LogoWoofi}
                        alt="Logo Woofi"
                        className="w-28 mb-4"
                    />
                    <hr className="w-full border-t-2 border-white my-4" />
                    <h1 className="font-inknut-antiqua text-2xl md:text-3xl mb-6">
                        Join With Us
                    </h1>
                    <p className="font-quicksand text-lg md:text-xl mb-4 max-w-lg">
                        Be part of the Woofi community and explore the beauty of
                        Indonesia together!
                    </p>

                    {!user.id ? (
                        <Link
                            to="/sign-in"
                            className="px-8 py-2 border border-white rounded-md hover:bg-white hover:text-black transition duration-300 font-semibold text-lg"
                        >
                            Click Here
                        </Link>
                    ) : (
                        <Link
                            to="/profile"
                            className="px-8 py-2 border border-white rounded-md hover:bg-white hover:text-black transition duration-300 font-semibold text-lg"
                        >
                            Click Here
                        </Link>
                    )}
                </div>
            </motion.div>
        </>
    );
};

export default JoinUs;
