import React, { useEffect, useState, useRef } from 'react';
import LogoUsers from '../../assets/icons/admin/users.svg';
import TempUserProfile from '../../assets/logIn/image2.webp';
import TempUserProfile2 from '../../assets/logIn/image4.webp';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import ModalEdit from '../profile/modalEdit';
import DeleteConfirm from '../dataDestination/deleteConfirm';

const UserData = ({
    pfp,
    name,
    email,
    role,
    tableRowTemplate,
    isOpen,
    onToggle,
}) => {
    const roles = [
        <div className="w-fit px-4 py-1 text-black bg-[#ff853e] text-sm tracking-wider rounded-md">
            <p>User</p>
        </div>,
        <div className="w-fit px-4 py-1 font-semibold bg-[#7A43EE] text-sm tracking-wider rounded-md">
            <p>Admin</p>
        </div>,
    ];

    const [userRole, setUserRole] = useState(role);
    const [banReason, setBanReason] = useState('');
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const changeRole = () => {
        setUserRole(userRole === 0 ? 1 : 0);
        setShowConfirmModal(false);
    };

    const openPopupBan = () => {
        setIsBanModalOpen(true);
    };

    const closePopupBan = () => {
        setIsBanModalOpen(false);
    };

    const handleChangeRoleClick = () => {
        setShowConfirmModal(true);
    };

    const handleCancelChangeRole = () => {
        setShowConfirmModal(false); 
    };

    const handleBanSubmit = (e) => {
        e.preventDefault();
        console.log(`Ban reason for ${name}:`, banReason);
        setBanReason('');
        closePopupBan();
    };

    const seeDetailUser = () => {
        // To do remove user
    };
    return (
        <div
            className="grid w-full items-center bg-[#252527] py-3 px-5 text-white relative"
            style={tableRowTemplate}
        >
            <div className="flex items-center gap-3">
                <img className="h-9 aspect-square rounded-3xl" src={pfp} />
                <div className="flex flex-col">
                    <p className="tracking-wide font-semibold">{name}</p>
                    <p className="tracking-tight text-gray-500 text-sm">
                        {email}
                    </p>
                </div>
            </div>

            {roles[userRole]}

            <div className="relative">
                <button
                    className="font-bold tracking-wider cursor-pointer px-2 py-1 rounded hover:bg-[#333]"
                    onClick={onToggle}
                >
                    ...
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 z-20 w-44 bg-[#1E1E20] text-gray-400 border border-[#444] rounded-md shadow-xl overflow-hidden">
                        <button
                            onClick={handleChangeRoleClick}
                            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left cursor-pointer"
                        >
                            Change to {userRole === 0 ? 'Admin' : 'User'}
                        </button>
                        <DeleteConfirm
                            isOpen={showConfirmModal}
                            item={{ name: userRole === 0 ? 'Admin' : 'User' }}
                            title="Change Role Confirmation"
                            message={`Are you sure you want to change this user's role to ${userRole === 0 ? 'Admin' : 'User'}?`}
                            onCancel={handleCancelChangeRole}
                            onConfirm={changeRole}
                            confirmText="Yes, Change"
                            confirmBg="bg-blue-600"
                            confirmHover="hover:bg-blue-800"
                        />
                        <button
                            onClick={openPopupBan}
                            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left cursor-pointer"
                        >
                            Ban User
                        </button>
                        <button
                            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left cursor-pointer"
                            onClick={seeDetailUser}
                        >
                            See detail
                        </button>
                    </div>
                )}
            </div>

            {/* Modal Ban */}
            <ModalEdit
                isOpen={isBanModalOpen}
                onClose={closePopupBan}
                onSubmit={handleBanSubmit}
                title="Ban User"
            >
                <p className="text-sm text-gray-300 mb-2">
                    Please provide a reason why{' '}
                    <span className="font-semibold text-white">{name}</span>{' '}
                    should be banned.
                </p>

                <textarea
                    required
                    className="bg-[#1E1E20] border border-[#444] w-full p-3 rounded text-white resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
                    rows={4}
                    placeholder="Enter reason here..."
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                />
            </ModalEdit>
        </div>
    );
};

const UserDataTable = () => {
    const tableRowTemplate = { gridTemplateColumns: '20fr 15fr 1fr' };
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);

    const [users] = useState([
        {
            pic: TempUserProfile,
            name: 'John Doe',
            email: 'john@example.com',
            role: 0,
        },
        {
            pic: TempUserProfile2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 1,
        },
        {
            pic: TempUserProfile,
            name: 'Michael Johnson',
            email: 'michael@example.com',
            role: 0,
        },
        {
            pic: TempUserProfile,
            name: 'Emily Davis',
            email: 'emily@example.com',
            role: 0,
        },
        {
            pic: TempUserProfile2,
            name: 'Robert Brown',
            email: 'robert@example.com',
            role: 1,
        },
        {
            pic: TempUserProfile2,
            name: 'Lisa White',
            email: 'lisa@example.com',
            role: 1,
        },
        {
            pic: TempUserProfile,
            name: 'Kevin Lee',
            email: 'kevin@example.com',
            role: 1,
        },
    ]);

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole =
            roleFilter === 'all' ||
            (roleFilter === 'admin' && user.role === 1) ||
            (roleFilter === 'user' && user.role === 0);

        return matchesSearch && matchesRole;
    });

    return (
        <div className="flex flex-col items-stretch justify-center p-6 pt-28 h-fit gap-8 font-quicksand ">
            <div className="py-6 flex flex-col items-center bg-[#252527] rounded-md shadow-lg shadow-[#00000055]">
                <img src={LogoUsers} alt="Users Icon" className="w-8 mb-1" />
                <h2 className="text-[#aaa] tracking-wide text-xl">
                    See all User Data
                </h2>
            </div>

            <div className="flex gap-4 mb-2 w-full items-center">
                {/* Search Input */}
                <div className="relative w-1/2">
                    <input
                        type="text"
                        className="w-full p-2 rounded-md bg-[#1E1E20] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#FFA666]"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center p-2 pl-4">
                        <FaSearch className="text-xl text-[#FFA666aa]" />
                    </div>
                </div>

                {/* Role Filter */}
                <div className="w-40">
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="w-full p-2 rounded-md bg-[#1E1E20] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#FFA666]"
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col divide-white divide-y">
                {/* Table Header */}
                <div
                    className="grid w-full items-center bg-[#FFA666] py-3 px-5 rounded-tl-lg rounded-tr-lg text-black font-semibold tracking-wide"
                    style={tableRowTemplate}
                >
                    <div>
                        <p>User Data</p>
                    </div>
                    <div>
                        <p>Role</p>
                    </div>
                    <div>
                        <p>Actions</p>
                    </div>
                </div>

                {/* Table Contents */}
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((v, index) => (
                        <UserData
                            pfp={v.pic}
                            name={v.name}
                            email={v.email}
                            role={v.role}
                            tableRowTemplate={tableRowTemplate}
                            index={index}
                            isOpen={activeDropdownIndex === index}
                            onToggle={() =>
                                setActiveDropdownIndex((prev) =>
                                    prev === index ? null : index,
                                )
                            }
                        />
                    ))
                ) : (
                    <div className="text-center text-white py-6 bg-[#1E1E20]">
                        No users found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDataTable;
