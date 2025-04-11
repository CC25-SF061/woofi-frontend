import React, { useState } from 'react';
import SidebarAdmin from '../../components/admin/sidebar';
import HeaderAdmin from '../../components/admin/header';
import DashboardPreview from '../../components/admin/dashboard_preview';
import DashboardUser from '../../components/admin/dashboard_preview_user';
import DashboardDestinations from '../../components/admin/dashboard_preview_destinations';
import ModalMessage from '../../components/profile/modalMessage';

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasNewMessage, setHasNewMessage] = useState(true);
    const [search, setSearch] = useState('');

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
        <div className="w-full bg-[#221122] flex lg:h-screen text-white pl-10 overflow-y-auto">
            <SidebarAdmin />
            <HeaderAdmin
                selectedDate={{ get: selectedDate, set: setSelectedDate }}
                onNotifClick={() => {
                    setIsModalOpen(true);
                    setHasNewMessage(false);
                }}
                hasNewMessage={hasNewMessage}
                search={{ get: search, set: setSearch }}
            />
            <div className="pl-50 w-full">
                <DashboardPreview />
                <DashboardUser />
                <DashboardDestinations />
            </div>
        </div>
    );
};

export default Dashboard;
