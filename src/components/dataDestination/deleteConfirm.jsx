import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

const deleteConfirm = ({
    isOpen,
    item,
    title = 'Confirm Delete',
    message,
    onCancel,
    onConfirm,
    cancelText = 'Cancel',
    confirmText = 'Yes, Delete',
    confirmBg = 'bg-red-600',
    confirmHover = 'hover:bg-red-800',
    cancelBg = 'bg-white',
    cancelHover = 'hover:bg-gray-400',
}) => {
    const MotionDiv = motion.div;

    const handleCloseModal = () => {
        onCancel(null);
    };

    return (
        <div>
            <AnimatePresence>
                {isOpen && item && (
                    <MotionDiv
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-80 backdrop-blur-md font-quicksand top-20 lg:top-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <MotionDiv
                            className="relative p-4 w-full max-w-lg rounded-lg shadow-lg bg-[#252527]"
                            initial={{ y: '-20%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '-10%', opacity: 0 }}
                            transition={{
                                type: 'spring',
                                damping: 20,
                                stiffness: 300,
                            }}
                        >
                            <div className="flex items-center justify-between border-b p-4 rounded-t border-gray-600">
                                <h3 className="text-xl font-semibold text-white">
                                    {title}
                                </h3>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-white bg-transparent hover:bg-white hover:text-[#FFA666] rounded-sm text-2xl cursor-pointer"
                                >
                                    <IoClose />
                                </button>
                            </div>
                            <div className="p-4 space-y-4">
                                {message ? (
                                    <p className="text-base leading-relaxed text-white">
                                        {message}
                                    </p>
                                ) : (
                                    <p className="text-base leading-relaxed text-white">
                                        Are you sure you want to delete{' '}
                                        <span className="text-red-600 font-bold">
                                            {item.name}
                                        </span>
                                        ?
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b border-gray-600 gap-3">
                                <button
                                    onClick={handleCloseModal}
                                    className={`py-2.5 px-5 text-sm font-semibold text-black rounded-lg ${cancelBg} ${cancelHover} cursor-pointer`}
                                >
                                    {cancelText}
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className={`text-white font-semibold rounded-lg text-sm px-5 py-2.5 cursor-pointer ${confirmBg} ${confirmHover}`}
                                >
                                    {confirmText}
                                </button>
                            </div>
                        </MotionDiv>
                    </MotionDiv>
                )}
            </AnimatePresence>
        </div>
    );
};

export default deleteConfirm;
