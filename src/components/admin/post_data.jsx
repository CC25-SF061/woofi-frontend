import React, { useEffect, useRef, useState } from 'react';
import LogoPosts from '../../assets/icons/admin/database.svg';
import { FaSearch } from 'react-icons/fa';
import ModalEdit from '../profile/modalEdit';
import ModalConfirm from '../dataDestination/deleteConfirm';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ErrorConstant from '../../util/errorConstant';
import { nanoid } from 'nanoid';
import EditConfirm from '../dataDestination/editConfirm';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../stores/loadingReducer';
import { getProvince } from '../../util/province';
import { getCategories } from '../../util/category';
const PostData = ({
    id,
    order,
    pic,
    destination_name,
    email,
    username,
    status,
    tableRowTemplate,
    isOpen,
    onToggle,
    editData,
    onEdit = () => {},
    onRestore = () => {},
    onDelete = () => {},
}) => {
    const navigate = useNavigate();
    const [err, setErr] = useState({
        reason: null,
    });

    const [selectedItemToEdit, setSelectedItemToEdit] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filteredProvinces, setFilteredProvinces] = useState(getProvince());
    const [isDragging, setIsDragging] = useState(false);
    const [filteredCategories, setFilteredCategories] =
        useState(getCategories());
    const [errorsEdit, setErrorsEdit] = useState({
        name: '',
        detail: '',
        image: '',
        location: '',
        province: '',
        category: '',
    });

    const states = {
        deleted: (
            <div className="w-fit px-4 py-1 bg-red-500 text-white text-sm tracking-wider rounded-md">
                <p>Deleted</p>
            </div>
        ),
        posted: (
            <div className="w-fit px-4 py-1 text-black font-semibold bg-[#63ffa1] text-sm tracking-wider rounded-md">
                <p>Posted</p>
            </div>
        ),
    };
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const invalidFieldErr = (arr, newObjErr, setErrState) => {
        arr.forEach((element) => {
            if (
                Object.prototype.hasOwnProperty.call(newObjErr, element.path[0])
            ) {
                newObjErr[element.path[0]] = element.message;
            }
        });
        setErrState(newObjErr);
    };
    useEffect(() => {
        setErr((state) => ({
            ...state,
            reason: null,
        }));
    }, [isDeleteModalOpen]);

    const closeEditModal = () => {
        setDeleteModalOpen(false);
    };

    const handleChangeStatusClick = () => {
        setShowConfirmModal(true);
    };

    const handleCancelChangeStatus = () => {
        setShowConfirmModal(false);
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `api/admin/destination/${id}/notification-delete`,
                Object.fromEntries(new FormData(e.target)),
            );
            await axios.delete(`/api/destination/${id}`);
            onDelete(id);
            closeEditModal();
            toast.success('Destination deleted', {
                position: 'top-right',
                autoClose: 3000,
            });
            onToggle();
        } catch (e) {
            if (!(e instanceof AxiosError)) {
                return toast.error('Something went wrong', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
            const response = e?.response?.data?.payload;
            if (response.errCode === ErrorConstant.ERR_INVALID_FIELD) {
                invalidFieldErr(response.fields, { reason: null }, setErr);
            }
            return toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };
    const handleDeleteConfirm = () => {
        setShowConfirmModal(false);
        setDeleteModalOpen(true);
    };

    const handleRestore = async () => {
        try {
            await axios.patch(`/api/admin/destination/${id}/restore`);
            toast.success('Destination restored', {
                position: 'top-right',
                autoClose: 3000,
            });
            onRestore(id);
            setShowConfirmModal(false);
            onToggle();
        } catch (e) {
            return toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };
    const seeDetail = async () => {
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
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedItemToEdit((prev) => ({
                ...prev,
                imageFile: file,
            }));
        }
        setIsDragging(false);
    };

    const handleEdit = async (closeModal) => {
        const formData = new FormData();

        formData.append('name', selectedItemToEdit.name || '');
        formData.append('location', selectedItemToEdit.location || '');
        formData.append('detail', selectedItemToEdit.detail || '');
        formData.append('province', selectedItemToEdit.province || '');
        formData.append('category', selectedItemToEdit.category || '');
        if (selectedItemToEdit.imageFile) {
            formData.append('image', selectedItemToEdit.imageFile || '');
        }
        try {
            const response = await axios.put(
                `/api/destination/${selectedItemToEdit.id}`,
                formData,
            );

            toast.success('Success editing destination.', {
                autoClose: 3000,
                position: 'top-right',
            });
            onEdit({
                ...response.data.data,
                imageFile: selectedItemToEdit.imageFile,
            });
            closeModal();

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
                return invalidFieldErr(
                    response.fields,
                    {
                        name: '',
                        detail: '',
                        image: '',
                        location: '',
                        province: '',
                        category: '',
                    },
                    setErrorsEdit,
                );
            }
            toast.error('something went wrong when updating data', {
                autoClose: 3000,
                position: 'top-right',
            });
        }
    };

    const openEditModal = () => {
        setSelectedItemToEdit(editData);
        setDropdownOpen(false);
    };

    return (
        <div
            className="grid grid-cols-3 w-full items-center py-8 px-5 text-white relative"
            style={{
                ...tableRowTemplate,
                backgroundColor: order % 2 === 0 ? '#252527' : '#1E1E1F',
            }}
        >
            <div className="flex items-center gap-3 truncate">
                <img
                    className="h-9 aspect-square rounded-md object-cover"
                    src={pic}
                    alt="Content"
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

            <div>{states[status]}</div>

            <div className="relative ">
                <button
                    onClick={onToggle}
                    className="font-bold tracking-wider cursor-pointer px-2 py-1 rounded hover:bg-[#333]"
                >
                    ...
                </button>

                {isOpen && (
                    <div className="absolute left-10 -top-12 mt-2 z-30 w-38 bg-[#1E1E20] text-gray-400 border border-[#444] rounded-md shadow-xl overflow-hidden">
                        {status === 'posted' ? (
                            <>
                                <button
                                    onClick={handleChangeStatusClick}
                                    className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left text-gray-400"
                                >
                                    Delete
                                </button>
                                <ModalConfirm
                                    isOpen={showConfirmModal}
                                    item={{
                                        name: 'Deleted',
                                    }}
                                    title="Change Status Confirmation"
                                    message={`Are you sure you want to delete this destination ?`}
                                    onCancel={handleCancelChangeStatus}
                                    onConfirm={() => handleDeleteConfirm()}
                                    confirmText="Yes, Change"
                                    confirmBg="bg-blue-600"
                                    confirmHover="hover:bg-blue-800"
                                />

                                <button
                                    onClick={openEditModal}
                                    className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left text-gray-400"
                                >
                                    Edit Destination
                                </button>

                                <button
                                    onClick={seeDetail}
                                    className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left text-gray-400"
                                >
                                    See Detail
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleChangeStatusClick}
                                    className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left text-gray-400"
                                >
                                    Restore
                                </button>
                                <ModalConfirm
                                    isOpen={showConfirmModal}
                                    item={{
                                        name: 'Restore',
                                    }}
                                    title="Restore destination"
                                    message={`Are you sure you want to restore this destination ?`}
                                    onCancel={handleCancelChangeStatus}
                                    onConfirm={handleRestore}
                                    confirmText="Yes, Restore"
                                    confirmBg="bg-blue-600"
                                    confirmHover="hover:bg-blue-800"
                                />
                            </>
                        )}
                    </div>
                )}
            </div>
            {/* Modal Edit Destination */}
            <EditConfirm
                selectedItemToEdit={selectedItemToEdit}
                setSelectedItemToEdit={setSelectedItemToEdit}
                filteredProvinces={filteredProvinces}
                filteredCategories={filteredCategories}
                isDragging={isDragging}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleDrop={handleDrop}
                errors={errorsEdit}
                handleEdit={handleEdit}
            />
            {/* Modal Ban */}
            <ModalEdit
                isOpen={isDeleteModalOpen}
                onClose={closeEditModal}
                onSubmit={handleDeleteSubmit}
                title="Delete Destination"
            >
                <p className="text-sm text-gray-300 mb-2">
                    Please provide a reason why{' '}
                    <span className="font-semibold text-white">
                        {destination_name}
                    </span>{' '}
                    should be deleted.
                </p>

                <textarea
                    name="reason"
                    className="bg-[#1E1E20] border border-[#444] w-full p-3 rounded text-white resize-none focus:outline-none focus:ring-2 focus:ring-white-400"
                    rows={4}
                    placeholder="Enter reason here..."
                />

                <div className="error text-sm text-error">{err.reason}</div>
            </ModalEdit>
        </div>
    );
};

