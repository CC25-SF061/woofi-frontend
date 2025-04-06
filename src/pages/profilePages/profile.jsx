import React, { useEffect, useState } from 'react';
import ProfileIcon from '../../assets/navbar/Icon.webp';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Sidebar from '../../components/profile/sidebar';
import { HiX } from 'react-icons/hi';
import { RiMenu2Line } from 'react-icons/ri';
import { IoIosNotifications } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import axios, { AxiosError } from 'axios';
import ErrorConstant from '../../util/ErrorConstant';
import { toast, ToastContainer } from 'react-toastify';
import {
    setUsername as setUsernameRedux,
    setEmail as setEmailRedux,
    setName as setNameRedux,
    setImage,
} from '../../stores/userReducer';
import imgURL from '../../util/imgURL.js';
import { nanoid } from 'nanoid';
import { hideLoading, showLoading } from '../../stores/loadingReducer.js';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmationPassword: false,
    });
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const [username, setUsername] = useState(user.username);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileImage, setFileImage] = useState('');

    const [err, setErr] = useState({
        username: null,
        email: null,
        name: null,
        image: null,
    });
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
    const handleLogout = async () => {
        try {
            await axios.post(
                '/api/auth/logout',
                {},
                {
                    withCredentials: true,
                },
            );
            await navigate('/sign-in');
        } catch (e) {
            toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };
    const handleEditProfileImage = async () => {
        const formData = new FormData();
        const keyLoading = nanoid();
        formData.append('image', fileImage);
        dispatch(showLoading(keyLoading));
        try {
            setErr((state) => ({ ...state, image: null }));
            //ping the route to prevent econreset
            await axios
                .patch('/api/user/edit/profile-picture', new FormData())
                .catch((e) => {});
            const result = (
                await axios.patch('/api/user/edit/profile-picture', formData)
            ).data;

            dispatch(setImage(result.data.image));

            toast.success('Success edit profile image', {
                position: 'top-right',
                autoClose: 3000,
            });
            setIsModalOpen(false);
            setFileImage(null);
            URL.revokeObjectURL(selectedImage);
            setSelectedImage(null);
        } catch (e) {
            if (!(e instanceof AxiosError)) {
                toast.error('Something went wrong', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                return;
            }
            if (e.response.status === 413) {
                setErr((state) => ({
                    ...state,
                    image: 'Image size too large',
                }));
                return;
            }
            const response = e?.response?.data?.payload;
            if (response.errCode === ErrorConstant.ERR_INVALID_FIELD) {
                invalidFieldErr(response.fields, { image: null }, setErr);
                return;
            }
        } finally {
            dispatch(hideLoading(keyLoading));
        }
    };
    const handlerEditUsername = async () => {
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

    const handleEditEmail = async () => {
        setErr((state) => ({ ...state, email: null }));
        try {
            await axios.patch('/api/user/edit/email', {
                email: email,
            });
            dispatch(setEmailRedux(email));

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

    const handleEditName = async () => {
        setErr((state) => ({ ...state, name: null }));
        try {
            await axios.patch('/api/user/edit/name', {
                name: name,
            });
            dispatch(setNameRedux(name));

            toast.success('Success edit name', {
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
    const openPopUpPassword = () => {
        document.getElementById('modal-password').showModal();
    };
    const closePopUpPassword = () => {
        document.getElementById('modal-password').close();
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
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
            handleImageChange({ target: { files: [file] } }); // panggil handler kamu yang udah ada
        }
    };

    useEffect(() => {
        if (!isModalOpen) {
            setErr((state) => ({ ...state, image: null }));
            setSelectedImage(null);
            setFileImage(null);
        }
    }, [isModalOpen]);
    return (
        <div className="w-full bg-[#221122] flex lg:h-screen items-center justify-center p-5 lg:p-10 text-white">
            <ToastContainer />

            <dialog id="modal-password" className="modal">
                <div className="modal-box">
                    <form method="dialog" className="modal-backdrop">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>

                    <h3 className="font-bold text-lg text-center">
                        Change Password
                    </h3>

                    <form
                        className="flex flex-col gap-4 mt-6 px-3"
                        onSubmit={handleEditPassword}
                    >
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
                                            oldPassword: !state.oldPassword,
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
                            <div className="text-red-500 text-sm">
                                {passwordError.oldPassword}
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
                            <div className="error text-red-500 text-sm">
                                {passwordError.newPassword}
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
                                    value={passwords.confirmationPassword}
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
                            <div className="error text-red-500 text-sm">
                                {passwordError.confirmationPassword}
                            </div>
                        </div>
                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                className="py-2.5 px-5 text-sm font-semibold text-black rounded-lg hover:bg-gray-400 bg-white cursor-pointer"
                                type="button"
                                onClick={closePopUpPassword}
                            >
                                Cancel
                            </button>

                            <button className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
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
                <button className="bg-[#FFA666] text-black font-quicksand p-2 rounded-lg cursor-pointer">
                    <IoIosNotifications size={24} />
                </button>
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

            <div className="flex flex-col flex-1 rounded-lg overflow-hidden shadow-lg bg-[#252527] p-3 m-5 lg:m-0 h-full w-12 mt-20">
                <div className="flex justify-between items-center border-white border-b-2 pb-5 rounded-b-lg">
                    <div className="flex flex-row gap-3 items-center">
                        <img
                            src={
                                user.profileImage
                                    ? imgURL(user.profileImage)
                                    : ProfileIcon
                            }
                            alt="Profile"
                            className="rounded-full max-w-20 w-full aspect-1/1 cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        />
                        <div className="flex flex-col gap-2">
                            <h1 className="font-inknut-antiqua text-3xl">
                                {user.username}
                            </h1>
                            <p className="font-quicksand">{user.name}</p>
                        </div>
                    </div>
                    <div className="hidden lg:flex">
                        <button className="border-white border-2 text-white font-quicksand p-2 rounded-lg cursor-pointer">
                            <IoIosNotifications size={24} />
                        </button>
                    </div>
                </div>

                <h1 className="font-inknut-antiqua text-2xl text-center my-4">
                    Account Information
                </h1>

                <div className="flex flex-col gap-4 w-full overflow-y-auto">
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
                                    placeholder="Your Username"
                                    className={`
                                             ${
                                                 err.username
                                                     ? 'border-red-500'
                                                     : 'border-white'
                                             }
                                        flex-3 p-3 font-quicksand rounded text-white border  w-full focus:outline-none`}
                                />
                                <div className="error text-red-500 text-sm">
                                    {err.username}
                                </div>
                            </div>
                            <div>
                                <button
                                    className="flex-1 lg:px-10 py-3 w-full bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer font-semibold"
                                    onClick={() =>
                                        handlerEditUsername('Username')
                                    }
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:w-xl">
                        <p className="font-quicksand text-white pb-2">
                            Display Name
                        </p>
                        <div className="flex flex-col lg:flex-row w-full gap-3">
                            <div className="flex w-full flex-col">
                                <input
                                    type="text"
                                    placeholder="Your Display Name"
                                    className={`
                                            ${
                                                err.name
                                                    ? 'border-red-500'
                                                    : 'border-white'
                                            }
                                            flex-3 w-full p-3 font-quicksand rounded text-white border  focus:outline-none`}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <div className="error text-red-500 text-sm">
                                    {err.name}
                                </div>
                            </div>
                            <div>
                                <button
                                    className="flex-1 lg:px-10 w-full py-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer font-semibold"
                                    onClick={() => handleEditName()}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:w-xl">
                        <p className="font-quicksand text-white pb-2">Email</p>
                        <div className="flex flex-col lg:flex-row w-full gap-3">
                            <div className="flex w-full flex-col ">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className={`
                                           ${
                                               err.email
                                                   ? 'border-red-500'
                                                   : 'border-white'
                                           }
                                        flex-3 p-3 font-quicksand rounded text-white border w-full border-white focus:outline-none`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="error text-red-500 text-sm">
                                    {err.email}
                                </div>
                            </div>
                            <div>
                                <button
                                    className="flex-1 lg:px-10 w-full py-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer font-semibold"
                                    onClick={() => handleEditEmail()}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
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
                                    className="lg:px-10 py-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer font-semibold"
                                    onClick={openPopUpPassword}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                    <button
                        className="w-38 mt-10 p-3 bg-red-600 text-white font-quicksand rounded hover:bg-red-800 transition cursor-pointer font-semibold"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-80 backdrop-blur-md z-50 font-quicksand top-20 lg:top-0">
                        <div className="relative p-4 py-0 w-full max-w-lg rounded-lg shadow-lg bg-[#252527] lg:max-h-[90vh] max-h-[70vh] overflow-y-auto">
                            <div className="sticky top-0 bg-[#252527] z-10 p-4 pt-8 border-b rounded-t border-gray-600">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-white">
                                        Change Profile Photo
                                    </h3>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-white bg-transparent hover:bg-white hover:text-[#FFA666] rounded-sm text-2xl cursor-pointer"
                                    >
                                        <IoClose />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col mb-2 lg:mb-0 mt-5">
                                {fileImage?.name && (
                                    <div className="min-h-[20px] mb-3">
                                        {fileImage && (
                                            <p className="text-sm text-gray-500 text-center">
                                                {fileImage.name}
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div
                                    className="flex items-center justify-center w-full rounded-full mb-3"
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <label
                                        htmlFor="dropzone-file"
                                        className={`flex flex-col items-center justify-center rounded-full
                                             overflow-hidden h-59 border-2 border-dashed  aspect-1/1 cursor-pointer transition
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
                                                    aria-hidden="true"
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

                                {err.image && (
                                    <div className="text-red-500 text-sm text-center mb-3">
                                        {err.image}
                                    </div>
                                )}
                            </div>

                            <div className="sticky bottom-0 bg-[#252527] z-10 p-4 pb-8 border-t border-gray-200 rounded-b border-gray-600 flex items-center justify-end gap-3">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="py-2.5 px-5 text-sm font-semibold text-black rounded-lg hover:bg-gray-400 bg-white cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleEditProfileImage}
                                    className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
