import React, { useState } from 'react';
import ProfileIcon from '../../assets/navbar/Icon.webp';
import Notification from '../../assets/profile/ic--baseline-notifications-none.svg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Sidebar from '../../components/profile/sidebar';
import { HiX } from 'react-icons/hi';
import { RiMenu2Line } from 'react-icons/ri';
import { IoIosNotifications } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';

const Profile = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [editSection, setEditSection] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const user = useSelector((state) => state.user.data);
    const [username, setUsername] = useState(user.username);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="w-full bg-[#221122] flex lg:h-screen items-center justify-center p-5 lg:p-10 gap-5 text-white">
            {/* Header Mobile */}
            <div className="lg:hidden p-5 fixed z-30 top-0 w-full bg-[#252527] flex justify-between items-center shadow-xl">
                <button
                    className="bg-[#FFA666] p-2 rounded-lg text-black cursor-pointer"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? (
                        <HiX size={24} />
                    ) : (
                        <RiMenu2Line size={24} />
                    )}
                </button>
                <button className="bg-[#FFA666] text-black font-quicksand p-2 rounded-lg cursor-pointer">
                    <IoIosNotifications size={24} />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-20 w-64 bg-[#252527] transform transition-transform duration-300 ease-in-out shadow-lg lg:hidden lg:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <Sidebar />
            </div>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-10 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            <div className="hidden lg:flex h-full">
                <Sidebar />
            </div>

            <div className="flex flex-col flex-1 rounded-lg overflow-hidden shadow-lg bg-[#252527] p-5 m-5 lg:m-0 h-full lg:w-3/4 mt-20">
                <div className="flex justify-between items-center border-white border-b-2 pb-5 rounded-b-lg">
                    <div className="flex flex-row gap-3 items-center">
                        <img
                            src={ProfileIcon}
                            alt="Profile"
                            className="rounded-full w-20 cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        />
                        <div className="flex flex-col gap-2">
                            <h1 className="font-inknut-antiqua text-3xl">
                                {user.username}
                            </h1>
                            <p className="font-quicksand">{user.name}</p>
                        </div>
                    </div>
                    <div className="hidden lg:flex">
                        <button className="border-white border-2 text-white font-quicksand p-2 rounded-lg cursor-pointer">
                            <IoIosNotifications size={24} />
                        </button>
                    </div>
                </div>

                <h1 className="font-inknut-antiqua text-2xl text-center my-4">
                    {editSection
                        ? `Edit ${editSection}`
                        : 'Account Information'}
                </h1>

                {!editSection && (
                    <div className="flex flex-col gap-2 h-full overflow-y-auto">
                        <div className="flex flex-col lg:w-xl">
                            <p className="font-quicksand text-white pb-2">
                                Username
                            </p>
                            <div className="flex flex-col lg:flex-row gap-3 w-full">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    placeholder="Your Username"
                                    className="flex-3 p-3 font-quicksand rounded text-white border border-white focus:outline-none"
                                />
                                <button
                                    className="flex-1 lg:p-3 py-1 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer"
                                    onClick={() => setEditSection('Username')}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col lg:w-xl">
                            <p className="font-quicksand text-white pb-2">
                                Display Name
                            </p>
                            <div className="flex flex-col lg:flex-row gap-3 w-full">
                                <input
                                    type="text"
                                    placeholder="Your Display Name"
                                    className="flex-3 p-3 font-quicksand rounded text-white border border-white focus:outline-none"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <button
                                    className="flex-1 lg:p-3 py-1 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer"
                                    onClick={() =>
                                        setEditSection('Display Name')
                                    }
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col lg:w-xl">
                            <p className="font-quicksand text-white pb-2">
                                Email
                            </p>
                            <div className="flex flex-col lg:flex-row gap-3 w-full">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="flex-3 p-3 font-quicksand rounded text-white border border-white focus:outline-none"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    className="flex-1 lg:p-3 py-1 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer"
                                    onClick={() => setEditSection('Email')}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col lg:w-xl">
                            <p className="font-quicksand text-white pb-2">
                                Password
                            </p>
                            <div className="flex flex-col lg:flex-row gap-3 w-full">
                                <div className="relative flex-1">
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder="Password"
                                        className="w-full p-3 pr-10 font-quicksand rounded text-white border border-white bg-transparent focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>
                                </div>
                                <button
                                    className="lg:w-38 lg:p-3 py-1 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer"
                                    onClick={() => setEditSection('Password')}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        <button className="w-38 mt-10 p-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer">
                            Logout
                        </button>
                    </div>
                )}

                {editSection && (
                    <div className="flex flex-col gap-4 h-full">
                        <div className="w-full">
                            <p className="font-quicksand text-white pb-2">
                                {editSection} Before
                            </p>
                            <input
                                type="text"
                                placeholder={`${editSection}-Before`}
                                className="w-full p-3 font-quicksand rounded text-white border border-white focus:outline-none bg-transparent"
                            />
                        </div>
                        <div className="w-full">
                            <p className="font-quicksand text-white pb-2">
                                {editSection} After
                            </p>
                            <input
                                type="text"
                                placeholder={`${editSection}-After`}
                                className="w-full p-3 font-quicksand rounded text-white border border-white focus:outline-none bg-transparent"
                            />
                        </div>
                        <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between lg:mt-auto mt-10">
                            <button
                                className="lg:w-38 p-3 bg-red-500 text-white font-quicksand rounded hover:bg-red-700 transition cursor-pointer"
                                onClick={() => setEditSection(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="lg:w-38 p-3 bg-[#4AFF71] text-[#252527] font-quicksand rounded hover:bg-orange-500 transition cursor-pointer"
                                onClick={() => setEditSection(null)}
                            >
                                Save & Quit
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-80 flex justify-center items-center backdrop-blur-md z-50 font-quicksand">
                    <div className="relative p-4 py-0 w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-700 max-h-[90vh] overflow-y-auto">

                        <div className="sticky top-0 bg-white dark:bg-gray-700 z-10 p-4 pt-8 border-b rounded-t dark:border-gray-600">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Change Profile Photo
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-sm text-xl cursor-pointer"
                                >
                                    <IoClose />
                                </button>
                            </div>
                        </div>

                        <div className='p-4 text-center divide-y-1 divide-white flex flex-col'>
                            <button className='p-2 cursor-pointer font-semibold text-blue-500'>
                                Upload Photo
                            </button>
                            <button className='p-2 cursor-pointer font-semibold text-red-500'>
                                Remove Current Photo
                            </button>
                            <button className='p-2 cursor-pointer font-semibold'>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
