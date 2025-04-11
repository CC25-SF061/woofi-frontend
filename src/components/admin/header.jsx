import React, { useEffect, useState } from 'react';
import Logo from '../../assets/navbar/logo.webp';
import LogoProfile from '../../assets/icons/profile_outline.svg';
import LogoNotif from '../../assets/icons/notification_outline.svg';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotificationAdmin } from '../../stores/notificationAdminReducer.js';
import ModalNotification from './modalNotification.jsx';
import SidebarAdmin from '../admin/sidebar.jsx';
import { HiX } from 'react-icons/hi';
import { RiMenu2Line, RiMenu3Line } from 'react-icons/ri';

const Header = () => {
    const location = useLocation();
    const pathMap = {
        '/admin': 'Dashboard',
        '/admin/users': 'Users',
        '/admin/posts': 'Posts',
        '/admin/contact': 'Contact',
    };

    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarRightOpen, setIsSidebarRightOpen] = useState(false);
    const [isSidebarLeftOpen, setIsSidebarLeftOpen] = useState(false);

    const onNotifClick = () => setIsModalOpen(true);
    const onClose = () => setIsModalOpen(false);

    const hasNotRead = useSelector(
        (state) => state.notificationAdmin.hasNotRead,
    );

    const currentPath = location.pathname.endsWith('/')
        ? location.pathname.slice(0, -1)
        : location.pathname;

    useEffect(() => {
        dispatch(fetchNotificationAdmin());
    }, []);

    const title = pathMap[currentPath] || 'Dashboard';

    return (
        <>
            {/* Backdrop ketika sidebar terbuka */}
            {isSidebarRightOpen && (
                <div
                    className="fixed inset-0 bg-black/50 bg-opacity-50 z-10 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsSidebarRightOpen(false)}
                />
            )}

            {/* Sidebar Mobile Slide-in */}
            <div
                className={`fixed top-0 right-0 h-fit w-64 bg-[#252527] z-10 shadow-lg px-6 py-10 mt-20 flex flex-col gap-6 transform transition-transform duration-300 ease-in-out rounded-b-xl ${
                    isSidebarRightOpen ? 'translate-x-0' : 'translate-x-full'
                } lg:hidden`}
            >
                <div className="flex flex-col items-start gap-6">
                    <button
                        onClick={() => {
                            setIsModalOpen(true);
                            setIsSidebarRightOpen(false);
                        }}
                        className="flex items-center gap-3 text-white hover:text-[#FFA666] transition"
                    >
                        <img
                            src={LogoNotif}
                            alt="Notification"
                            className="w-6 h-6"
                        />
                        <span className="text-lg">Notification</span>
                        {hasNotRead && (
                            <span className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-ping" />
                        )}
                    </button>

                    <Link
                        to="/profile"
                        className="flex items-center gap-3 text-white hover:text-[#FFA666] transition"
                        onClick={() => setIsSidebarRightOpen(false)}
                    >
                        <img
                            src={LogoProfile}
                            alt="Profile"
                            className="w-6 h-6"
                        />
                        <span className="text-lg">Profile</span>
                    </Link>
                </div>
            </div>

            <SidebarAdmin
                isOpen={isSidebarLeftOpen}
                onClose={() => setIsSidebarLeftOpen(false)}
            />

            <header className="fixed top-0 left-0 right-0 z-10 bg-[#252527] shadow-md px-6 py-4 font-quicksand lg:pl-64 shadow-xl">
                <ModalNotification
                    isOpen={isModalOpen}
                    onClose={onClose}
                    title="Notification"
                />
                <div className="flex items-center justify-between">
                    {/* Sidebar Toggle Button Left */}
                    <button
                        className="bg-[#FFA666] p-2 rounded-lg text-black cursor-pointer lg:hidden"
                        onClick={() => {
                            if (!isSidebarRightOpen) {
                                setIsSidebarLeftOpen(!isSidebarLeftOpen);
                            }
                        }}
                    >
                        {isSidebarLeftOpen ? (
                            <HiX size={24} />
                        ) : (
                            <RiMenu2Line size={24} />
                        )}
                    </button>

                    {/* Logo & Title */}
                    <div className="flex items-center gap-4">
                        <img
                            src={Logo}
                            alt="Logo Woofi"
                            className="w-16 h-auto"
                        />
                        <div>
                            <h1 className="text-white text-xl font-semibold tracking-wide">
                                Woofi Admin
                            </h1>
                            <p className="text-sm text-gray-400">/ {title}</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-5">
                        {/* Sidebar Toggle Button Right */}
                        <button
                            className="bg-[#FFA666] p-2 rounded-lg text-black cursor-pointer lg:hidden"
                            onClick={() => {
                                if (!isSidebarLeftOpen) {
                                    setIsSidebarRightOpen(!isSidebarRightOpen);
                                }
                            }}
                        >
                            {isSidebarRightOpen ? (
                                <HiX size={24} />
                            ) : (
                                <RiMenu3Line size={24} />
                            )}
                        </button>

                        {/* Notification Icon */}
                        <div className="relative hidden lg:block">
                            <button
                                onClick={onNotifClick}
                                className="hover:bg-white/10 p-2 rounded-full transition cursor-pointer"
                                title="Notifications"
                            >
                                <img
                                    src={LogoNotif}
                                    alt="Notification"
                                    className="w-7 h-7"
                                />
                            </button>
                            {hasNotRead && (
                                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                            )}
                        </div>

                        {/* Profile Icon */}
                        <Link
                            to="/profile"
                            title="Profile"
                            className="hover:bg-white/10 p-2 rounded-full transition hidden lg:block"
                        >
                            <img
                                src={LogoProfile}
                                alt="Profile"
                                className="w-7 h-7"
                            />
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
