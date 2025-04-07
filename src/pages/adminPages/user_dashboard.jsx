import React, { useState } from 'react';
import SidebarAdmin from '../../components/admin/sidebar';
import HeaderAdmin from '../../components/admin/header';
import UsersData from '../../components/admin/user_data';
import { IoClose } from 'react-icons/io5';

const Dashboard = () => {
    const [search, setSearch] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasNewMessage, setHasNewMessage] = useState(true);

    const notifications = [
        {
            id: 1,
            sender: 'Admin',
            message: 'Your profile has been updated successfully.',
            time: '2 minutes ago',
        },
        {
            id: 2,
            sender: 'Support',
            message: "Don't forget to verify your email address.",
            time: '10 minutes ago',
        },
        {
            id: 3,
            sender: 'System',
            message: 'New update available for your dashboard.',
            time: '1 hour ago',
        },
    ];

    return (
        <div className="w-full flex text-white overflow-y-auto">
            <SidebarAdmin />
            <HeaderAdmin
                selectedDate={{ get: selectedDate, set: setSelectedDate }}
                search={{ get: search, set: setSearch }}
                onNotifClick={() => {
                    setIsModalOpen(true);
                    setHasNewMessage(false);
                }}
                hasNewMessage={hasNewMessage}
            />
            <div className="pl-50 w-full">
                <UsersData />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-80 backdrop-blur-md z-50 font-quicksand top-20 lg:top-0">
                    <div className="relative p-4 py-0 w-full max-w-7xl rounded-lg shadow-lg bg-[#252527] lg:max-h-[90vh] max-h-[70vh] overflow-y-auto">
                        <div className="sticky top-0 bg-[#252527] z-10 p-4 pt-8 border-b rounded-t border-gray-600">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-white">
                                    Message Notification
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-white bg-transparent hover:bg-white hover:text-[#FFA666] rounded-sm text-2xl cursor-pointer"
                                >
                                    <IoClose />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className="bg-[#333339] border border-gray-600 rounded-lg px-4 py-3 text-white"
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold">
                                            {notif.sender}
                                        </span>
                                        <span className="text-sm text-gray-400">
                                            {notif.time}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-300">
                                        {notif.message}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="sticky bottom-0 bg-[#252527] z-10 p-4 pb-6 border-t border-gray-600 rounded-b flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="py-2.5 px-5 text-sm font-semibold text-black rounded-lg hover:bg-gray-400 bg-white cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
