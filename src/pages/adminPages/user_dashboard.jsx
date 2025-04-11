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

    return (
        <div className="w-full flex text-white overflow-y-auto pl-10">
            <SidebarAdmin />
            <HeaderAdmin
                selectedDate={{ get: selectedDate, set: setSelectedDate }}
                search={{ get: search, set: setSearch }}
            />
            <div className="pl-50 w-full">
                <UsersData userData={userData} />
            </div>

            <ToastContainer />
        </div>
    );
};

export default Dashboard;