const PostDataTable = () => {
    const tableRowTemplate = { gridTemplateColumns: '2fr 1fr 1fr' };
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState();
    const [stateFilter, setStateFilter] = useState();
    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
    const [posts, setPosts] = useState([]);
    const listInnerRef = useRef();
    const hasMore = useRef(true);
    const prevPage = useRef(0);

    const dispatch = useDispatch();

    const searchDestination = async (page = 0) => {
        try {
            const response = await axios.get('/api/admin/destinations', {
                params: {
                    page: page,
                    status: stateFilter || undefined,
                    name: searchResult || undefined,
                },
            });
            if (response.data.data.length === 0) {
                hasMore.current = false;
            }

            prevPage.current = page;

            // if (page > 0) {
            //     setPosts([...posts, ...response.data.data]);
            //     return;
            // }
            setPosts([...response.data.data]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleEdit = (element) => {
        const id = element.id;

        const tempPosts = [...posts];
        const updatedPostsIndex = tempPosts.findIndex((post) => post.id === id);
        const updatedPosts = { ...tempPosts[updatedPostsIndex], ...element };
        if (element.imageFile) {
            updatedPosts.image = URL.createObjectURL(element.imageFile);
        }
        tempPosts[updatedPostsIndex] = updatedPosts;
        setPosts(tempPosts);
    };
    // useEffect(() => {
    //     searchDestination();
    // }, []);

    useEffect(() => {
        (async () => {
            const keyLoading = nanoid();

            dispatch(showLoading(keyLoading));

            await searchDestination();
            dispatch(hideLoading(keyLoading));
        })();
    }, [stateFilter, searchResult]);
    const handleDelete = (id) => {
        const tempPosts = [...posts];
        const updatedPostsIndex = tempPosts.findIndex((post) => post.id === id);
        const updatedPosts = { ...tempPosts[updatedPostsIndex] };

        updatedPosts.status = 'deleted';
        tempPosts[updatedPostsIndex] = updatedPosts;
        setPosts(tempPosts);
    };

    const handleRestore = (id) => {
        const tempPosts = [...posts];
        const updatedPostsIndex = tempPosts.findIndex((post) => post.id === id);
        const updatedPosts = { ...tempPosts[updatedPostsIndex] };
        updatedPosts.status = 'posted';
        tempPosts[updatedPostsIndex] = updatedPosts;
        setPosts(tempPosts);
    };

    const handleSearch = () => {
        setSearchResult(searchTerm);
    };
    const renderDestination = (index) => {
        const v = posts[index];
        return (
            <PostData
                key={v.id}
                order={index}
                id={v.id}
                pic={
                    new URL(v.image, import.meta.env.VITE_STATIC_ASSET_BASE_URL)
                        .href
                }
                destination_name={v.name}
                email={v.email}
                username={v.username}
                status={v.status}
                tableRowTemplate={tableRowTemplate}
                index={index}
                isOpen={activeDropdownIndex === index}
                onToggle={() =>
                    setActiveDropdownIndex((prev) =>
                        prev === index ? null : index,
                    )
                }
                onEdit={handleEdit}
                editData={v}
                onRestore={handleRestore}
                onDelete={handleDelete}
            />
        );
    };
    return (
        <div className="flex flex-col items-stretch justify-center p-6 pt-28 h-fit gap-8 font-quicksand ">
            <div className="py-6 flex flex-col items-center bg-[#252527] rounded-md shadow-lg shadow-[#00000055]">
                <img src={LogoPosts} alt="Users Icon" className="w-8 mb-1" />
                <h2 className="text-[#aaa] tracking-wide text-xl">
                    See all Destination Data
                </h2>
            </div>
            <div className="flex gap-4 mb-2 w-full items-center">
                <div className="relative w-full md:w-1/2">
                    <input
                        type="text"
                        className="w-full p-2 pr-10 rounded-md bg-[#1E1E20] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#FFA666]"
                        placeholder="Search by destination name..."
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
                        <option>All Status</option>
                        <option value="posted">Posted</option>
                        <option value="deleted">Deleted</option>
                    </select>
                </div>
            </div>

            <div
                className="flex flex-col divide-white divide-y w-full"
                ref={listInnerRef}
            >
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[800px]">
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
                        <ToastContainer />
                        <div className="overflow-y-auto">
                            {posts.length > 0 ? (
                                posts.map((_, index) =>
                                    renderDestination(index),
                                )
                            ) : (
                                <div className="text-center text-white py-6 bg-[#1E1E20]">
                                    No destinations found.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDataTable;
