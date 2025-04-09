import React, { useState } from 'react';
import SidebarAdmin from '../../components/admin/sidebar';
import HeaderAdmin from '../../components/admin/header';
import PostsData from '../../components/admin/post_data';
import ModalMessage from '../../components/profile/modalMessage';

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
        <div className="w-full flex text-white overflow-y-auto pl-10">
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
                <PostsData />
            </div>

            <ModalMessage
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Message Notification"
                maxWidth="max-w-7xl"
            >
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
                        <p className="text-sm text-gray-300">{notif.message}</p>
                    </div>
                ))}
            </ModalMessage>
        </div>
    );
};

export default Dashboard;
