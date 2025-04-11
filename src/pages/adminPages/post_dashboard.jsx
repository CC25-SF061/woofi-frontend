import React, { useState } from 'react';
import SidebarAdmin from '../../components/admin/sidebar';
import HeaderAdmin from '../../components/admin/header';
import PostsData from '../../components/admin/post_data';
import ModalMessage from '../../components/profile/modalMessage';

const Dashboard = () => {
    const [search, setSearch] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="w-full flex text-white overflow-y-auto pl-10">
            <SidebarAdmin />
            <HeaderAdmin
                selectedDate={{ get: selectedDate, set: setSelectedDate }}
                search={{ get: search, set: setSearch }}
            />
            <div className="pl-50 w-full">
                <PostsData />
            </div>
        </div>
    );
};

export default Dashboard;
