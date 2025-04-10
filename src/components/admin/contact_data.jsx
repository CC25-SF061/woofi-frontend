import React, { useState } from 'react';
import TempUserProfile from '../../assets/logIn/image2.webp';
import TempUserProfile2 from '../../assets/logIn/image4.webp';
import { FaSearch } from 'react-icons/fa';
import LogoUsers from '../../assets/icons/admin/users.svg';
import ModalConfirm from '../dataDestination/deleteConfirm';
import ModalReply from '../profile/modalEdit';
import ModalMessage from '../profile/modalMessage';
const ContactData = ({
    pfp,
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
                    src={pfp}
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

    const [contacts] = useState([
        {
            pic: TempUserProfile,
            name: 'John Doe',
            email: 'john@example.com',
            reason: 'Interested in support',
            message: 'Can I get help with my account?',
            state: 0,
        },
        {
            pic: TempUserProfile2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            reason: 'Feedback',
            message: 'Great site! Just wanted to say thanks!',
            state: 1,
        },
        {
            pic: TempUserProfile,
            name: 'Michael Johnson',
            email: 'michael@example.com',
            reason: 'Bug Report',
            message: 'There’s a bug when submitting the form.',
            state: 1,
        },
        {
            pic: TempUserProfile,
            name: 'Emily Davis',
            email: 'emily@example.com',
            reason: 'Help needed',
            message: 'I can’t reset my password.',
            state: 1,
        },
        {
            pic: TempUserProfile2,
            name: 'Robert Brown',
            email: 'robert@example.com',
            reason: 'Business Inquiry',
            message: 'I’d like to collaborate with you.',
            state: 0,
        },
        {
            pic: TempUserProfile2,
            name: 'Lisa White',
            email: 'lisa@example.com',
            reason: 'Other',
            message: 'Just reaching out to say hi!',
            state: 1,
        },
        {
            pic: TempUserProfile,
            name: 'Kevin Lee',
            email: 'kevin@example.com',
            reason: 'Technical Issue',
            message: 'Error when uploading images.',
            state: 1,
        },
    ]);

    const filteredContacts = contacts.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesContact =
            stateFilter === 'all' ||
            (stateFilter === 'succes' && user.state === 1) ||
            (stateFilter === 'review' && user.state === 0);

        return matchesSearch && matchesContact;
    });

    const handleSearch = () => {
        console.log('Mencari:', searchTerm);
        // Lanjutkan logika pencarian, misalnya panggil API atau filter data
    };

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
                        <option value="succes">Succes is replyed</option>
                        <option value="review">On review</option>
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
                {filteredContacts.length > 0 ? (
                    filteredContacts.map((v, index) => (
                        <ContactData
                            key={index}
                            pfp={v.pic}
                            name={v.name}
                            email={v.email}
                            reason={v.reason}
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
