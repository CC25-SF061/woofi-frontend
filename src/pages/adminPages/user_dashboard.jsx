import React, { useState } from 'react';
import SidebarAdmin from '../../components/admin/sidebar';
import HeaderAdmin from '../../components/admin/header';
import UsersData from '../../components/admin/user_data';
import { ToastContainer } from 'react-toastify';

const Dashboard = () => {
    const [search, setSearch] = useState('');
    const [userData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="w-full bg-[#221122] flex h-screen text-white lg:pl-10 overflow-y-auto">
            <SidebarAdmin />
            <HeaderAdmin
                selectedDate={{ get: selectedDate, set: setSelectedDate }}
                search={{ get: search, set: setSearch }}
            />
            <div className="lg:pl-50 w-full">
                <UsersData userData={userData} />
            </div>

            <ToastContainer />
        </div>
    );
};

export default Dashboard;
