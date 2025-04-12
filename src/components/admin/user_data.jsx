import { useEffect, useRef, useState } from 'react';
import LogoUsers from '../../assets/icons/admin/users.svg';
import defaultProfile from '../../assets/icons/profile_outline.svg';
import { FaSearch } from 'react-icons/fa';
import ModalEdit from '../profile/modalEdit';
import DeleteConfirm from '../dataDestination/deleteConfirm';
import axios, { AxiosError } from 'axios';
import invalidFieldErr from '../../util/invalidField';
import ErrorConstant from '../../util/ErrorConstant';
import { toast, ToastContainer } from 'react-toastify';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../stores/loadingReducer';
const UserData = ({
    id,
    order,
    image,
    name,
    email,
    role,
    tableRowTemplate,
    isOpen,
    onToggle,
    onBan = () => {},
    onUnban = () => {},
    onPromote = () => {},
    onDemote = () => {},
}) => {
    const roles = {
        user: (
            <div className="w-fit px-4 py-1 text-black bg-[#ff853e] text-sm tracking-wider rounded-md text-white font-semibold">
                <p>User</p>
            </div>
        ),
        admin: (
            <div className="w-fit px-4 py-1 font-semibold bg-[#7A43EE] text-sm tracking-wider rounded-md text-white ">
                <p>Admin</p>
            </div>
        ),
        super_admin: (
            <div className="w-fit px-4 py-1 font-semibold bg-[#67AE6E] text-sm tracking-wider rounded-md text-white ">
                <p>Super admin</p>
            </div>
        ),
        unbanned: (
            <div className="w-fit px-4 py-1 font-semibold bg-[#67AE6E] text-sm tracking-wider rounded-md text-white ">
                <p>Unbanned</p>
            </div>
        ),
        banned: (
            <div className="w-fit px-4 py-1 font-semibold bg-[#BE3D2A] text-sm tracking-wider rounded-md text-white ">
                <p>Banned</p>
            </div>
        ),
    };
    const [banReason, setBanReason] = useState('');
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [showConfirmPromoteModal, setShowConfirmPromoteModal] =
        useState(false);
    const [showConfirmDemoteModal, setShowConfirmDemoteModal] = useState(false);
    const [err, setErr] = useState({ reason: null });

    const handleDemoteCancel = () => {
        setShowConfirmDemoteModal(false);
    };

    const demoteToUser = () => {
        setShowConfirmDemoteModal(true);
    };
    const handlePromoteToAdmin = async () => {
        try {
            await axios.post(`api/admin/user/${id}/promote`);

            toast.success(`${name} promoted to admin`, {
                position: 'top-right',
                autoClose: 3000,
            });
            onPromote(id);
            setShowConfirmPromoteModal(false);
        } catch (e) {
            if (!(e instanceof AxiosError)) {
                return toast.error('Something went wrong', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
            const response = e?.response?.data?.payload;
            if (response.errCode === ErrorConstant.ERR_USER_IS_SUPER_ADMIN) {
                return toast.error('Super admin cannot be promoted', {
                    position: 'top-right',
                });
            }
            return toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    const handleDemoteToUser = async () => {
        try {
            await axios.post(`api/admin/user/${id}/demote`);
            toast.success(`${name} demoted to user`, {
                position: 'top-right',
                autoClose: 3000,
            });
            onDemote(id);
            setShowConfirmDemoteModal(false);
        } catch (e) {
            if (!(e instanceof AxiosError)) {
                return toast.error('Something went wrong', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
            const response = e?.response?.data?.payload;
            if (response.errCode === ErrorConstant.ERR_USER_IS_SUPER_ADMIN) {
                return toast.error('Super admin cannot be demoted', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
            return toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    const openUnbanConfirmation = () => {
        document.getElementById('confirmation_unban').showModal();
    };

    const closeUnbanConfirmation = () => {
        document.getElementById('confirmation_unban').close();
    };

    const handleUnban = async () => {
        try {
            await axios.post(`api/admin/user/${id}/unban`);
            onUnban(id);
            closeUnbanConfirmation();
        } catch {
            return toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };
    const openPopupBan = () => {
        setIsBanModalOpen(true);
    };

    const closePopupBan = () => {
        setIsBanModalOpen(false);
    };

    const promoteToAdmin = () => {
        setShowConfirmPromoteModal(true);
    };

    const handleCancelPromote = () => {
        setShowConfirmPromoteModal(false);
    };

    const handleBanSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`api/admin/user/${id}/ban`, {
                reason: banReason,
            });
            closePopupBan();
            setBanReason('');
            onBan(id);
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
                    { reason: null },
                    setErr,
                );
            }

            if (response.errCode === ErrorConstant.ERR_USER_IS_SUPER_ADMIN) {
                return toast.error('Super admin cannot be banned', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
            return toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };
    const seeDetailUser = () => {
        // To do remove user
    };
    return (
        <div
            className="grid grid-cols-3 w-full items-center  py-8 px-5 text-white relative"
            style={{
                ...tableRowTemplate,
                backgroundColor: order % 2 === 0 ? '#252527' : '#1E1E1F',
            }}
        >
            <div className="flex items-center gap-3 truncate">
                <img
                    className="h-9 aspect-square rounded-3xl object-cover"
                    alt="profile"
                    src={
                        image
                            ? new URL(
                                  image,
                                  import.meta.env.VITE_STATIC_ASSET_BASE_URL,
                              ).href
                            : defaultProfile
                    }
                />
                <div className="flex flex-col">
                    <p className="tracking-wide font-semibold">{name}</p>
                    <p className="tracking-tight text-gray-500 text-sm">
                        {email}
                    </p>
                </div>
            </div>

            {roles[role]}

            <div className="relative">
                <button
                    className="font-bold tracking-wider cursor-pointer px-2 py-1 rounded hover:bg-[#333]"
                    onClick={onToggle}
                >
                    ...
                </button>

                {isOpen && (
                    <div className="absolute left-10 -top-12 mt-2 z-30 w-38 bg-[#1E1E20] text-gray-400 border border-[#444] rounded-md shadow-xl overflow-hidden">
                        {role === 'banned' ? (
                            <>
                                <button
                                    onClick={openUnbanConfirmation}
                                    className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left cursor-pointer"
                                >
                                    Unban User
                                </button>
                                <dialog
                                    id="confirmation_unban"
                                    className="modal"
                                >
                                    <div className="modal-box">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                ✕
                                            </button>
                                        </form>
                                        <h3 className="text-lg">
                                            Are you sure want to unban {name} ?
                                        </h3>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className="btn">
                                                    Close
                                                </button>
                                            </form>
                                            <button
                                                className="btn"
                                                onClick={handleUnban}
                                            >
                                                Yes
                                            </button>
                                        </div>
                                    </div>
                                </dialog>
                            </>
                        ) : (
                            <>
                                {role === 'admin' ? (
                                    <>
                                        <button
                                            onClick={demoteToUser}
                                            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left cursor-pointer"
                                        >
                                            Demote to user
                                        </button>
                                        <DeleteConfirm
                                            isOpen={showConfirmDemoteModal}
                                            title="Demote to user"
                                            item={{ name: 'Demote' }}
                                            message={`Are you sure you want to demote this user's role to  'demote' ?`}
                                            onCancel={handleDemoteCancel}
                                            onConfirm={handleDemoteToUser}
                                            confirmText="Yes, Demote"
                                            confirmBg="bg-blue-600"
                                            confirmHover="hover:bg-blue-800"
                                        />
                                    </>
                                ) : (
                                    <>
                                        {' '}
                                        <button
                                            onClick={promoteToAdmin}
                                            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left cursor-pointer"
                                        >
                                            Promote to admin
                                        </button>
                                        <DeleteConfirm
                                            isOpen={showConfirmPromoteModal}
                                            title="Promoto to admin"
                                            item={{ name: 'Promote' }}
                                            message={`Are you sure you want to promote this user's role to  'Admin' ?`}
                                            onCancel={handleCancelPromote}
                                            onConfirm={handlePromoteToAdmin}
                                            confirmText="Yes, Promote"
                                            confirmBg="bg-blue-600"
                                            confirmHover="hover:bg-blue-800"
                                        />{' '}
                                    </>
                                )}

                                <button
                                    onClick={openPopupBan}
                                    className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#333] text-sm text-left cursor-pointer"
                                >
                                    Ban User
                                </button>
                            </>
                        )}

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
                    className="bg-[#1E1E20] border border-[#444] w-full p-3 rounded text-white resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
                    rows={4}
                    placeholder="Enter reason here..."
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                />
                <div className="error text-sm text-error"> {err.reason}</div>
            </ModalEdit>
        </div>
    );
};

const UserDataTable = () => {
    const tableRowTemplate = { gridTemplateColumns: '2fr 1fr 1fr' };
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState();
    const [roleFilter, setRoleFilter] = useState();
    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const searchUser = async (page = 0) => {
        try {
            const users = await axios.get('/api/admin/users', {
                params: {
                    role: roleFilter || undefined,
                    q: searchResult || undefined,
                    page: page,
                },
            });

            // prevPage.current = page;

            setUsers(users.data.data);
        } catch (e) {
            console.log(e);
            return toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    const handleUnban = (id) => {
        const tempUsers = [...users];
        const updatedUsersIndex = tempUsers.findIndex((post) => post.id === id);
        const updatedUser = { ...tempUsers[updatedUsersIndex] };
        updatedUser.role = 'unbanned';
        tempUsers[updatedUsersIndex] = updatedUser;
        setUsers(tempUsers);
    };

    const handleBan = (id) => {
        const tempUsers = [...users];
        const updatedUsersIndex = tempUsers.findIndex((post) => post.id === id);
        const updatedUser = { ...tempUsers[updatedUsersIndex] };
        updatedUser.role = 'banned';
        tempUsers[updatedUsersIndex] = updatedUser;
        setUsers(tempUsers);
    };

    const handleDemote = (id) => {
        const tempUsers = [...users];
        const updatedUsersIndex = tempUsers.findIndex((post) => post.id === id);
        const updatedUser = { ...tempUsers[updatedUsersIndex] };
        updatedUser.role = 'user';
        tempUsers[updatedUsersIndex] = updatedUser;
        setUsers(tempUsers);
    };

    const handlePromote = (id) => {
        const tempUsers = [...users];
        const updatedUsersIndex = tempUsers.findIndex((post) => post.id === id);
        const updatedUser = { ...tempUsers[updatedUsersIndex] };
        updatedUser.role = 'admin';
        tempUsers[updatedUsersIndex] = updatedUser;
        setUsers(tempUsers);
    };

    useEffect(() => {
        (async () => {
            const keyLoading = nanoid();
            dispatch(showLoading(keyLoading));
            await searchUser();
            dispatch(hideLoading(keyLoading));
        })();
    }, [roleFilter, searchResult]);

    const handleSearch = async () => {
        setSearchResult(searchTerm);
    };

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

                {/* Role Filter */}
                <div className="w-40">
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="w-full p-2 rounded-md bg-[#1E1E20] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#FFA666]"
                    >
                        <option value="">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="super_admin">Super Admin</option>
                        <option value="banned">Banned</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col divide-white divide-y w-full">
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[800px]">
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
                        <div className="overflow-y-auto">
                            {users.length > 0 ? (
                                users.map((v, index) => (
                                    <UserData
                                        key={v.id}
                                        id={v.id}
                                        order={index}
                                        image={v.profile_image}
                                        name={v.username}
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
                                        onBan={handleBan}
                                        onUnban={handleUnban}
                                        onDemote={handleDemote}
                                        onPromote={handlePromote}
                                    />
                                ))
                            ) : (
                                <div className="text-center text-white py-6 bg-[#1E1E20] text-sm sm:text-base">
                                    No users found.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDataTable;
