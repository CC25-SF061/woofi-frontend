import React, { useState } from 'react';
import Image1 from '../../assets/logIn/image2.webp';
import BannerLogin from '../../components/bannerLogin';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios, { AxiosError } from 'axios';
import ErrorConstant from '../../util/ErrorConstant';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setData } from '../../stores/userReducer';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errState, setErrState] = useState({
        name: '',
        username: '',
        password: '',
        passwordConfirmation: '',
        email: '',
    });

    const showError = (message) => {
        toast.error(message, {
            position: 'top-right',
            autoClose: 3000,
        });
    };

    const invalidFieldErr = (arr) => {
        const newObjErr = {
            name: '',
            username: '',
            password: '',
            passwordConfirmation: '',
            email: '',
        };
        arr.forEach((element) => {
            if (
                Object.prototype.hasOwnProperty.call(newObjErr, element.path[0])
            ) {
                newObjErr[element.path[0]] = element.message;
            }
        });
        setErrState(newObjErr);
    };

    const submit = async (e) => {
        e.preventDefault();
        setErrState({
            name: '',
            username: '',
            password: '',
            passwordConfirmation: '',
            email: '',
        });

        const formData = new FormData(e.target);
        const request = Object.fromEntries(formData.entries());

        let isValid = true;
        const newErrState = { ...errState };

        Object.keys(request).forEach((key) => {
            if (!request[key].trim()) {
                newErrState[key] = `${
                    key.charAt(0).toUpperCase() + key.slice(1)
                } is required.`;
                isValid = false;
            }
        });

        setErrState(newErrState);

        if (!isValid) {
            return;
        }

        try {
            const response = (await axios.post('/api/auth/register', request))
                .data;
            e.target.reset();
            dispatch(setData(response.data));
            await navigate('/profile');
        } catch (error) {
            if (
                !(error instanceof AxiosError) ||
                !error.response?.data?.payload
            ) {
                showError('An unexpected error occurred.');
                return;
            }

            const err = error.response.data.payload;

            if (err.errCode === ErrorConstant.ERR_INVALID_FIELD) {
                invalidFieldErr(err.fields);
                showError('Invalid input fields. Please check your data.');
            }

            if (err.errCode === ErrorConstant.ERR_EMAIL_ALREADY_USED) {
                setErrState((prev) => ({
                    ...prev,
                    email: 'Email Already Used',
                }));
                showError('Email is already in use.');
            }

            if (err.errCode === ErrorConstant.ERR_USERNAME_ALREADY_USED) {
                setErrState((prev) => ({
                    ...prev,
                    username: 'Username Already Used',
                }));
                showError('Username is already taken.');
            }
        }
    };

    const loginGoogle = async (accessToken) => {
        try {
            const response = (
                await axios.post('/api/auth/login/google', {
                    token: accessToken,
                })
            ).data;
            dispatch(setData(response.data));
            localStorage.setItem('token', response.data.token);
            //lakukan sesuatu jika berhasil kurang lebih sama dengan yang diatas
            await navigate('/profile');
        } catch (e) {
            console.log(e);
        }
    };
    const googleRegister = useGoogleLogin({
        onSuccess: async (credentialsResponse) => {
            try {
                const response = (
                    await axios.post('/api/auth/register/google', {
                        token: credentialsResponse.access_token,
                    })
                ).data;
                dispatch(setData(response.data));
                localStorage.setItem('token', response.data.token);
                await navigate('/profile');
            } catch (e) {
                if (!(e instanceof AxiosError)) {
                    return;
                }
                const response = e.response.data.payload;

                if (
                    response.errCode ==
                    ErrorConstant.ERR_OAUTH_PROVIDER_ALREADY_EXIST
                ) {
                    await loginGoogle(credentialsResponse.access_token);
                }
            }
        },
        onError: () => {
            console.log('Login Failed');
        },
        scope: 'profile email',
    });
    return (
        <div className="bg-[#221122] min-h-screen w-full flex items-center justify-center p-5 md:p-10">
            <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg overflow-hidden shadow-lg bg-[#252527] min-h-[650px]">
                {/* Image Section */}
                <div className="hidden md:flex md:w-1/2 min-h-screen">
                    <BannerLogin imageSrc={Image1} />
                </div>

                {/* Form Section */}
                <form
                    className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-10 md:px-8 flex-grow"
                    onSubmit={submit}
                >
                    <h1 className="text-2xl md:text-3xl font-inknut-antiqua text-white mb-6 text-center">
                        Register Account
                    </h1>

                    <div className="mb-2 w-full">
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            className={`w-full p-3 pr-12 font-quicksand rounded text-white border ${
                                errState.username
                                    ? 'border-red-500'
                                    : 'border-white'
                            } bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FFA666]`}
                        />
                        <div className="min-h-[20px]">
                            {errState.username && (
                                <div className="error text-red-400 text-sm">
                                    {errState.username}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-2 w-full">
                        <input
                            type="text"
                            placeholder="Display Name"
                            name="name"
                            className={`w-full p-3 pr-12 font-quicksand rounded text-white border ${
                                errState.name
                                    ? 'border-red-500'
                                    : 'border-white'
                            } bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FFA666]`}
                        />
                        <div className="min-h-[20px]">
                            {errState.name && (
                                <div className="error text-red-400 text-sm">
                                    {errState.name}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-2 w-full">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            className={`w-full p-3 pr-12 font-quicksand rounded text-white border ${
                                errState.email
                                    ? 'border-red-500'
                                    : 'border-white'
                            } bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FFA666]`}
                        />
                        <div className="min-h-[20px]">
                            {errState.email && (
                                <div className="error text-red-400 text-sm">
                                    {errState.email}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-2 w-full relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            className={`w-full p-3 pr-12 font-quicksand rounded text-white border ${
                                errState.password
                                    ? 'border-red-500'
                                    : 'border-white'
                            } bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FFA666]`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/3 -translate-y-1/2 text-white cursor-pointer"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <div className="min-h-[20px]">
                            {errState.password && (
                                <div className="error text-red-500 text-sm">
                                    {errState.password}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="relative w-full mx-auto mb-2">
                        <input
                            type={showPassword1 ? 'text' : 'password'}
                            placeholder="Password confirmation"
                            name="passwordConfirmation"
                            className={`w-full p-3 pr-12 font-quicksand rounded text-white border ${
                                errState.passwordConfirmation
                                    ? 'border-red-500'
                                    : 'border-white'
                            } bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FFA666]`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword1(!showPassword1)}
                            className="absolute right-3 top-1/3 -translate-y-1/2 text-white cursor-pointer"
                        >
                            {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <div className="min-h-[20px]">
                            {errState.passwordConfirmation && (
                                <div className="error text-red-500 text-sm">
                                    {errState.passwordConfirmation}
                                </div>
                            )}
                        </div>
                    </div>

                    <button className="w-full p-3 bg-[#FFA666] text-black font-bold cursor-pointer font-quicksand rounded hover:bg-orange-500 transition">
                        Register
                    </button>

                    <div className="w-full flex items-center my-4">
                        <hr className="flex-grow border-gray-400" />
                        <span className="mx-2 text-gray-400">or</span>
                        <hr className="flex-grow border-gray-400" />
                    </div>

                    <button
                        type="button"
                        onClick={googleRegister}
                        className="w-full flex items-center justify-center p-3 bg-white text-black font-quicksand rounded shadow hover:bg-gray-200 transition mb-4 cursor-pointer"
                    >
                        <FcGoogle className="text-2xl mr-2" />
                        Register with Google
                    </button>

                    <p className="text-sm text-gray-400 mt-2">
                        Already have an account?{' '}
                        <Link
                            to="/sign-in"
                            className="text-[#FFA666] font-quicksand underline cursor-pointer"
                        >
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
