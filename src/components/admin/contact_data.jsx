import React, { useState } from 'react';
import TempUserProfile from '../../assets/logIn/image2.webp';
import TempUserProfile2 from '../../assets/logIn/image4.webp';
import { FaSearch } from 'react-icons/fa';
import LogoUsers from '../../assets/icons/admin/users.svg';

const ContactData = ({
    pfp,
    name,
    email,
    reason,
    message,
    tableRowTemplate,
    isOpen,
    onToggle,
}) => {
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
            <p className="text-sm text-gray-300 truncate">{message}</p>
            <div className="relative">
                <button
                    className="font-bold tracking-wider cursor-pointer px-2 py-1 rounded hover:bg-[#333]"
                    onClick={onToggle}
                >
                    ...
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 z-20 w-44 bg-[#1E1E20] text-white border border-[#444] rounded-md shadow-xl overflow-hidden">
                        <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left">
                            Reply Messsage
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left">
                            See Detail
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const ContactDataTable = () => {
    const tableRowTemplate = { gridTemplateColumns: ' 4fr 3fr 4fr 1fr' };
    const [searchTerm, setSearchTerm] = useState('');
    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);

    const [contacts, setContacts] = useState([
        {
            pic: TempUserProfile,
            name: 'John Doe',
            email: 'john@example.com',
            reason: 'Interested in support',
            message: 'Can I get help with my account?',
        },
        {
            pic: TempUserProfile2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            reason: 'Feedback',
            message: 'Great site! Just wanted to say thanks!',
        },
        {
            pic: TempUserProfile,
            name: 'Michael Johnson',
            email: 'michael@example.com',
            reason: 'Bug Report',
            message: 'There’s a bug when submitting the form.',
        },
        {
            pic: TempUserProfile,
            name: 'Emily Davis',
            email: 'emily@example.com',
            reason: 'Help needed',
            message: 'I can’t reset my password.',
        },
        {
            pic: TempUserProfile2,
            name: 'Robert Brown',
            email: 'robert@example.com',
            reason: 'Business Inquiry',
            message: 'I’d like to collaborate with you.',
        },
        {
            pic: TempUserProfile2,
            name: 'Lisa White',
            email: 'lisa@example.com',
            reason: 'Other',
            message: 'Just reaching out to say hi!',
        },
        {
            pic: TempUserProfile,
            name: 'Kevin Lee',
            email: 'kevin@example.com',
            reason: 'Technical Issue',
            message: 'Error when uploading images.',
        },
    ]);

    const filteredContacts = contacts.filter((user) =>
        `${user.name} ${user.email}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
    );

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
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <FaSearch className="text-xl text-[#FFA666aa]" />
                    </div>
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
                    <p>Message</p>
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
                            message={v.message}
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
