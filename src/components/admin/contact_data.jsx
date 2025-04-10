import React, { useEffect, useRef, useState } from 'react';
import defaultProfile from '../../assets/icons/profile_outline.svg';

import { FaSearch } from 'react-icons/fa';
import LogoUsers from '../../assets/icons/admin/users.svg';
import ModalConfirm from '../dataDestination/deleteConfirm';
import ModalReply from '../profile/modalEdit';
import axios from 'axios';
import ModalMessage from '../profile/modalMessage';
const ContactData = ({
    profile_image,
    name,
    email,
    reason,
    message,
    state,
    tableRowTemplate,
    isOpen,
    onToggle,
}) => {
    const states = [
        <div className="w-fit px-4 py-1 text-black font-semibold bg-[#63ffa1] text-sm tracking-wider rounded-md">
            <p>Succes is replyed</p>
        </div>,
        <div className="w-fit px-4 py-1 bg-red-500 text-white text-sm tracking-wider rounded-md">
            <p>On review</p>
        </div>,
    ];

    const [contactStatus, setContactStatus] = useState(state);
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [replyValue, setReplyValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const changeStatus = () => {
        setContactStatus((prev) => (prev === 0 ? 1 : 0));
        onToggle();
    };

    const handleDetail = () => {
        setIsModalOpen(true); // buka modal
    };

    const handleDetailCloseModal = () => {
        setIsModalOpen(false); // tutup modal
    };

    const openReplyModal = () => {
        setIsReplyModalOpen(true);
    };

    const closeReplyModal = () => {
        setIsReplyModalOpen(false);
    };

    const handleChangeStatusClick = () => {
        setShowConfirmModal(true);
    };

    const handleCloseChangeStatus = () => {
        setShowConfirmModal(false);
    };

    const handleReplySubmit = (e) => {
        e.preventDefault();
        console.log(`Reply message for ${name}:`, replyValue);
        setReplyValue('');
        closeReplyModal();
    };

    return (
        <div
            className="grid w-full items-center bg-[#1E1E20] py-3 px-5 text-white"
            style={tableRowTemplate}
        >
            <div className="flex items-center gap-3">
                <img
                    className="h-9 w-9 rounded-full object-cover"
                    src={
                        profile_image
                            ? new URL(
                                  profile_image,
                                  import.meta.env.VITE_STATIC_ASSET_BASE_URL,
                              ).href
                            : defaultProfile
                    }
                    alt="User"
                />
                <div className="flex flex-col">
                    <p className="font-semibold">{name}</p>
                    <p className="text-sm text-gray-400">{email}</p>
                </div>
            </div>
            <p className="text-sm text-gray-300">{reason}</p>
            <div>{states[contactStatus]}</div>
            <div className="relative">
                <button
                    className="font-bold tracking-wider cursor-pointer px-2 py-1 rounded hover:bg-[#333]"
                    onClick={onToggle}
                >
                    ...
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 z-30 w-44 bg-[#1E1E20] text-gray-400 border border-[#444] rounded-md shadow-xl overflow-hidden">
                        <button
                            onClick={handleChangeStatusClick}
                            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left"
                        >
                            Change to{' '}
                            {contactStatus === 0 ? 'review' : 'succes'}
                        </button>
                        <div className="w-sm">
                            <ModalConfirm
                                isOpen={showConfirmModal}
                                item={{
                                    name:
                                        contactStatus === 0
                                            ? 'review'
                                            : 'succes',
                                }}
                                title="Change Contact Status"
                                message={`Are you sure you want to change this contact's status to ${contactStatus === 0 ? 'On review' : 'Succes'}?`}
                                onCancel={handleCloseChangeStatus}
                                onConfirm={changeStatus}
                                confirmText="Yes, Change"
                                confirmBg="bg-blue-600"
                                confirmHover="hover:bg-blue-800"
                            />
                        </div>
                        <button
                            onClick={openReplyModal}
                            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left"
                        >
                            Reply Messsage
                        </button>
                        <button
                            onClick={handleDetail}
                            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left"
                        >
                            See Detail
                        </button>
                        <ModalMessage
                            isOpen={isModalOpen}
                            onClose={handleDetailCloseModal}
                            title="Detail Contact"
                            maxWidth="max-w-xl"
                        >
                            <div
                                className="p-4 space-y-4"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <div className="flex flex-col gap-2">
                                    <label className="block text-white">
                                        Username:
                                    </label>
                                    <input
                                        readOnly
                                        type="text"
                                        className="w-full p-3 font-quicksand rounded text-white border bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="block text-white">
                                        Display Name:
                                    </label>
                                    <input
                                        readOnly
                                        type="text"
                                        className="w-full p-3 font-quicksand rounded text-white border bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="block text-white">
                                        Email:
                                    </label>
                                    <input
                                        readOnly
                                        type="text"
                                        className="w-full p-3 font-quicksand rounded text-white border bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]"
                                    />
                                </div>
                            </div>
                        </ModalMessage>
                    </div>
                )}
            </div>
            <ModalReply
                isOpen={isReplyModalOpen}
                onClose={closeReplyModal}
                onSubmit={handleReplySubmit}
                title="Reply Message"
            >
                <p className="text-sm text-gray-300 mb-2">
                    Reply message for{' '}
                    <span className="font-semibold text-white">
                        {name}
                    </span>{' '}
                </p>

                <textarea
                    required
                    className="bg-[#1E1E20] border border-[#444] w-full p-3 rounded text-white resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
                    rows={4}
                    placeholder="Enter your reply here..."
                    value={replyValue}
                    onChange={(e) => setReplyValue(e.target.value)}
                />
            </ModalReply>
        </div>
    );
};

