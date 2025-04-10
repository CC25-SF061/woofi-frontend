import React, { useEffect } from 'react';
import Logo from '../../assets/navbar/logo.webp';
import LogoProfile from '../../assets/icons/profile_outline.svg';
import LogoNotif from '../../assets/icons/notification_outline.svg';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotificationAdmin } from '../../stores/notificationAdminReducer.js';

const Header = ({ onNotifClick, hasNewMessage }) => {
    const location = useLocation();
    const pathMap = {
        '/admin': 'Dashboard',
        '/admin/users': 'Users',
        '/admin/posts': 'Posts',
        '/admin/contact': 'Contact',
    };
    const dispatch = useDispatch();
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
        <header className="fixed top-0 left-0 right-0 z-10 bg-[#252527] shadow-md px-6 py-4 font-quicksand pl-64">
            <div className="flex items-center justify-between">
                {/* Logo & Title */}
                <div className="flex items-center gap-4">
                    <img src={Logo} alt="Logo Woofi" className="w-16 h-auto" />
                    <div>
                        <h1 className="text-white text-xl font-semibold tracking-wide">
                            Woofi Admin
                        </h1>
                        <p className="text-sm text-gray-400">/ {title}</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-5">
                    {/* Notification Icon */}
                    <div className="relative">
                        <button
                            onClick={onNotifClick}
                            className="hover:bg-white/10 p-2 rounded-full transition"
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
                        className="hover:bg-white/10 p-2 rounded-full transition"
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
    );
};

export default Header;
