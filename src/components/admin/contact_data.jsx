import React, { useEffect, useRef, useState } from 'react';
import defaultProfile from '../../assets/icons/profile_outline.svg';

import { FaSearch } from 'react-icons/fa';
import LogoUsers from '../../assets/icons/admin/users.svg';
import ModalReply from '../profile/modalEdit';
import axios, { AxiosError } from 'axios';
import ModalMessage from '../profile/modalMessage';
import invalidFieldErr from '../../util/invalidField';
import ErrorConstant from '../../util/ErrorConstant';
import { toast, ToastContainer } from 'react-toastify';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../stores/loadingReducer';

const ContactData = ({
    id,
    profile_image,
    name,
    email,
    reason,
    message,
    state,
    tableRowTemplate,
    isOpen,
    onToggle,
    reply_id,
    replied,
    onReply = () => {},
}) => {
    replied = replied ? 1 : 0;
    const states = [
        <div className="w-fit px-4 py-1 bg-red-500 text-white text-sm tracking-wider rounded-md">
            <p>Not replied</p>
        </div>,
        <div className="w-fit px-4 py-1 text-black font-semibold bg-[#63ffa1] text-sm tracking-wider rounded-md">
            <p>Replied</p>
        </div>,
    ];

    const [contactStatus, setContactStatus] = useState(state);
    const [contactHistories, setContactHistories] = useState([]);
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [replyValue, setReplyValue] = useState('');
    const [currentHistory, setCurrentHistory] = useState(
        contactHistories[contactHistories.length - 1] || {
            reply_id: reply_id,
        },
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [err, setErr] = useState({
        message: '',
    });
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

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/admin/contact/${id}/reply`, {
                message: replyValue,
            });
            setErr({
                message: '',
            });
            setReplyValue('');
            closeReplyModal();
            onReply(id);
            toast.success('Reply sent successfully', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (e) {
            if (!(e instanceof AxiosError)) {
                return toast.error('Something went wrong', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }

            const response = e?.response?.data?.payload;
            if (response.errCode === ErrorConstant.ERR_INVALID_FIELD) {
                return invalidFieldErr(
                    response.fields,
                    { message: '' },
                    setErr,
                );
            }

            return toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    const loadContactHistory = async (id) => {
        try {
            const response = await axios.get(`/api/admin/contact/${id}`);
            setContactHistories((state) => [...state, response.data.data]);
            setCurrentHistory(response.data.data);
        } catch (e) {
            return toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };
    const loadReplyHistory = async (id) => {
        try {
            const response = await axios.get(`/api/admin/contact/${id}/reply`);
            setContactHistories((state) => [...state, response.data.data]);
            setCurrentHistory(response.data.data);
        } catch (e) {
            return toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    const loadHistory = async () => {
        setIsLoading(true);
        if (currentHistory.reply_id) {
            await loadReplyHistory(currentHistory.reply_id);
        }
        if (currentHistory.contact_id) {
            await loadContactHistory(currentHistory.contact_id);
        }

        setIsLoading(false);
    };

    const ContactRenderer = ({ name, email, message }) => {
        return (
            <div>
                <div className="flex flex-col gap-2 mt-3">
                    <label className="block text-white">Name</label>
                    <input
                        readOnly
                        type="text"
                        value={name}
                        className="w-full p-3 font-quicksand rounded text-white border bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]"
                    />
                </div>

                <div className="flex flex-col gap-2 mt-3">
                    <label className="block text-white">Email</label>
                    <input
                        readOnly
                        type="text"
                        value={email}
                        className="w-full p-3 font-quicksand rounded text-white border bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]"
                    />
                </div>

                <div className="flex flex-col gap-2 mt-3">
                    <label className="block text-white">Message</label>
                    <textarea
                        readOnly
                        value={message}
                        type="text"
                        className="w-full p-3 font-quicksand rounded text-white border bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]"
                    >
                        {' '}
                    </textarea>
                </div>
            </div>
        );
    };

    const ReplyRenderer = ({ message }) => {
        return (
            <div>
                <div className="flex flex-col gap-2 mt-3">
                    <label className="block text-white">Name</label>
                    <input
                        readOnly
                        type="text"
                        value={'admin'}
                        className="w-full p-3 font-quicksand rounded text-white border bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]"
                    />
                </div>

                <div className="flex flex-col gap-2 mt-3">
                    <label className="block text-white">Message</label>
                    <textarea
                        readOnly
                        value={message}
                        type="text"
                        className="w-full p-3 font-quicksand rounded text-white border bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]"
                    >
                        {' '}
                    </textarea>
                </div>
            </div>
        );
    };
    return (
        <div
            className="grid grid-cols-4 w-full items-center bg-[#1E1E20] p-5 text-white"
            style={tableRowTemplate}
        >
            <div className="flex items-center gap-3 truncate">
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
            <div>{states[replied]}</div>
            <div className="relative ">
                <button
                    className="font-bold tracking-wider cursor-pointer px-2 py-1 rounded hover:bg-[#333]"
                    onClick={onToggle}
                >
                    ...
                </button>

                {isOpen && (
                    <div className="absolute left-10 -top-7 mt-2 z-30 w-38 bg-[#1E1E20] text-gray-400 border border-[#444] rounded-md shadow-xl overflow-hidden">
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
                            <div className="px-4 pb-1">
                                <ContactRenderer
                                    name={name}
                                    email={email}
                                    message={message}
                                />
                                {contactHistories?.length > 0 &&
                                    contactHistories.map((v, index) => {
                                        return (
                                            <div className="mt-5">
                                                <h2 className="mb-3">
                                                    Replied From
                                                </h2>
                                                {v.hasOwnProperty(
                                                    'reply_id',
                                                ) ? (
                                                    <ContactRenderer
                                                        key={index}
                                                        name={v.name}
                                                        email={v.email}
                                                        message={v.message}
                                                    />
                                                ) : (
                                                    <ReplyRenderer
                                                        key={index}
                                                        message={v.message}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}

                                {(currentHistory.reply_id ||
                                    currentHistory.contact_id) &&
                                    !isLoading && (
                                        <div>
                                            <button
                                                onClick={loadHistory}
                                                className="bg-transparent border-none text-sm underline  font-semibold px-1 py-1 rounded-md"
                                            >
                                                Load History
                                            </button>
                                        </div>
                                    )}
                                {isLoading && (
                                    <div className="text-center mt-3">
                                        <span className="loading loading spinner"></span>
                                    </div>
                                )}
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
                    className="bg-[#1E1E20] border border-[#444] w-full p-3 rounded text-white resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
                    rows={4}
                    required
                    placeholder="Enter your reply here..."
                    value={replyValue}
                    onChange={(e) => setReplyValue(e.target.value)}
                />
                {err.message && (
                    <p className="text-red-500 text-sm">{err.message}</p>
                )}
            </ModalReply>
        </div>
    );
};

const ContactDataTable = () => {
    const tableRowTemplate = {
        gridTemplateColumns: '2fr 1.5fr 1fr 1.4fr',
    };
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState();
    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
    const [stateFilter, setStateFilter] = useState('');
    const [contacts, setContacts] = useState([]);
    const prevPage = useRef(0);

    const handleReply = (id) => {
        const tempContacts = [...contacts];
        const updatedContactsIndex = tempContacts.findIndex(
            (contact) => contact.id === id,
        );
        const updatedContacts = { ...tempContacts[updatedContactsIndex] };

        updatedContacts.replied = true;
        tempContacts[updatedContactsIndex] = updatedContacts;
        setContacts(tempContacts);
    };
    const searchContact = async (page = 0) => {
        try {
            const response = await axios.get('/api/admin/contacts', {
                params: {
                    status: stateFilter || undefined,
                    q: searchResult || undefined,
                },
            });
            setContacts(response.data.data);

            prevPage.current = page;
        } catch (e) {
            return toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    const handleSearch = () => {
        setSearchResult(searchTerm);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const keyLoading = nanoid();
            dispatch(showLoading(keyLoading));
            await searchContact();
            dispatch(hideLoading(keyLoading));
        })();
    }, [stateFilter, searchResult]);
    return (
        <div className="flex flex-col items-stretch justify-center p-6 pt-28 gap-8 font-quicksand">
            <ToastContainer />
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
                        <option value="replied">Replied</option>
                        <option value="unreplied">Not Replied</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="flex flex-col divide-white divide-y w-full">
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[800px]">
                        {/* Header */}
                        <div
                            className="grid w-full items-center bg-[#FFA666] py-3 px-5 rounded-tl-lg rounded-tr-lg text-black font-semibold tracking-wide"
                            style={tableRowTemplate}
                        >
                            <p>User Info</p>
                            <p>Reason</p>
                            <p>Status</p>
                            <p>Actions</p>
                        </div>

                        {/* Data Rows */}
                        <div className="overflow-y-auto max-h-[65vh]">
                            {contacts.length > 0 ? (
                                contacts.map((v, index) => (
                                    <ContactData
                                        key={index}
                                        id={v.id}
                                        profile_image={v.profile_image}
                                        name={v.name}
                                        email={v.email}
                                        reason={v.reason}
                                        replied={v.replied}
                                        message={v.message}
                                        state={v.state}
                                        tableRowTemplate={tableRowTemplate}
                                        index={index}
                                        reply_id={v.reply_id}
                                        isOpen={activeDropdownIndex === index}
                                        onToggle={() =>
                                            setActiveDropdownIndex((prev) =>
                                                prev === index ? null : index,
                                            )
                                        }
                                        onReply={handleReply}
                                    />
                                ))
                            ) : (
                                <div className="text-center text-white py-6 bg-[#1E1E20] rounded-b-lg">
                                    No contacts found.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactDataTable;