const ContactDataTable = () => {
    const tableRowTemplate = { gridTemplateColumns: ' 4fr 4fr 3fr 1fr' };
    const [searchTerm, setSearchTerm] = useState('');
    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
    const [stateFilter, setStateFilter] = useState('all');
    const [contacts, setContacts] = useState([]);
    const prevPage = useRef(0);
    const handleSearch = () => {
        console.log('Mencari:', searchTerm);
        // Lanjutkan logika pencarian, misalnya panggil API atau filter data
    };
    const searchContact = async (page = 0) => {
        try {
            const response = await axios.get('/api/admin/contacts');
            setContacts(response.data.data);

            prevPage.current = page;
        } catch (e) {
            console.log(e);
            return toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };
    useEffect(() => {
        (async () => {
            await searchContact();
        })();
    }, []);
    return (
        <div className="flex flex-col items-stretch justify-center p-6 pt-28 gap-8 font-quicksand">
            {/* Title Section */}
            <div className="py-6 flex flex-col items-center bg-[#252527] rounded-md shadow-lg shadow-[#00000055]">
                <img src={LogoUsers} alt="contacts Icon" className="w-8 mb-1" />
                <h2 className="text-[#aaa] tracking-wide text-xl">
                    See all Contact Data
                </h2>
            </div>

            {/* Search */}
            <div className="flex gap-4 mb-2 w-full items-center">
                <div className="relative w-full md:w-1/2">
                    <input
                        type="text"
                        className="w-full p-2 pr-10 rounded-md bg-[#1E1E20] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#FFA666]"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute inset-y-0 right-0 flex items-center justify-center px-3 rounded-md hover:bg-[#FFA66622] transition duration-200 cursor-pointer"
                        title="Search"
                    >
                        <FaSearch className="text-xl text-[#FFA666]" />
                    </button>
                </div>
                <div className="w-40">
                    <select
                        value={stateFilter}
                        onChange={(e) => setStateFilter(e.target.value)}
                        className="w-full p-2 rounded-md bg-[#1E1E20] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#FFA666]"
                    >
                        <option value="all">All Status</option>
                        <option value="succes">Replied</option>
                        <option value="review">Not Replied</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="flex flex-col divide-white divide-y overflow-x-auto rounded-lg">
                {/* Header */}
                <div
                    className="grid w-full items-center bg-[#FFA666] py-3 px-5 text-black font-semibold tracking-wide"
                    style={tableRowTemplate}
                >
                    <p>User Info</p>
                    <p>Reason</p>
                    <p>Status</p>
                    <p>Actions</p>
                </div>

                {/* Data Rows */}
                {contacts.length > 0 ? (
                    contacts.map((v, index) => (
                        <ContactData
                            key={index}
                            id={v.id}
                            profile_image={v.profile_image}
                            name={v.name}
                            email={v.email}
                            reason={v.reason}
                            message={v.message}
                            state={v.state}
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
                    <div className="text-center text-white py-6 bg-[#1E1E20] rounded-b-lg">
                        No contacts found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactDataTable;
