import React from 'react';
import Logo from '../../assets/navbar/logo.webp';
import LogoProfile from '../../assets/icons/profile_outline.svg';
import LogoNotif from '../../assets/icons/notification_outline.svg';
import LogoRefresh from '../../assets/icons/admin/refresh.svg';
import LogoDate from '../../assets/icons/admin/date.svg';
import { FaSearch } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ search, onNotifClick, hasNewMessage }) => {
    const location = useLocation();
    let pathName =
        location.pathname.charAt(location.pathname.length - 1) === '/'
            ? location.pathname.slice(0, location.pathname.length - 1)
            : location.pathname;
    let name = '';
    switch (pathName) {
        case '/admin':
            name = 'Admin Dashboard';
            break;
        case '/admin/users':
            name = 'Admin Dashboard / Users ';
            break;
        case '/admin/posts':
            name = 'Admin Dashboard / Posts';
            break;
        case '/admin/contact':
            name = 'Admin Dashboard / Contact';
            break;
    }

    const handleDataRefresh = () => {
        // do stuff based on the current location
    };

    return (
        <div className="fixed overflow-hidden h-fit w-full font-quicksand pb-5 z-10">
            <div className="relative flex flex-row items-center shadow-lg bg-[#252527] p-4 pt-5">
                <div className="flex flex-row w-fit items-center gap-3 mr-5 divide-white">
                    <img src={Logo} alt="Logo Woofi" className="w-15" />
                    <h1 className="text-xl text-white tracking-wide">
                        Woofi Admin
                    </h1>
                </div>
                <div className="bg-white h-10 w-[1px] mr-5"></div>
                <h1 className="text-2xl text-[#d2d2d2] tracking-wider">
                    {name}
                </h1>

                <div className="flex flex-row ml-auto gap-3">
                    <div className="relative flex items-center justify-center cursor-pointer">
                        <button onClick={onNotifClick}>
                            <img
                                src={LogoNotif}
                                alt="Notification Icon"
                                className="w-9 h-9 cursor-pointer"
                            />
                        </button>
                        {hasNewMessage && (
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full translate-x-1/4 -translate-y-1/4"></span>
                        )}
                    </div>
                    <Link
                        to="/profile"
                        className="flex items-center justify-center cursor-pointer"
                    >
                        <img
                            src={LogoProfile}
                            alt="Profile Icon"
                            className="w-9 h-9"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
