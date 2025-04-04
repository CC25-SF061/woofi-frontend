import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/profile/sidebar';
import { HiX, HiDotsHorizontal } from 'react-icons/hi';
import { RiMenu2Line } from 'react-icons/ri';
import { IoIosNotifications } from 'react-icons/io';
import DestinationCard from '../../components/destination/destinationCard';
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { hideLoading, showLoading } from '../../stores/loadingReducer';
import { toast } from 'react-toastify';
import { FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DataDestination = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const [selectedItemToEdit, setSelectedItemToEdit] = useState(null);
    const [destinations, setDestinations] = useState([]);
    const navigate = useNavigate();
    const handleDelete = () => {
        console.log('Deleted item', selectedItemToDelete.id);
        setSelectedItemToDelete(null);
    };
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filteredProvinces, setFilteredProvinces] = useState([]);
    const [errors, setErrors] = useState({ province: false });
    const provinces = [
        { name: 'Jakarta' },
        { name: 'West Java' },
        { name: 'Central Java' },
        { name: 'East Java' },
        { name: 'Bali' },
    ];

    useEffect(() => {
        (async () => {
            const keyLoading = nanoid();
            try {
                dispatch(showLoading(keyLoading));
                const response = (
                    await axios.get('/api/user/profile/destinations')
                ).data;
                setDestinations(response.data);
            } catch (e) {
                toast.error('Something went wrong', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } finally {
                dispatch(hideLoading(keyLoading));
            }
        })();
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleProvinceChange = (e) => {
        const input = e.target.value;
        setSelectedItemToEdit({
            ...selectedItemToEdit,
            province: input,
        });

        const filtered = provinces.filter((p) =>
            p.name.toLowerCase().includes(input.toLowerCase()),
        );
        setFilteredProvinces(filtered);
        setDropdownOpen(true);
    };

    const handleSelectProvince = (selected) => {
        setSelectedItemToEdit({
            ...selectedItemToEdit,
            province: selected.name,
        });
        setDropdownOpen(false);
        setErrors((prev) => ({ ...prev, province: false }));
    };

    const onCardClick = async (id) => {
        await navigate(`/destination/${id}`);
    };
    return (
        <div className='min-h-screen bg-[#221122] flex flex-col items-center justify-center'>
            <div className="w-full lg:h-screen flex items-center justify-center p-5 lg:p-10 gap-5 text-white">
                <div className="lg:hidden p-5 fixed z-60 top-0 w-full bg-[#252527] flex justify-between items-center shadow-xl">
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

                <div
                    className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#252527] transform transition-transform duration-300 ease-in-out shadow-lg lg:hidden lg:translate-x-0 ${
                        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <Sidebar />
                </div>
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                <div className="hidden lg:flex h-full">
                    <Sidebar />
                </div>

                <div className="flex flex-col flex-1 rounded-lg overflow-hidden shadow-lg bg-[#252527] m-5 lg:m-0 lg:h-full h-svw lg:w-3/4 mt-20 overflow-y-auto">
                    <div className="w-full max-w-6xl flex flex-col items-center relative">
                        <div className="mb-5 sticky top-0 bg-[#252527] p-3 pb-0 w-full shadow-md z-10">
                            <h1 className="text-center font-quicksand text-2xl">
                                Data Destination
                            </h1>
                            <hr className="border-t-2 border-white my-3 rounded" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full px-5 pb-5">
                            {destinations.map((element, order) => (
                                <DestinationCard
                                    key={order}
                                    id={element.id}
                                    order={order}
                                    picture={
                                        new URL(
                                            element.image,
                                            import.meta.env.VITE_STATIC_ASSET_BASE_URL,
                                        ).href
                                    }
                                    name={element.name}
                                    detail={element.detail}
                                    rating={element.rating}
                                    onclick={onCardClick}
                                    onRequestDelete={(item) =>
                                        setSelectedItemToDelete(item)
                                    }
                                    setSelectedItemToEdit={(item) =>
                                        setSelectedItemToEdit(item)
                                    }
                                    isWishlisted={element.isWishlisted}
                                    optionsIcon={
                                        <HiDotsHorizontal
                                            size={24}
                                            className="cursor-pointer text-white"
                                        />
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {selectedItemToDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-80 backdrop-blur-md z-50 font-quicksand top-20 lg:top-0">
                    <div className="relative p-4 w-full max-w-lg rounded-lg shadow-lg bg-[#252527]">
                        <div className="flex items-center justify-between border-b p-4 rounded-t border-gray-600">
                            <h3 className="text-xl font-semibold text-white">
                                Confirm Delete
                            </h3>
                            <button
                                onClick={() => setSelectedItemToDelete(null)}
                                className="text-white bg-transparent hover:bg-white hover:text-[#FFA666] rounded-sm text-2xl cursor-pointer"
                            >
                                <IoClose />
                            </button>
                        </div>
                        <div className="p-4 space-y-4">
                            <p className="text-base leading-relaxed text-white">
                                Are you sure you want to delete{' '}
                                <span className="text-red-600 font-bold">
                                    {selectedItemToDelete.name}
                                </span>
                                ?
                            </p>
                        </div>
                        <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b border-gray-600 gap-3">
                            <button
                                onClick={() => setSelectedItemToDelete(null)}
                                className="py-2.5 px-5 text-sm font-semibold text-black rounded-lg hover:bg-gray-400 bg-white cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="text-white bg-red-600 hover:bg-red-800 font-semibold rounded-lg text-sm px-5 py-2.5 cursor-pointer"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {selectedItemToEdit && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-80 backdrop-blur-md z-50 font-quicksand top-20 lg:top-0">
                    <div className="relative p-4 py-0 w-full max-w-lg rounded-lg shadow-lg bg-[#252527] lg:max-h-[90vh] max-h-[70vh] overflow-y-auto">
                        <div className="sticky top-0 bg-[#252527] z-10 p-4 pt-8 border-b rounded-t border-gray-600">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-white">
                                    Edit Destination
                                </h3>
                                <button
                                    onClick={() => setSelectedItemToEdit(null)}
                                    className="text-white bg-transparent hover:bg-white hover:text-[#FFA666] rounded-sm text-2xl cursor-pointer"
                                >
                                    <IoClose />
                                </button>
                            </div>
                        </div>

                        <div className="p-4 space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="block text-white">
                                    Destination Name:
                                </label>
                                <input
                                    type="text"
                                    value={selectedItemToEdit.name}
                                    onChange={(e) =>
                                        setSelectedItemToEdit({
                                            ...selectedItemToEdit,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 font-quicksand rounded text-white border bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="block text-white">
                                    Location:
                                </label>
                                <input
                                    type="text"
                                    value={selectedItemToEdit.location}
                                    onChange={(e) =>
                                        setSelectedItemToEdit({
                                            ...selectedItemToEdit,
                                            location: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 font-quicksand rounded text-white border bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="block text-white">
                                    Province:
                                </label>
                                <div className="relative w-full">
                                    <div className="flex items-center">
                                        <input
                                            id="province"
                                            type="text"
                                            name="province"
                                            value={
                                                selectedItemToEdit?.province ||
                                                ''
                                            }
                                            onChange={handleProvinceChange}
                                            placeholder="Search Province"
                                            className={`flex-3 p-3 font-quicksand rounded text-white border ${
                                                errors.province
                                                    ? 'border-red-500'
                                                    : 'border-white'
                                            } bg-transparent w-full pr-10 focus:outline-none focus:ring focus:ring-[#FFA666]`}
                                        />
                                        <button
                                            type="button"
                                            onClick={toggleDropdown}
                                            className="absolute inset-y-0 right-0 flex items-center justify-center p-2 pl-4 rounded rounded-l-2xl bg-[#FFA666] cursor-pointer transition-all duration-200 hover:bg-white group"
                                        >
                                            <FaChevronDown
                                                className={`text-lg text-black group-hover:text-[#FFA666] transition-transform duration-300 ${
                                                    dropdownOpen
                                                        ? 'rotate-180'
                                                        : 'rotate-0'
                                                }`}
                                            />
                                        </button>
                                    </div>
                                    {dropdownOpen &&
                                        filteredProvinces.length > 0 && (
                                            <ul className="absolute z-10 w-full mt-1 bg-[#252527] text-white border border-[#FFA666] rounded shadow-md max-h-60 overflow-y-auto">
                                                {filteredProvinces.map((p) => (
                                                    <li
                                                        key={p.name}
                                                        className="px-4 py-2 cursor-pointer hover:bg-[#FFA666] hover:text-black transition-all duration-200"
                                                        onClick={() =>
                                                            handleSelectProvince(
                                                                p,
                                                            )
                                                        }
                                                    >
                                                        {p.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="block text-white">
                                    Description:
                                </label>
                                <textarea
                                    value={selectedItemToEdit.detail}
                                    onChange={(e) =>
                                        setSelectedItemToEdit({
                                            ...selectedItemToEdit,
                                            detail: e.target.value,
                                        })
                                    }
                                    className="w-full max-h-45 p-3 font-quicksand rounded text-white border bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]"
                                    rows="5"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="block text-white">
                                    Image:
                                </label>

                                <div className="flex flex-col items-center gap-3 w-full">
                                    {/* Preview image */}
                                    {selectedItemToEdit?.imageFile ? (
                                        <img
                                            src={URL.createObjectURL(
                                                selectedItemToEdit.imageFile,
                                            )}
                                            alt="Preview"
                                            className="w-full max-h-64 object-cover rounded-lg border border-gray-600"
                                        />
                                    ) : selectedItemToEdit?.image ? (
                                        <img
                                            src={
                                                new URL(
                                                    selectedItemToEdit.image,
                                                    import.meta.env.VITE_STATIC_ASSET_BASE_URL,
                                                ).href
                                            }
                                            alt="Current"
                                            className="w-full max-h-64 object-cover rounded-lg border border-gray-600"
                                        />
                                    ) : null}

                                    {/* Show dropzone input only if no imageFile is selected */}
                                    {!selectedItemToEdit?.imageFile && (
                                        <label
                                            htmlFor="dropzone-file"
                                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                                <svg
                                                    className="w-8 h-8 mb-4 text-gray-400"
                                                    aria-hidden="true"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 4v16m8-8H4"
                                                    />
                                                </svg>
                                                <p className="text-sm text-gray-400">
                                                    <span className="font-semibold">
                                                        Click to upload
                                                    </span>{' '}
                                                    or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    PNG, JPG, max 800x400px
                                                </p>
                                            </div>
                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files[0];
                                                    if (file) {
                                                        setSelectedItemToEdit({
                                                            ...selectedItemToEdit,
                                                            imageFile: file,
                                                        });
                                                        e.target.value = null; // Reset input
                                                    }
                                                }}
                                            />
                                        </label>
                                    )}

                                    {/* Show file name and remove option */}
                                    {selectedItemToEdit?.imageFile && (
                                        <div className="flex flex-col items-center gap-2">
                                            <p className="text-sm text-white text-center">
                                                Selected file:{' '}
                                                <span className="font-semibold">
                                                    {
                                                        selectedItemToEdit
                                                            .imageFile.name
                                                    }
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-[#252527] z-10 p-4 pb-8 border-t border-gray-200 rounded-b border-gray-600 flex items-center justify-end gap-3">
                            <button
                                onClick={() => setSelectedItemToEdit(null)}
                                className="py-2.5 px-5 text-sm font-semibold text-black rounded-lg hover:bg-gray-400 bg-white cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    console.log(
                                        'Updated item:',
                                        selectedItemToEdit,
                                    );
                                    setSelectedItemToEdit(null);
                                }}
                                className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataDestination;
