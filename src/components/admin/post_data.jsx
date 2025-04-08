import React, { useState } from 'react';
import LogoPosts from '../../assets/icons/admin/database.svg';
import TempUserProfile from '../../assets/logIn/image2.webp';
import { FaSearch } from 'react-icons/fa';
import EditConfirm from '../dataDestination/editConfirm';
import ModalConfirm from '../dataDestination/deleteConfirm';

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
        <div className="w-fit px-4 py-1 bg-red-500 text-white text-sm tracking-wider rounded-md">
            <p>Deleted</p>
        </div>,
        <div className="w-fit px-4 py-1 text-black font-semibold bg-[#63ffa1] text-sm tracking-wider rounded-md">
            <p>Posted</p>
        </div>,
    ];
    console.log(state);

    const [postStatus, setPostStatus] = useState(state);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedItemToEdit, setSelectedItemToEdit] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filteredProvinces, setFilteredProvinces] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [errors, setErrors] = useState({});

    const changeStatus = () => {
        setPostStatus((prev) => (prev === 0 ? 1 : 0));
        onToggle();
    };

    const handleChangeStatusClick = () => {
        setShowConfirmModal(true);
    };

    const handleCancelChangeStatus = () => {
        setShowConfirmModal(false);
    };

    const seeDetail = () => {
        // To do see detail
    };

    const handleProvinceChange = (e) => {
        const input = e.target.value;
        const filtered = allProvinces.filter((province) =>
            province.name.toLowerCase().includes(input.toLowerCase())
        );
    
        setSelectedItemToEdit((prev) => ({
            ...prev,
            province: input,
        }));
    
        setFilteredProvinces(filtered);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSelectProvince = (province) => {
        setSelectedItemToEdit((prev) => ({
            ...prev,
            province: province.name,
        }));
        setDropdownOpen(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedItemToEdit((prev) => ({
                ...prev,
                imageFile: file,
            }));
        }
        setIsDragging(false);
    };

    const allProvinces = [
        { name: 'Jakarta' },
        { name: 'Bali' },
        { name: 'Yogyakarta' },
        { name: 'Bandung' },
        { name: 'Surabaya' },
    ];

    const handleEdit = (closeModal) => {
        const newErrors = {};
        if (!selectedItemToEdit.name) newErrors.name = 'Name is required';
        if (!selectedItemToEdit.location) newErrors.location = 'Location is required';
        if (!selectedItemToEdit.province) newErrors.province = 'Province is required';
        if (!selectedItemToEdit.detail) newErrors.detail = 'Description is required';
        if (!selectedItemToEdit.imageFile) newErrors.image = 'Image is required';
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
            console.log('Updated Data:', selectedItemToEdit);
            closeModal(null); // close the modal
        }
    };

    const openEditModal = () => {
        setSelectedItemToEdit({
            name: destination_name,
            location: 'Some Location', // Ganti dengan data asli jika tersedia
            province: 'Jakarta',       // Ganti dengan data asli
            detail: 'Some details here...', // Ganti dengan detail asli
            imageFile: null,
        });
        setDropdownOpen(false);
    };    

    return (
        <div
            className="grid w-full items-center bg-[#252527] py-3 px-5 text-white relative"
            style={tableRowTemplate}
        >
            <div className="flex items-center gap-3">
                <img
                    className="h-9 aspect-square rounded-md object-cover"
                    src={pic}
                    alt="Profile"
                />
                <div className="flex flex-col">
                    <p className="tracking-wide font-semibold">
                        {destination_name}
                    </p>
                    <p className="tracking-tight text-gray-400 text-sm">
                        {username}
                    </p>
                    <p className="tracking-tight text-gray-500 text-xs">
                        {email}
                    </p>
                </div>
            </div>

            <div>{states[postStatus]}</div>

            <div className="relative">
                <button
                    onClick={onToggle}
                    className="font-bold tracking-wider cursor-pointer px-2 py-1 rounded hover:bg-[#333]"
                >
                    ...
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 z-20 w-44 bg-[#1E1E20] text-white border border-[#444] rounded-md shadow-xl overflow-hidden">
                        <button
                            onClick={handleChangeStatusClick}
                            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left text-gray-400 cursor-pointer"
                        >
                            Change to {postStatus === 0 ? 'Deleted' : 'Posted'}
                        </button>
                        <ModalConfirm
                            isOpen={showConfirmModal}
                            item={{
                                name: postStatus === 0 ? 'Deleted' : 'Posted',
                            }}
                            title="Change Status Confirmation"
                            message={`Are you sure you want to change this destination's status to ${postStatus === 0 ? 'Deleted' : 'Posted'}?`}
                            onCancel={handleCancelChangeStatus}
                            onConfirm={changeStatus}
                            confirmText="Yes, Change"
                            confirmBg="bg-blue-600"
                            confirmHover="hover:bg-blue-800"
                        />
                        <button
                            onClick={openEditModal}
                            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left text-gray-400 cursor-pointer"
                        >
                            Edit Destination
                        </button>
                        <button
                            onClick={seeDetail}
                            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left text-gray-400 cursor-pointer"
                        >
                            See Detail
                        </button>
                    </div>
                )}
            </div>

            {/* Modal Edit Destination */}
            <EditConfirm
                selectedItemToEdit={selectedItemToEdit}
                setSelectedItemToEdit={setSelectedItemToEdit}
                handleProvinceChange={handleProvinceChange}
                toggleDropdown={toggleDropdown}
                handleSelectProvince={handleSelectProvince}
                dropdownOpen={dropdownOpen}
                filteredProvinces={filteredProvinces}
                isDragging={isDragging}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleDrop={handleDrop}
                errors={errors}
                handleEdit={handleEdit}
            />
        </div>
    );
};

const PostDataTable = () => {
    const tableRowTemplate = { gridTemplateColumns: '20fr 15fr 1fr' };
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

    const filteredPost = post.filter((post) => {
        const matchesSearch =
            post.destination_name
                .toLowerCase()
                .trim()
                .includes(searchTerm.toLowerCase().trim()) ||
            post.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesPost =
            stateFilter === 'all' ||
            (stateFilter === 'Posted' && post.state === 1) ||
            (stateFilter === 'Deleted' && post.state === 0);

        return matchesSearch && matchesPost;
    });
    console.log(filteredPost);

    return (
        <div className="flex flex-col items-stretch justify-center p-6 pt-28 h-fit gap-8 font-quicksand ">
            <div className="py-6 flex flex-col items-center bg-[#252527] rounded-md shadow-lg shadow-[#00000055]">
                <img src={LogoPosts} alt="Users Icon" className="w-8 mb-1" />
                <h2 className="text-[#aaa] tracking-wide text-xl">
                    See all Destination Data
                </h2>
            </div>

            <div className="flex gap-4 mb-2 w-full items-center">
                <div className="relative w-1/2">
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

            <div className="flex flex-col divide-white divide-y">
                <div
                    className="grid w-full items-center bg-[#FFA666] py-3 px-5 rounded-tl-lg rounded-tr-lg text-black font-semibold tracking-wide"
                    style={tableRowTemplate}
                >
                    <div>
                        <p>Destination Information</p>
                    </div>
                    <div>
                        <p>Status</p>
                    </div>
                    <div>
                        <p>Actions</p>
                    </div>
                </div>

                {filteredPost.length > 0 ? (
                    filteredPost.map((v, index) => (
                        <PostData
                            key={v.destination_name}
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
                    <div className="text-center text-white py-6 bg-[#1E1E20]">
                        No destinations found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostDataTable;
