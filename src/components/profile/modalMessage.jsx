import React from 'react';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

const ModalMessage = ({ isOpen, onClose, children, title = 'Message Notification', maxWidth = 'max-w-5xl' }) => {
    const MotionDiv = motion.div;

    return (
        <AnimatePresence>
            {isOpen && (
                <MotionDiv
                    className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-80 backdrop-blur-md z-50 font-quicksand top-20 lg:top-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className={`relative p-4 py-0 w-full ${maxWidth} rounded-lg shadow-lg bg-[#252527] lg:max-h-[80vh] max-h-[70vh] overflow-y-auto`}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-[#252527] z-10 p-4 pt-8 border-b rounded-t border-gray-600">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-white">
                                    {title}
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="text-white bg-transparent hover:bg-white hover:text-[#FFA666] rounded-sm text-2xl cursor-pointer"
                                >
                                    <IoClose />
                                </button>
                            </div>
                        </div>

                        {/* 👇 INI WAJIB AGAR KONTEN TAMPIL */}
                        <div className="p-4 space-y-4">{children}</div>

                        {/* Footer */}
                        <div className="sticky bottom-0 bg-[#252527] z-10 p-4 pb-6 border-t border-gray-600 rounded-b flex justify-end">
                            <button
                                onClick={onClose}
                                className="py-2.5 px-5 text-sm font-semibold text-black rounded-lg hover:bg-gray-400 bg-white cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </MotionDiv>
            )}
        </AnimatePresence>
    );
};

export default ModalMessage;
