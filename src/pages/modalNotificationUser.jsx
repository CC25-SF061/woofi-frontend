import React, { useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchNotificationUser,
    markNotificationUser,
} from '../stores/notificationUserReducer';
// import { markNotificationUser } from '../../stores/notificationUserReducer.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/en';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale('en');

const ModalNotificationUser = ({
    isOpen,
    onClose,
    title = 'Message Notification',
    maxWidth = 'max-w-5xl',
}) => {
    const MotionDiv = motion.div;
    const notifications = useSelector((state) => state.notificationUser.data);
    const prevOpen = useRef(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNotificationUser());
    }, []);
    useEffect(() => {
        if (!isOpen && prevOpen.current) {
            dispatch(markNotificationUser());
        }
        prevOpen.current = isOpen;
    }, [isOpen]);

    const formatDate = (dateString) => {
        const date = dayjs(dateString);
        const now = dayjs();
        const diffInDays = now.diff(date, 'day');

        if (diffInDays === 0) {
            return date.fromNow();
        } else {
            return date.format('dddd, MMMM DD, YYYY');
        }
    };

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

                        <div className="p-4 space-y-4">
                            {notifications.map((notification) => {
                                return (
                                    <div
                                        key={notification.id}
                                        className={`${notification.is_read ? '' : 'bg-[#333339]'} border border-gray-600 rounded-lg px-4 py-3 text-white`}
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-semibold">
                                                {notification.from}
                                            </span>
                                            <span className="text-sm text-gray-400">
                                                {formatDate(
                                                    notification.created_at,
                                                )}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-300">
                                            {notification.detail}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

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

export default ModalNotificationUser;
