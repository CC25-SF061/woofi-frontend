import { useState } from 'react';
import { IoIosNotifications } from 'react-icons/io';
import ModalNotificationUser from './modalNotificationUser';
import { useSelector } from 'react-redux';
export const DekstopNotification = () => {
    const [isOpen, setIsOpen] = useState(false);
    const hasNotRead = useSelector(
        (state) => state.notificationUser.hasNotRead,
    );
    return (
        <>
            <div className="hidden lg:flex relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`border-white border-2 p-2 rounded-lg cursor-pointer hover:bg-[#FFA666] transition duration-300 
                    }`}
                >
                    <IoIosNotifications size={24} />
                    {hasNotRead && (
                        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                    )}
                </button>
            </div>
            <ModalNotificationUser
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
};
