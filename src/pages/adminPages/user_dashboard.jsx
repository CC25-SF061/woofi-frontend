import React, { useState } from 'react';
import SidebarAdmin from '../../components/admin/sidebar';
import HeaderAdmin from '../../components/admin/header';
import UsersData from '../../components/admin/user_data';

const Dashboard = () => {
    const [search, setSearch] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="w-full bg-[#221122] flex text-white overflow-y-auto">
            <SidebarAdmin />
            <HeaderAdmin
                selectedDate={{ get: selectedDate, set: setSelectedDate }}
                search={{ get: search, set: setSearch }}
            />
            <div className="pl-50 w-full">
                <UsersData />
            </div>
        </div>
    );
};

export default Dashboard;
