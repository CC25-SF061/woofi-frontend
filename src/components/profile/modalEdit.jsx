import React from 'react';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

const ModalEdit = ({
    isOpen,
    title = 'Change Password',
    onClose,
    onSubmit,
    children,
}) => {
    const MotionDiv = motion.div;
    const handleCloseModal = () => {
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <MotionDiv
                    onClick={(e) => {
                        if (e.target === e.currentTarget) handleCloseModal();
                    }}
                    className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-80 backdrop-blur-md z-50 font-quicksand top-20 lg:top-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <MotionDiv
                        className="relative p-4 py-0 w-full max-w-lg rounded-lg shadow-lg bg-[#252527] lg:max-h-[90vh] max-h-[70vh] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
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
                                    onClick={handleCloseModal}
                                    type="button"
                                    className="text-white bg-transparent hover:bg-white hover:text-[#FFA666] rounded-sm text-2xl cursor-pointer"
                                >
                                    <IoClose />
                                </button>
                            </div>
                        </div>

                        {/* Form Content */}
                        <form onSubmit={onSubmit} className="flex flex-col">
                            <div className="overflow-y-auto p-4">
                                {children}
                            </div>

                            {/* Footer Buttons */}
                            <div className="sticky bottom-0 bg-[#252527] z-10 p-4 pb-8 border-t border-gray-600 rounded-b flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="py-2.5 px-5 text-sm font-semibold text-black rounded-lg hover:bg-gray-400 bg-white cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </MotionDiv>
                </MotionDiv>
            )}
        </AnimatePresence>
    );
};

export default ModalEdit;
