import { useState } from 'react';
import { IoIosNotifications } from 'react-icons/io';
import ModalNotificationUser from './modalNotificationUser';
import { useSelector } from 'react-redux';
export const MobileNotification = () => {
    const [isOpen, setIsOpen] = useState(false);
    const hasNotRead = useSelector(
        (state) => state.notificationUser.hasNotRead,
    );
    return (
        <>
            <button
                className="bg-[#FFA666] text-black font-quicksand p-2 rounded-lg cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <IoIosNotifications size={24} />
                {hasNotRead && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                )}
            </button>
            <ModalNotificationUser
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
};
