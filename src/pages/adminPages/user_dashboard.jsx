import React, { useEffect, useState } from 'react';
import SidebarAdmin from '../../components/admin/sidebar';
import HeaderAdmin from '../../components/admin/header';
import UsersData from '../../components/admin/user_data';
import { IoClose } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../stores/loadingReducer';
import axios from 'axios';

const Dashboard = () => {
    const [search, setSearch] = useState('');
    const [userData, setUserData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasNewMessage, setHasNewMessage] = useState(true);
    const dispatch = useDispatch();

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
                <UsersData userData={userData} />
            </div>

            <ToastContainer />
        </div>
    );
};

export default Dashboard;
