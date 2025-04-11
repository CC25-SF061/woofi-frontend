import React, { useState } from 'react';
import SidebarAdmin from '../../components/admin/sidebar';
import HeaderAdmin from '../../components/admin/header';
import PostsData from '../../components/admin/post_data';

const Dashboard = () => {
    const [search, setSearch] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="w-full bg-[#221122] flex h-screen text-white lg:pl-10 overflow-y-auto">
            <SidebarAdmin />
            <HeaderAdmin
                selectedDate={{ get: selectedDate, set: setSelectedDate }}
                search={{ get: search, set: setSearch }}
            />
            <div className="lg:pl-50 w-full">
                <PostsData />
            </div>
        </div>
    );
};

export default Dashboard;
