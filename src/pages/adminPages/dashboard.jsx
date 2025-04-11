import React, { useState } from 'react';
import SidebarAdmin from '../../components/admin/sidebar';
import HeaderAdmin from '../../components/admin/header';
import DashboardPreview from '../../components/admin/dashboard_preview';
import DashboardUser from '../../components/admin/dashboard_preview_user';
import DashboardDestinations from '../../components/admin/dashboard_preview_destinations';
import ModalMessage from '../../components/profile/modalMessage';

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="w-full bg-[#221122] flex lg:h-screen text-white pl-10 overflow-y-auto">
            <SidebarAdmin />
            <HeaderAdmin
                selectedDate={{ get: selectedDate, set: setSelectedDate }}
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
