import React, { useState } from 'react';
import LogoPosts from '../../assets/icons/admin/database.svg';
import TempUserProfile from '../../assets/logIn/image2.webp';
import { FaSearch } from 'react-icons/fa';

const PostData = ({
    pic,
    destination_name,
    email,
    username,
    state,
    tableRowTemplate,
    isOpen,
    onToggle,
}) => {
    const states = [
        <div className="w-fit px-4 py-1 text-black font-semibold bg-[#63ffa1] text-sm tracking-wider rounded-md">
            <p>Posted</p>
        </div>,
        <div className="w-fit px-4 py-1 bg-red-500 text-white text-sm tracking-wider rounded-md">
            <p>Deleted</p>
        </div>,
    ];

    const [postStatus, setPostStatus] = useState(state);

    const changeStatus = () => {
        setPostStatus((prev) => (prev === 0 ? 1 : 0));
        onToggle(); // fix typo from ontoggle
    };

    return (
        <div
            className="relative grid w-full items-center bg-[#252527] py-3 px-5 text-white"
            style={tableRowTemplate}
        >
            <div className="flex items-center gap-3">
                <img className="h-9 aspect-square rounded-md object-cover" src={pic} alt="Profile" />
                <div className="flex flex-col">
                    <p className="tracking-wide font-semibold">{destination_name}</p>
                    <p className="tracking-tight text-gray-400 text-sm">{username}</p>
                    <p className="tracking-tight text-gray-500 text-xs">{email}</p>
                </div>
            </div>
            <div>{states[postStatus]}</div>
            <div className="relative">
                <button
                    onClick={onToggle}
                    className="font-bold text-xl px-3 py-1 hover:text-[#FFA666]"
                >
                    ...
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 z-20 w-44 bg-[#1E1E20] text-white border border-[#444] rounded-md shadow-xl overflow-hidden">
                        <button
                            onClick={changeStatus}
                            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left"
                        >
                            🔁 Change to {postStatus === 0 ? 'Deleted' : 'Posted'}
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left text-gray-400">
                            👁️ See Detail
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const PostDataTable = () => {
    const tableRowTemplate = { gridTemplateColumns: '2fr 1fr 1fr' };
    const [searchTerm, setSearchTerm] = useState('');
    const [stateFilter, setStateFilter] = useState('all');
    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);

    const [post] = useState([
        {
            pic: TempUserProfile,
            destination_name: 'Bali Island',
            username: 'Agung Mantra',
            email: 'agung@example.com',
            state: 0,
        },
        {
            pic: TempUserProfile,
            destination_name: 'Mount Bromo',
            username: 'Sinta Dewi',
            email: 'sinta@example.com',
            state: 1,
        },
        {
            pic: TempUserProfile,
            destination_name: 'Raja Ampat',
            username: 'Rama Pratama',
            email: 'rama@example.com',
            state: 0,
        },
    ]);

    const filteredPost = post.filter((user) => {
        const matchesSearch =
            user.destination_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesPost =
            stateFilter === 'all' ||
            (stateFilter === 'Posted' && user.state === 1) ||
            (stateFilter === 'Deleted' && user.state === 0);

        return matchesSearch && matchesPost;
    });

    return (
        <div className="flex flex-col items-stretch justify-center p-6 pt-28 h-fit gap-8 font-quicksand ">
            <div className="py-6 flex flex-col items-center bg-[#252527] rounded-md shadow-lg shadow-[#00000055] mb-5">
                <img src={LogoPosts} alt="Database Icon" className="w-7 mb-1" />
                <h2 className="text-[#aaa] tracking-wide text-xl">
                    See all Destination Data
                </h2>
            </div>

            <div className="flex gap-4 mb-2 w-full items-center">
                <div className="relative w-full md:w-1/2">
                    <input
                        type="text"
                        className="w-full p-2 rounded-md bg-[#1E1E20] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#FFA666]"
                        placeholder="Search by destination name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center p-2 pr-3">
                        <FaSearch className="text-xl text-[#FFA666aa]" />
                    </div>
                </div>

                <div className="w-40">
                    <select
                        value={stateFilter}
                        onChange={(e) => setStateFilter(e.target.value)}
                        className="w-full p-2 rounded-md bg-[#1E1E20] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#FFA666]"
                    >
                        <option value="all">All Status</option>
                        <option value="Posted">Posted</option>
                        <option value="Deleted">Deleted</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col divide-y divide-[#333]">
                <div
                    className="grid w-full items-center bg-[#FFA666] py-3 px-5 rounded-tl-lg rounded-tr-lg text-black font-semibold tracking-wide"
                    style={tableRowTemplate}
                >
                    <div>Destination Information</div>
                    <div>Status</div>
                    <div>Actions</div>
                </div>

                {filteredPost.length > 0 ? (
                    filteredPost.map((v, index) => (
                        <PostData
                            key={index}
                            pic={v.pic}
                            destination_name={v.destination_name}
                            email={v.email}
                            username={v.username}
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
                        No destinations found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostDataTable;
