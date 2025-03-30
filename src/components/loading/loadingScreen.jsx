// src/components/LoadingScreen.jsx
import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <motion.div
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md z-1000"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="flex flex-col items-center space-y-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
                {/* Efek animasi lingkaran berputar */}
                <motion.div
                    className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: 'linear',
                    }}
                />

                {/* Teks Loading dengan efek fade-in */}
                <motion.p
                    className="text-white text-xl font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                >
                    Loading...
                </motion.p>
            </motion.div>
        </motion.div>
    );
};

export default LoadingScreen;
