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
    setPartialData,
    setUsername as setUsernameRedux,
    setEmail as setEmailRedux,
    setName as setNameRedux,
} from '../../stores/userReducer';

const Profile = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [editSection, setEditSection] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const [username, setUsername] = useState(user.username);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [afterValue, setAfterValue] = useState('');
    const [err, setErr] = useState({
        username: null,
        email: null,
        name: null,
    });
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [passwordError, setPasswordError] = useState(null);
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
    const handlerEditUsername = async (newUsername) => {
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

    const handleEditEmail = async (newEmail) => {
        setErr((state) => ({ ...state, email: null }));
        try {
            await axios.patch('/api/user/edit/email', {
                email: email,
            });
            dispatch(setEmail(email));

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

    const handleEditName = async (newName) => {
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
            console.log('19u0h3');
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

    useEffect(() => {
        if (editSection === 'username') {
            setAfterValue(user.username);
        } else if (editSection === 'email') {
            setAfterValue(user.email);
        } else if (editSection === 'name') {
            setAfterValue(user.name);
        } else {
            setAfterValue('');
        }
    }, [editSection]);

    const handleSave = async () => {
        if (editSection === 'username') {
            setUsername(afterValue);
            await handlerEditUsername(afterValue);
        } else if (editSection === 'email') {
            setEmail(afterValue);
            await handleEditEmail(afterValue);
        } else if (editSection === 'name') {
            setName(afterValue);
            await handleEditName(afterValue);
        }

        setEditSection(null);
    };

    return (
        <div className="w-full bg-[#221122] flex lg:h-screen items-center justify-center p-5 lg:p-10 gap-5 text-white">
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

            <div className="hidden lg:flex h-full">
                <Sidebar />
            </div>

            <div className="flex flex-col flex-1 rounded-lg overflow-hidden shadow-lg bg-[#252527] p-5 m-5 lg:m-0 h-full lg:w-3/4 mt-20">
                <div className="flex justify-between items-center border-white border-b-2 pb-5 rounded-b-lg">
                    <div className="flex flex-row gap-3 items-center">
                        <img
                            src={ProfileIcon}
                            alt="Profile"
                            className="rounded-full w-20 cursor-pointer"
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
                    {editSection
                        ? `Edit ${editSection}`
                        : 'Account Information'}
                </h1>

                {!editSection && (
                    <div className="flex flex-col gap-2 h-full overflow-y-auto">
                        <div className="flex flex-col lg:w-xl">
                            <p className="font-quicksand text-white pb-2">
                                Username
                            </p>
                            <div className="flex flex-col lg:flex-row w-full">
                                <div className="flex w-full gap-3">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        placeholder="Your Username"
                                        className="flex-3 p-3 font-quicksand rounded text-white border border-white w-full focus:outline-none"
                                    />
                                    <button
                                        className="flex-1 lg:p-3 py-1 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer font-semibold"
                                        onClick={() =>
                                            setEditSection('Username')
                                        }
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div className="error">{err.username}</div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:w-xl">
                            <p className="font-quicksand text-white pb-2">
                                Display Name
                            </p>
                            <div className="flex flex-col lg:flex-row w-full">
                                <div className="flex w-full gap-3">
                                    <input
                                        type="text"
                                        placeholder="Your Display Name"
                                        className="flex-3 w-full p-3 font-quicksand rounded text-white border border-white focus:outline-none"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        readOnly
                                    />
                                    <button
                                        className="flex-1 lg:p-3 py-1 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer font-semibold"
                                        onClick={() =>
                                            setEditSection('Dsiplay Name')
                                        }
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div className="error">{err.name}</div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:w-xl">
                            <p className="font-quicksand text-white pb-2">
                                Email
                            </p>
                            <div className="flex flex-col lg:flex-row w-full">
                                <div className="flex w-full gap-3">
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        className="flex-3 p-3 font-quicksand rounded text-white border w-full border-white focus:outline-none"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    <button
                                        className="flex-1 lg:p-3 py-1 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer font-semibold"
                                        onClick={() => setEditSection('email')}
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div className="error">{err.email}</div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:w-xl">
                            <p className="font-quicksand text-white pb-2">
                                Password
                            </p>
                            <div className="flex flex-col lg:flex-row gap-3 w-full">
                                <div className="flex w-full gap-3">
                                    <div className="relative flex-1">
                                        <input
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="Password"
                                            className="w-full p-3 pr-10 font-quicksand rounded text-white border border-white bg-transparent focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            className={`absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer p-1 rounded-full transition-all duration-300 ease-in-out ${
                                                showPassword
                                                    ? 'bg-gray-600'
                                                    : 'hover:bg-gray-600'
                                            }`}
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash className="transition-all duration-300" />
                                            ) : (
                                                <FaEye className="transition-all duration-300" />
                                            )}
                                        </button>
                                    </div>
                                    <button
                                        className="lg:w-38 lg:p-3 py-1 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer font-semibold"
                                        onClick={() =>
                                            setEditSection('Password')
                                        }
                                    >
                                        Edit
                                    </button>
                                </div>
                                {/* <div className="error">{err.name}</div> naro tempat error nya di sini aja */}
                            </div>
                        </div>
                        <button className="w-38 mt-10 p-3 bg-red-600 text-white font-quicksand rounded hover:bg-red-800 transition cursor-pointer font-semibold">
                            Logout
                        </button>
                    </div>
                )}

                {editSection && editSection !== 'Password' && (
                    <div className="flex flex-col gap-4 h-full">
                        <div className="w-full">
                            <p className="font-quicksand text-white pb-2">
                                {editSection} After
                            </p>
                            <input
                                type="text"
                                value={afterValue}
                                onChange={(e) => setAfterValue(e.target.value)}
                                className="w-full p-3 font-quicksand rounded text-white border border-white focus:outline-none bg-transparent"
                            />
                        </div>
                        <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between lg:mt-auto mt-10">
                            <button
                                className="lg:w-38 p-3 bg-red-500 font-semibold text-white font-quicksand rounded hover:bg-red-700 transition cursor-pointer"
                                onClick={() => setEditSection(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="lg:w-38 p-3 bg-green-500 text-white font-semibold font-quicksand rounded hover:bg-green-700 transition cursor-pointer"
                                onClick={handleSave}
                            >
                                Save & Quit
                            </button>
                        </div>
                    </div>
                )}

                {editSection === 'Password' && (
                    <div className="flex flex-col gap-4 h-full overflow-y-auto">
                        <div>
                            <p className="text-white font-quicksand pb-2">
                                Old Password
                            </p>
                            <input
                                type="password"
                                value={passwords.oldPassword}
                                onChange={(e) =>
                                    setPasswords((prev) => ({
                                        ...prev,
                                        oldPassword: e.target.value,
                                    }))
                                }
                                className="w-full p-3 font-quicksand rounded text-white border border-white focus:outline-none bg-transparent"
                            />
                        </div>

                        <div>
                            <p className="text-white font-quicksand pb-2">
                                New Password
                            </p>
                            <input
                                type="password"
                                value={passwords.newPassword}
                                onChange={(e) =>
                                    setPasswords((prev) => ({
                                        ...prev,
                                        newPassword: e.target.value,
                                    }))
                                }
                                className="w-full p-3 font-quicksand rounded text-white border border-white focus:outline-none bg-transparent"
                            />
                        </div>

                        <div>
                            <p className="text-white font-quicksand pb-2">
                                Confirm New Password
                            </p>
                            <input
                                type="password"
                                value={passwords.confirmNewPassword}
                                onChange={(e) =>
                                    setPasswords((prev) => ({
                                        ...prev,
                                        confirmNewPassword: e.target.value,
                                    }))
                                }
                                className="w-full p-3 font-quicksand rounded text-white border border-white focus:outline-none bg-transparent"
                            />
                        </div>

                        {passwordError && (
                            <p className="text-red-400 font-quicksand">
                                {passwordError}
                            </p>
                        )}

                        <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between lg:mt-auto mt-10">
                            <button
                                className="lg:w-38 p-3 bg-red-500 font-semibold text-white font-quicksand rounded hover:bg-red-700 transition cursor-pointer"
                                onClick={() => {
                                    setEditSection(null);
                                    setPasswords({
                                        oldPassword: '',
                                        newPassword: '',
                                        confirmNewPassword: '',
                                    });
                                    setPasswordError(null);
                                }}
                            >
                                Cancel
                            </button>
                            <div className="flex gap-4">
                                <button
                                    className="lg:w-50 p-3 bg-blue-500 text-white font-semibold font-quicksand rounded hover:bg-blue-700 transition cursor-pointer"
                                    onClick={() => {
                                        // Arahkan ke halaman lupa password
                                        // Misal: navigate('/forgot-password')
                                        toast.info(
                                            'Redirecting to forgot password...',
                                        );
                                    }}
                                >
                                    I forgot my password
                                </button>
                                <button
                                    className="lg:w-44 p-3 bg-green-500 text-white font-semibold font-quicksand rounded hover:bg-green-700 transition cursor-pointer"
                                    onClick={() => {
                                        if (
                                            passwords.newPassword !==
                                            passwords.confirmNewPassword
                                        ) {
                                            setPasswordError(
                                                'New passwords do not match.',
                                            );
                                            return;
                                        }

                                        // Call your API to change password here
                                        // Example:
                                        // await axios.patch('/api/user/edit/password', passwords)

                                        toast.success('Password changed!');
                                        setEditSection(null);
                                        setPasswords({
                                            oldPassword: '',
                                            newPassword: '',
                                            confirmNewPassword: '',
                                        });
                                        setPasswordError(null);
                                    }}
                                >
                                    Update Password
                                </button>
                            </div>
                        </div>
                    </div>
                )}
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

                        <div className="p-4 text-center divide-y-1 divide-white flex flex-col">
                            <button className="p-2 cursor-pointer font-semibold text-blue-500">
                                Upload Photo
                            </button>
                            <button className="p-2 cursor-pointer font-semibold text-red-500">
                                Remove Current Photo
                            </button>
                            <button className="p-2 cursor-pointer font-semibold">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
