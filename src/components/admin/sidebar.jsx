import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="fixed flex flex-col items-center justify-between overflow-hidden shadow-lg mt-19 pb-25 px-3 bg-[#252527] h-full w-fit font-quicksand z-20">
            <div className="flex flex-col items-center justify-center gap-5">
                <div className="text-center flex flex-col overflow-x-auto text-lg font-medium scroll-smooth whitespace-nowrap divide-y divide-[#ffffff3] rounded-lg justify-start md:justify-center w-45">
                    <Link
                        to="/admin"
                        className={`py-1 hover:text-gray-300 transition ${
                            location.pathname === '/admin'
                                ? 'text-[#FFA666] font-bold'
                                : ''
                        }`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/users"
                        className={`py-1 hover:text-gray-300 transition ${
                            location.pathname === '/admin/users'
                                ? 'text-[#FFA666] font-bold'
                                : ''
                        }`}
                    >
                        Users
                    </Link>
                    <Link
                        to="/admin/posts"
                        className={`py-1 hover:text-gray-300 transition ${
                            location.pathname === '/admin/posts'
                                ? 'text-[#FFA666] font-bold'
                                : ''
                        }`}
                    >
                        Posts
                    </Link>
                    <Link
                        to="/admin/contact"
                        className={`py-1 hover:text-gray-300 transition ${
                            location.pathname === '/admin/contact'
                                ? 'text-[#FFA666] font-bold'
                                : ''
                        }`}
                    >
                        Contact
                    </Link>
                </div>
            </div>

            <div className="flex flex-row gap-2">
                <div className="rounded-full border-white border-2 p-2"></div>
                <div className="rounded-full border-white border-2 p-2"></div>
                <div className="rounded-full border-white border-2 p-2"></div>
            </div>
        </div>
    );
};

export default Sidebar;
