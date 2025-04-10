import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/profile/sidebar';
import { HiX, HiDotsHorizontal } from 'react-icons/hi';
import { RiMenu2Line } from 'react-icons/ri';
import { IoIosNotifications } from 'react-icons/io';
import DestinationCard from '../../components/destination/destinationCard';
import { useDispatch } from 'react-redux';
import axios, { AxiosError } from 'axios';
import { nanoid } from 'nanoid';
import { hideLoading, showLoading } from '../../stores/loadingReducer';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ErrorConstant from '../../util/ErrorConstant';
import DeleteConfirmationModal from '../../components/dataDestination/deleteConfirm';
import EditConfirm from '../../components/dataDestination/editConfirm';

const DataDestination = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const [selectedItemToEdit, setSelectedItemToEdit] = useState(null);
    const [destinations, setDestinations] = useState([]);
    const navigate = useNavigate();
    const [isDragging, setIsDragging] = useState(false);
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filteredProvinces, setFilteredProvinces] = useState([]);
    const [deleteType, setDeleteType] = useState(null);
    const [errors, setErrors] = useState({
        name: '',
        detail: '',
        image: '',
        location: '',
        province: '',
    });
    const [provinces, setProvinces] = useState([]);
    const invalidFieldErr = (arr) => {
        const newObjErr = {
            name: '',
            detail: '',
            image: '',
            location: '',
            province: '',
        };
        for (const element of arr) {
            if (
                Object.prototype.hasOwnProperty.call(newObjErr, element.path[0])
            ) {
                newObjErr[element.path[0]] = element.message;
            }
        }
        setErrors((state) => ({ ...state, ...newObjErr }));
    };
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/destination/${selectedItemToDelete.id}`);
            toast.success('Destination deleted', {
                autoClose: 3000,
                position: 'top-right',
            });

            setDestinations((prev) =>
                prev.filter((d) => d.id !== selectedItemToDelete.id),
            );

            setSelectedItemToDelete(null);
            setDeleteType(null);
        } catch (e) {
            console.log(e);
            toast.error('Failed to delete', {
                autoClose: 3000,
                position: 'top-right',
            });
        }
    };

    const handleEdit = async () => {
        const formData = new FormData();

        formData.append('name', selectedItemToEdit.name || '');
        formData.append('location', selectedItemToEdit.location || '');
        formData.append('detail', selectedItemToEdit.detail || '');
        formData.append('province', selectedItemToEdit.province || '');
        if (selectedItemToEdit.imageFile) {
            formData.append('image', selectedItemToEdit.imageFile);
        }
        try {
            const response = await axios.put(
                `/api/destination/${selectedItemToEdit.id}`,
                formData,
            );

            // Dapatkan URL gambar baru dari respons
            const newImageUrl = response.data.image;

            // Perbarui state destinations hanya jika ada URL gambar baru
            setDestinations((prevDestinations) =>
                prevDestinations.map((destination) => {
                    if (destination.id === selectedItemToEdit.id) {
                        return {
                            ...destination,
                            ...selectedItemToEdit,
                            image: newImageUrl
                                ? newImageUrl
                                : destination.image, // Gunakan URL gambar baru jika ada, jika tidak, gunakan yang lama
                        };
                    }
                    return destination;
                }),
            );

            toast.success('Success editing destination', {
                autoClose: 3000,
                position: 'top-right',
            });

            setSelectedItemToEdit(null);
        } catch (e) {
            if (!(e instanceof AxiosError)) {
                return toast.error('something went wrong when updating data', {
                    autoClose: 3000,
                    position: 'top-right',
                });
            }

            const response = e.response.data.payload;

            if (response?.errCode === ErrorConstant.ERR_INVALID_FIELD) {
                return invalidFieldErr(response.fields);
            }

            toast.error('something went wrong when updating data', {
                autoClose: 3000,
                position: 'top-right',
            });
        }
    };

    useEffect(() => {
        (async () => {
            const keyLoading = nanoid();
            try {
                dispatch(showLoading(keyLoading));
                const response = (
                    await axios.get('/api/user/profile/destinations')
                ).data;
                setDestinations(
                    Array.isArray(response.data) ? response.data : [],
                );
            } catch {
                toast.error('Something went wrong', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } finally {
                dispatch(hideLoading(keyLoading));
            }
        })();
    }, [dispatch]);

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const res = await axios.get('/api/geolocation/provinces');
                setProvinces(res.data.data);
                setFilteredProvinces(res.data.data);
            } catch {
                toast.error('Failed to fetch provinces!');
            }
        };

        fetchProvinces();
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

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedItemToEdit({
                ...selectedItemToEdit,
                imageFile: file,
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#221122] flex flex-col items-center lg:justify-center">
            <ToastContainer />
            <div className="w-full lg:h-screen flex  justify-center p-5 lg:p-10 gap-5 text-white">
                <div className="lg:hidden p-5 fixed  z-60 top-0 w-full bg-[#252527] flex justify-between items-center shadow-xl">
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

                <div className="flex flex-col flex-1 rounded-lg overflow-hidden shadow-lg bg-[#252527]  lg:m-0 lg:h-full  lg:w-3/4 mt-20 overflow-y-auto">
                    <div className="w-full max-w-6xl flex flex-col lg:items-center mx-auto relative">
                        <div className="mb-5 sticky top-0 bg-[#252527] p-3 pb-0 w-full shadow-md z-10">
                            <h1 className="text-center font-quicksand text-2xl">
                                Data Destination
                            </h1>
                            <hr className="border-t-2 border-white my-3 rounded" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-5 w-full px-3 pb-5">
                            {destinations.map((element, order) => (
                                <DestinationCard
                                    key={element.id}
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
                                    onClick={() => onCardClick(element.id)}
                                    onRequestDelete={() => {
                                        setSelectedItemToDelete(element);
                                        setDeleteType('destination');
                                    }}
                                    onRequestWishlistDelete={() => {
                                        setSelectedItemToDelete({
                                            id: element.id,
                                            name: element.name,
                                        });
                                        setDeleteType('wishlist');
                                    }}
                                    setSelectedItemToEdit={() =>
                                        setSelectedItemToEdit({
                                            ...element,
                                            image: null,
                                        })
                                    }
                                    isWishlisted={element.isWishlisted}
                                    optionsIcon={
                                        <HiDotsHorizontal
                                            size={24}
                                            className="cursor-pointer text-white"
                                        />
                                    }
                                    onEdit={() =>
                                        setSelectedItemToEdit({
                                            ...element,
                                            image: null,
                                        })
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <DeleteConfirmationModal
                isOpen={!!selectedItemToDelete}
                item={selectedItemToDelete}
                title={
                    deleteType === 'wishlist'
                        ? 'Remove from Wishlist'
                        : 'Remove Destination'
                }
                message={
                    <>
                        Do you really want to remove{' '}
                        <span className="text-red-600 font-bold">
                            {selectedItemToDelete?.name}
                        </span>{' '}
                        from your{' '}
                        <span className="underline">
                            {deleteType === 'wishlist'
                                ? 'wishlist'
                                : 'destinations'}
                        </span>
                        ? This action cannot be undone.
                    </>
                }
                onCancel={() => {
                    setSelectedItemToDelete(null);
                    setDeleteType(null);
                }}
                onConfirm={handleDelete}
                cancelText="Cancel"
                confirmText="Yes, Remove"
                confirmBg="bg-red-600"
                confirmHover="hover:bg-red-800"
                cancelBg="bg-gray-200"
                cancelHover="hover:bg-gray-400"
            />

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

export default DataDestination;
