import React, { useState } from 'react';
import SidebarAdmin from '../../components/admin/sidebar';
import HeaderAdmin from '../../components/admin/header';
import DashboardAdmin from '../../components/admin/dashboard';

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div className="w-full h-full bg-[#221122] flex lg:h-screen text-white">
            <SidebarAdmin />
            <HeaderAdmin
                selectedDate={{ get: selectedDate, set: setSelectedDate }}
            />
            <div className="pl-50 w-full">
                <DashboardAdmin />
            </div>
        </div>
    );
};

export default Dashboard;
