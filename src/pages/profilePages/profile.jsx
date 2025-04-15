// General
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Icons
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';
import { RiMenu2Line } from 'react-icons/ri';
import { IoIosNotifications } from 'react-icons/io';

// Components
import DeleteConfirmationModal from '../../components/dataDestination/deleteConfirm.jsx';
import ModalEdit from '../../components/profile/modalEdit.jsx';
import ModalMessage from '../../components/profile/modalMessage.jsx';
import Sidebar from '../../components/profile/sidebar';
import ProfileIcon from '../../assets/navbar/Icon.webp';
import { ValidateFields } from '../../util/validation.js';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import ErrorConstant from '../../util/errorConstant.js';
import {
    setUsername as setUsernameRedux,
    setEmail as setEmailRedux,
    setName as setNameRedux,
    setImage,
} from '../../stores/userReducer';
import imgURL from '../../util/imgURL.js';
import { nanoid } from 'nanoid';
import { hideLoading } from '../../stores/loadingReducer.js';
import { MobileNotification } from '../mobileNotification.jsx';
import { DekstopNotification } from '../dekstopNotification.jsx';
const Profile = () => {
    // Import and initial state
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);

    // Global State
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // const [isModalOpen, setIsModalOpen] = useState(false);

    const [isModalProfile, setIsModalProfile] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    // Username State
    const [isModalUsernameOpen, setIsModalUsernameOpen] = useState(false);
    const [newUsername, setNewUsername] = useState('');

    // Name State
    const [newName, setNewName] = useState('');
    const [isModalEditNameOpen, setIsModalEditNameOpen] = useState(false);

    // Email State
    const [newEmail, setNewEmail] = useState('');
    const [isModalEditEmailOpen, setIsModalEditEmailOpen] = useState(false);

    // Profile Data State
    const [username, setUsername] = useState(user.username || '');
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');

    // Image Upload State
    const [isDragging, setIsDragging] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileImage, setFileImage] = useState('');

    // Password State
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmationPassword: '',
    });
    const [passwordError, setPasswordError] = useState({
        oldPassword: null,
        newPassword: null,
        confirmationPassword: null,
    });
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmationPassword: false,
    });

    // Error Validation State
    const [err, setErr] = useState({
        username: null,
        email: null,
        name: null,
        image: null,
    });

    // Error Validation from backend
    const invalidFieldErr = (arr, newObjErr, setState) => {
        for (const element of arr) {
            if (
                Object.prototype.hasOwnProperty.call(newObjErr, element.path[0])
            ) {
                newObjErr[element.path[0]] = element.message;
            }
        }
        setState((state) => ({ ...state, ...newObjErr }));
    };

    // Logout
    const handleLogout = async () => {
        try {
            await axios.post(
                '/api/auth/logout',
                {},
                {
                    withCredentials: true,
                },
            );
            localStorage.removeItem('token');
            // dispatch(setData());
            await navigate('/sign-in');
        } catch (e) {
            console.log(e);
            toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        } finally {
            setShowLogoutConfirm(false);
        }
    };

    // Edit Profile Image
    const handleEditProfileImage = async (e) => {
        e?.preventDefault();
        const formData = new FormData();
        const keyLoading = nanoid();

        if (!fileImage) {
            setErr((state) => ({
                ...state,
                image: 'Please select an image first',
            }));
            return;
        }

        formData.append('image', fileImage);

        try {
            setErr((state) => ({ ...state, image: null }));
            await axios
                .patch('/api/user/edit/profile-picture', new FormData())
                .catch((e) => {});
            const result = (
                await axios.patch('/api/user/edit/profile-picture', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
            ).data;

            dispatch(setImage(selectedImage));

            toast.success('Success edit profile image', {
                position: 'top-right',
                autoClose: 3000,
            });

            setIsModalProfile(false);
            setFileImage(null);
            // if (selectedImage) {
            //     URL.revokeObjectURL(selectedImage);
            setSelectedImage(null);
            // }
        } catch (e) {
            if (!(e instanceof AxiosError)) {
                toast.error('Something went wrong', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                return;
            }
            if (e.response?.status === 413) {
                setErr((state) => ({
                    ...state,
                    image: 'Image size too large',
                }));
                return;
            }
            const response = e?.response?.data?.payload;
            if (response?.errCode === ErrorConstant.ERR_INVALID_FIELD) {
                invalidFieldErr(response.fields, { image: null }, setErr);
                return;
            }
        } finally {
            dispatch(hideLoading(keyLoading));
        }
    };

    // Edit Username
    const handlerEditUsername = async (username) => {
        setErr((state) => ({ ...state, username: null }));
        try {
            await axios.patch('/api/user/edit/username', {
                username: username,
            });
            dispatch(setUsernameRedux(username));
            toast.success('Success edit username', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (e) {
            if (!(e instanceof AxiosError)) {
                toast.error('Something went wrong', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                return;
            }
            const response = e?.response?.data?.payload;
            if (response.errCode === ErrorConstant.ERR_INVALID_FIELD) {
                invalidFieldErr(response.fields, { username: null }, setErr);
                return;
            }

            if (response.errCode === ErrorConstant.ERR_USERNAME_ALREADY_USED) {
                setErr((state) => ({ ...state, username: response.message }));
                return;
            }

            toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    // Edit Email
    const handleEditEmail = async (email) => {
        setErr((state) => ({ ...state, email: null }));
        try {
            await axios.patch('/api/user/edit/email', {
                email: email,
            });
            dispatch(setEmailRedux(email));
            setEmail(email);
            toast.success('Success edit email', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (e) {
            if (!(e instanceof AxiosError)) {
                toast.error('Something went wrong', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                return;
            }
            const response = e?.response?.data?.payload;
            if (response.errCode === ErrorConstant.ERR_INVALID_FIELD) {
                invalidFieldErr(response.fields, { email: null }, setErr);
                return;
            }
            if (response.errCode === ErrorConstant.ERR_EMAIL_ALREADY_USED) {
                setErr((state) => ({ ...state, email: response.message }));
                return;
            }

            toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    // Edit Name
    const handleEditName = async (name) => {
        setErr((state) => ({ ...state, name: null }));
        try {
            await axios.patch('/api/user/edit/name', {
                name: name,
            });
            dispatch(setNameRedux(name));
            setName(name);
            toast.success('Success edit Display Name', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (e) {
            if (!(e instanceof AxiosError)) {
                toast.error('Something went wrong', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                return;
            }
            const response = e?.response?.data?.payload;
            if (response.errCode === ErrorConstant.ERR_INVALID_FIELD) {
                invalidFieldErr(response.fields, { name: null }, setErr);
                return;
            }

            toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    // Edit Password
    const handleEditPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.patch('/api/user/edit/password', passwords);
            closePopUpPassword();

            setPasswordError({
                oldPassword: null,
                newPassword: null,
                confirmationPassword: null,
            });
            setPasswords({
                oldPassword: '',
                newPassword: '',
                confirmationPassword: '',
            });
            setShowPassword({
                oldPassword: false,
                newPassword: false,
                confirmationPassword: false,
            });
            toast.success('Success edit password', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (e) {
            if (!(e instanceof AxiosError)) {
                return toast.success({
                    autoClose: 3000,
                    position: 'top-right',
                });
            }

            const response = e?.response?.data?.payload;
            if (response.errCode === ErrorConstant.ERR_INVALID_FIELD) {
                invalidFieldErr(
                    response.fields,
                    {
                        oldPassword: null,
                        newPassword: null,
                        confirmationPassword: null,
                    },
                    setPasswordError,
                );
                return;
            }
            if (response.errCode === ErrorConstant.ERR_PASSWORD_INVALID) {
                setPasswordError(() => ({
                    newPassword: null,
                    confirmationPassword: null,
                    oldPassword: response.message,
                }));
                return;
            }
            return toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    // Modal Password Open/Close
    const openPopUpPassword = () => {
        setIsPasswordModalOpen(true);
    };

    const closePopUpPassword = () => {
        setIsPasswordModalOpen(false);
    };

    // Image Upload Drag and Drop
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (selectedImage) {
                URL.revokeObjectURL(selectedImage);
            }
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setFileImage(file);
        }
        event.target.value = '';
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
            handleImageChange({ target: { files: [file] } });
        }
    };

    // Reset image state when modal is closed
    useEffect(() => {
        if (!isModalProfile) {
            setErr((state) => ({ ...state, image: null }));
            setSelectedImage(null);
            setFileImage(null);
        }
    }, [isModalProfile]);

    return (
        <div className="w-full bg-[#221122] flex lg:h-screen items-center justify-center p-8 lg:p-10 text-white">
            <ToastContainer />

            {/* Header Mobile */}
            <div className="lg:hidden p-5 fixed z-30 top-0 w-full bg-[#252527] flex justify-between items-center shadow-xl">
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
                <div className="flex relative lg:hidden">
                    <MobileNotification />
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-20 w-64 bg-[#252527] transform transition-transform duration-300 ease-in-out shadow-lg lg:hidden lg:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <Sidebar />
            </div>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-10 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            <div className="hidden lg:flex h-full mr-5">
                <Sidebar />
            </div>

            <div className="flex flex-col flex-1 rounded-lg overflow-hidden shadow-lg bg-[#252527] p-3 h-full w-12 mt-20 lg:m-0">
                {/* Header */}
                <div className="flex justify-between items-center border-white border-b-2 pb-5">
                    {/* Profile */}
                    <div className="flex flex-row gap-3 items-center w-100">
                        <img
                            src={
                                user.profileImage
                                    ? imgURL(user.profileImage)
                                    : ProfileIcon
                            }
                            alt="Profile"
                            className="rounded-full max-w-20 w-full aspect-1/1 cursor-pointer object-cover"
                            onClick={() => setIsModalProfile(true)}
                        />
                        <div className="flex flex-col gap-2">
                            <h1 className="font-inknut-antiqua text-xl lg:text-3xl">
                                {user.username}
                            </h1>
                            <p className="font-quicksand text-lg">{user.name}</p>
                        </div>
                        <ModalEdit
                            isOpen={isModalProfile}
                            onClose={() => setIsModalProfile(false)}
                            onSubmit={handleEditProfileImage}
                            title="Change Profile Photo"
                        >
                            <div className="flex flex-col">
                                <div
                                    className="flex items-center justify-center w-full rounded-full pt-10 pb-2"
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <label
                                        htmlFor="dropzone-file"
                                        className={`flex flex-col items-center justify-center rounded-full
                                    overflow-hidden h-59 border-2 border-dashed aspect-1/1 cursor-pointer transition
                                    ${isDragging ? 'border-[#FFA666] bg-gray-800' : 'border-gray-300 hover:bg-gray-700'}`}
                                    >
                                        {selectedImage ? (
                                            <img
                                                src={selectedImage}
                                                alt="Selected"
                                                className="object-cover w-full h-full rounded-lg"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg
                                                    className="w-8 h-8 mb-4 text-gray-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 16"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                    />
                                                </svg>
                                                <p className="text-sm text-gray-400">
                                                    <span className="font-semibold">
                                                        Click to upload
                                                    </span>{' '}
                                                    or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    PNG, JPG or WEBP (MAX. 10MB)
                                                </p>
                                            </div>
                                        )}
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>

                                <div className="min-h-[20px] ">
                                    {fileImage?.name && (
                                        <p className="text-sm text-gray-500 text-center">
                                            {fileImage.name}
                                        </p>
                                    )}
                                </div>

                                <div className="min-h-[20px] ">
                                    {err.image && (
                                        <p className="text-red-500 text-sm text-center">
                                            {err.image}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </ModalEdit>
                    </div>

                    {/* Message */}
                    <DekstopNotification />
                </div>

                <h1 className="font-inknut-antiqua text-xl lg:text-2xl text-center my-4">
                    Account Information
                </h1>

                <div className="flex flex-col gap-4 w-full overflow-y-auto">
                    {/* Username */}
                    <div className="flex flex-col lg:w-xl">
                        <p className="font-quicksand text-white pb-2">
                            Username
                        </p>
                        <div className="flex flex-col lg:flex-row w-full gap-3">
                            <div className="flex w-full flex-col">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    readOnly
                                    placeholder="Your Username"
                                    className="flex-3 p-3 font-quicksand rounded text-white border  w-full focus:outline-none"
                                />
                            </div>
                            <div>
                                <button
                                    className="flex-1 lg:px-10 py-3 w-full bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer font-semibold"
                                    onClick={() => {
                                        setNewUsername(username);
                                        setIsModalUsernameOpen(true);
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>

                        <ModalEdit
                            isOpen={isModalUsernameOpen}
                            onClose={() => setIsModalUsernameOpen(false)}
                            title="Edit Username"
                            onSubmit={async (e) => {
                                e.preventDefault();

                                const isValid = ValidateFields(
                                    { username: newUsername },
                                    { username: { minLength: 4 } },
                                    setErr,
                                );

                                if (!isValid) return;

                                await handlerEditUsername(newUsername);
                                setUsername(newUsername);
                                setIsModalUsernameOpen(false);
                            }}
                        >
                            <div className="flex flex-col">
                                <label
                                    htmlFor="username"
                                    className="text-white font-medium"
                                >
                                    New Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) => {
                                        setNewUsername(e.target.value);
                                        setErr((prev) => ({
                                            ...prev,
                                            username: null,
                                        }));
                                    }}
                                    className={`w-full p-3 font-quicksand rounded text-white bg-transparent border mt-2 ${
                                        err.username
                                            ? 'border-red-500'
                                            : 'border-white'
                                    } focus:outline-none`}
                                    placeholder="Enter new username"
                                />
                                <div className="min-h-[20px]">
                                    {err.username && (
                                        <p className="text-sm text-red-500">
                                            {err.username}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </ModalEdit>
                    </div>

                    {/* Display Name */}
                    <div className="flex flex-col lg:w-xl">
                        <p className="font-quicksand text-white pb-2">
                            Display Name
                        </p>
                        <div className="flex flex-col lg:flex-row w-full gap-3">
                            <div className="flex w-full flex-col">
                                <input
                                    type="text"
                                    placeholder="Your Display Name"
                                    className="flex-3 p-3 font-quicksand rounded text-white border  w-full focus:outline-none"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    readOnly
                                />
                            </div>
                            <div>
                                <button
                                    className="flex-1 lg:px-10 w-full py-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer font-semibold"
                                    onClick={() => {
                                        setNewName(name);
                                        setIsModalEditNameOpen(true);
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>

                        <ModalEdit
                            isOpen={isModalEditNameOpen}
                            onClose={() => setIsModalEditNameOpen(false)}
                            title="Edit Display Name"
                            onSubmit={async (e) => {
                                e.preventDefault();

                                const isValid = ValidateFields(
                                    { name: newName },
                                    { name: { minLength: 4 } },
                                    setErr,
                                );

                                if (!isValid) return;

                                await handleEditName(newName);
                                // setUsername(newName);
                                setName(newName);
                                setIsModalEditNameOpen(false);
                            }}
                        >
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="display-name"
                                    className="text-white font-medium"
                                >
                                    New Display Name
                                </label>
                                <input
                                    id="display-name"
                                    type="text"
                                    value={newName}
                                    onChange={(e) => {
                                        setNewName(e.target.value);
                                        setErr((prev) => ({
                                            ...prev,
                                            name: null,
                                        }));
                                    }}
                                    className={`w-full p-3 font-quicksand rounded text-white bg-transparent border ${
                                        err.name
                                            ? 'border-red-500'
                                            : 'border-white'
                                    } focus:outline-none`}
                                    placeholder="Enter new display name"
                                />
                                <div className="min-h-[20px]">
                                    {err.name && (
                                        <p className="text-sm text-red-500">
                                            {err.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </ModalEdit>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col lg:w-xl">
                        <p className="font-quicksand text-white pb-2">Email</p>
                        <div className="flex flex-col lg:flex-row w-full gap-3">
                            <div className="flex w-full flex-col ">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="flex-3 p-3 font-quicksand rounded text-white border w-full border-white focus:outline-none"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    readOnly
                                />
                            </div>
                            <div>
                                <button
                                    className="flex-1 lg:px-10 w-full py-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer font-semibold"
                                    onClick={() => {
                                        setNewEmail(email);
                                        setIsModalEditEmailOpen(true);
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>

                        <ModalEdit
                            isOpen={isModalEditEmailOpen}
                            onClose={() => setIsModalEditEmailOpen(false)}
                            title="Edit Email"
                            onSubmit={(e) => {
                                e.preventDefault();

                                const isValid = ValidateFields(
                                    { email: newEmail },
                                    { email: { isEmail: true } },
                                    setErr,
                                );

                                if (!isValid) return;

                                handleEditEmail(newEmail);
                                setIsModalEditEmailOpen(false);
                            }}
                        >
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="email"
                                    className="text-white font-medium"
                                >
                                    New Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={newEmail}
                                    onChange={(e) => {
                                        setNewEmail(e.target.value);
                                        setErr((prev) => ({
                                            ...prev,
                                            email: null,
                                        }));
                                    }}
                                    className={`w-full p-3 font-quicksand rounded text-white bg-transparent border ${
                                        err.email
                                            ? 'border-red-500'
                                            : 'border-white'
                                    } focus:outline-none`}
                                    placeholder="Enter new email"
                                />
                                <div className="min-h-[20px]">
                                    {err.email && (
                                        <p className="text-sm text-red-500">
                                            {err.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </ModalEdit>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col lg:w-xl">
                        <p className="font-quicksand text-white pb-2">
                            Password
                        </p>
                        <div className="flex flex-col lg:flex-row gap-3 w-full">
                            <div className="flex w-full gap-3">
                                <div className="relative flex-1 ">
                                    <input
                                        type={
                                            showPassword.newPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        placeholder="Password"
                                        value={passwords.newPassword}
                                        onChange={(e) =>
                                            setPasswords((state) => ({
                                                ...state,
                                                newPassword: e.target.value,
                                            }))
                                        }
                                        className="w-full p-3 pr-10 font-quicksand rounded text-white border border-white bg-transparent focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        className={`absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer p-1 rounded-full transition-all duration-300 ease-in-out ${
                                            showPassword.newPassword
                                                ? 'bg-gray-600'
                                                : 'hover:bg-gray-600'
                                        }`}
                                        onClick={() =>
                                            setShowPassword((state) => ({
                                                ...state,
                                                newPassword: !state.newPassword,
                                            }))
                                        }
                                    >
                                        {showPassword.newPassword ? (
                                            <FaEyeSlash className="transition-all duration-300" />
                                        ) : (
                                            <FaEye className="transition-all duration-300" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="lg:px-10 py-3 w-full bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer font-semibold"
                                    onClick={openPopUpPassword}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>

                        <ModalEdit
                            isOpen={isPasswordModalOpen}
                            title="Change Password"
                            onClose={closePopUpPassword}
                            onSubmit={(e) => {
                                e.preventDefault();
                                setPasswordError({});

                                const isValid = ValidateFields(
                                    {
                                        oldPassword: passwords.oldPassword,
                                        newPassword: passwords.newPassword,
                                        confirmationPassword:
                                            passwords.confirmationPassword,
                                    },
                                    {
                                        oldPassword: { required: true },
                                        newPassword: {
                                            required: true,
                                            minLength: 6,
                                        },
                                        confirmationPassword: {
                                            required: true,
                                            match: passwords.newPassword,
                                        },
                                    },
                                    setPasswordError,
                                );

                                if (!isValid) return;

                                handleEditPassword();
                                closePopUpPassword();
                            }}
                        >
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <label htmlFor="input-newPassword">
                                        Old password
                                    </label>
                                    <div className="relative flex-1 ">
                                        <input
                                            id="input-newPassword"
                                            type={
                                                showPassword.oldPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="Password"
                                            value={passwords.oldPassword}
                                            onChange={(e) =>
                                                setPasswords((state) => ({
                                                    ...state,
                                                    oldPassword: e.target.value,
                                                }))
                                            }
                                            className="w-full p-3 pr-10 font-quicksand rounded text-white border border-white bg-transparent focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            className={`absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer p-1 rounded-full transition-all duration-300 ease-in-out ${
                                                showPassword.oldPassword
                                                    ? 'bg-gray-600'
                                                    : 'hover:bg-gray-600'
                                            }`}
                                            onClick={() =>
                                                setShowPassword((state) => ({
                                                    ...state,
                                                    oldPassword:
                                                        !state.oldPassword,
                                                }))
                                            }
                                        >
                                            {showPassword.oldPassword ? (
                                                <FaEyeSlash className="transition-all duration-300" />
                                            ) : (
                                                <FaEye className="transition-all duration-300" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="min-h-[20px]">
                                        <p className="text-red-500 text-sm">
                                            {passwordError.oldPassword}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="input-newPassword">
                                        New Password
                                    </label>
                                    <div className="relative flex-1 ">
                                        <input
                                            type={
                                                showPassword.newPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="Password"
                                            value={passwords.newPassword}
                                            onChange={(e) =>
                                                setPasswords((state) => ({
                                                    ...state,
                                                    newPassword: e.target.value,
                                                }))
                                            }
                                            className="w-full p-3 pr-10 font-quicksand rounded text-white border border-white bg-transparent focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            className={`absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer p-1 rounded-full transition-all duration-300 ease-in-out ${
                                                showPassword.newPassword
                                                    ? 'bg-gray-600'
                                                    : 'hover:bg-gray-600'
                                            }`}
                                            onClick={() =>
                                                setShowPassword((state) => ({
                                                    ...state,
                                                    newPassword:
                                                        !state.newPassword,
                                                }))
                                            }
                                        >
                                            {showPassword.newPassword ? (
                                                <FaEyeSlash className="transition-all duration-300" />
                                            ) : (
                                                <FaEye className="transition-all duration-300" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="min-h-[20px]">
                                        <p className="text-red-500 text-sm">
                                            {passwordError.newPassword}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="input-confirmationPassword">
                                        Confirm password
                                    </label>
                                    <div className="relative flex-1 ">
                                        <input
                                            type={
                                                showPassword.confirmationPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="Password"
                                            value={
                                                passwords.confirmationPassword
                                            }
                                            onChange={(e) =>
                                                setPasswords((state) => ({
                                                    ...state,
                                                    confirmationPassword:
                                                        e.target.value,
                                                }))
                                            }
                                            className="w-full p-3 pr-10 font-quicksand rounded text-white border border-white bg-transparent focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            className={`absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer p-1 rounded-full transition-all duration-300 ease-in-out ${
                                                showPassword.confirmationPassword
                                                    ? 'bg-gray-600'
                                                    : 'hover:bg-gray-600'
                                            }`}
                                            onClick={() =>
                                                setShowPassword((state) => ({
                                                    ...state,
                                                    confirmationPassword:
                                                        !state.confirmationPassword,
                                                }))
                                            }
                                        >
                                            {showPassword.confirmationPassword ? (
                                                <FaEyeSlash className="transition-all duration-300" />
                                            ) : (
                                                <FaEye className="transition-all duration-300" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="min-h-[20px]">
                                        <p className="text-red-500 text-sm">
                                            {passwordError.confirmationPassword}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ModalEdit>
                    </div>

                    {/* Logout */}
                    <div>
                        <button
                            className="w-38 mt-10 p-3 bg-red-600 text-white font-quicksand rounded hover:bg-red-800 transition cursor-pointer font-semibold"
                            onClick={() => setShowLogoutConfirm(true)}
                        >
                            Logout
                        </button>
                        <DeleteConfirmationModal
                            isOpen={showLogoutConfirm}
                            item={{ name: 'your session' }}
                            title="Confirm Logout"
                            message={
                                <>
                                    Are you sure you want to{' '}
                                    <span className="text-red-500 font-bold">
                                        {user.username}
                                    </span>
                                    ?
                                </>
                            }
                            onCancel={() => setShowLogoutConfirm(false)}
                            onConfirm={handleLogout}
                            cancelText="Stay Logged In"
                            confirmText="Yes, Logout"
                            confirmBg="bg-red-600"
                            confirmHover="hover:bg-red-800"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
