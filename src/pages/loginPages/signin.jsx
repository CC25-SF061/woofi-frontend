import React, { useState } from 'react';
import Image1 from '../../assets/logIn/image1.webp';
import BannerLogin from '../../components/bannerLogin';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios, { AxiosError } from 'axios';
import ErrorConstant from '../../util/ErrorConstant';
import { ErrorToast } from '../../components/toast';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setData } from '../../stores/userReducer';
import { FaSpinner } from 'react-icons/fa';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [invalidLoginState, setInvalidLoginState] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingGoogle, setLoadingGoogle] = useState(false);

    const [errState, setErrState] = useState({
        password: null,
        email: null,
    });

    const invalidLogin = () => {
        toast.error('Invalid Email or Password', {
            position: 'top-right',
            autoClose: 3000,
        });
    };

    const invalidFieldErr = (arr) => {
        const newObjErr = {
            password: null,
            email: null,
        };
        for (const element of arr) {
            if (
                Object.prototype.hasOwnProperty.call(newObjErr, element.path[0])
            ) {
                newObjErr[element.path[0]] = element.message;
            }
        }
        setErrState((state) => ({ ...state, ...newObjErr }));
    };

    const submit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setInvalidLoginState(null);
        setErrState((state) => ({
            ...state,
            password: null,
            email: null,
        }));

        const request = Object.fromEntries(new FormData(e.target));
        try {
            const response = await axios.post('/api/auth/login', request, {
                withCredentials: true,
            });
            //lakukan sesuatu ketika sukses
            dispatch(setData(response.data.data));
            await navigate('/profile');
        } catch (e) {
            if (!(e instanceof AxiosError)) {
                return;
            }

            const err = e.response.data.payload;

            if (err.errCode === ErrorConstant.ERR_INVALID_FIELD) {
                invalidFieldErr(err.fields);
            }

            if (err.errCode === ErrorConstant.ERR_INVALID_LOGIN) {
                invalidLogin();
            }
        } finally {
            setIsLoading(false);
        }
    };

    const createUserGoogle = async (accessToken) => {
        try {
            const response = await axios.post(
                '/api/auth/register/google',
                {
                    token: accessToken,
                },
                { withCredentials: true }
            );
            localStorage.setItem('token', response.data.data.token);
            dispatch(setData(response.data.data));

            //lakukan sesuatu jika berhasil
            await navigate('/profile');
        } catch (e) {
            console.log(e);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            setLoadingGoogle(true);
            try {
                const response = await axios.post(
                    '/api/auth/login/google',
                    {
                        token: credentialResponse.access_token,
                    },
                    { withCredentials: true }
                );

                localStorage.setItem('token', response.data.data.token);
                dispatch(setData(response.data.data));

                //lakukan sesuatu jika berhasil kurang lebih sama dengan yang diatas
                await navigate('/profile');
            } catch (e) {
                if (!(e instanceof AxiosError)) {
                    return;
                }
                const response = e.response.data.payload;
                if (response.errCode === ErrorConstant.ERR_USER_NOT_FOUND) {
                    await createUserGoogle(credentialResponse.access_token);
                }
            } finally {
                setLoadingGoogle(false);
            }
        },
        onError: () => {
            console.log('Login Failed');
        },
        scope: 'profile email',
    });

    return (
        <section className="bg-[#221122] min-h-screen w-full flex items-center justify-center p-5 md:p-10">
            {invalidLoginState && <ErrorToast message={invalidLoginState} />}
            <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg overflow-hidden shadow-lg bg-[#252527] min-h-[650px]">
                {/* Form Section */}
                <form
                    className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-10 md:px-8 flex-grow"
                    onSubmit={submit}
                >
                    <h1 className="text-2xl md:text-3xl font-inknut-antiqua text-white mb-6 text-center">
                        Login
                    </h1>

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
                                <div className="error text-red-500 text-sm">
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

                    <button 
                        className="w-full p-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer flex justify-center font-bold"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <FaSpinner className="animate-spin text-white text-2xl" />
                        ) : (
                            'Login'
                        )}
                    </button>

                    <div className="w-full flex items-center my-4">
                        <hr className="flex-grow border-gray-400" />
                        <span className="mx-2 text-gray-400">or</span>
                        <hr className="flex-grow border-gray-400" />
                    </div>

                    <button
                        onClick={googleLogin}
                        type="button"
                        className="w-full flex items-center justify-center p-3 bg-white text-black font-quicksand rounded shadow hover:bg-gray-300 transition mb-4 cursor-pointer font-bold"
                        disabled={loadingGoogle}
                    >
                        {loadingGoogle ? (
                            <FaSpinner className="animate-spin text-xl" />
                        ) : (
                            <>
                                <FcGoogle className="text-2xl mr-2" /> Sign in with Google
                            </>
                        )}
                    </button>

                    <Link
                        to="/forget-password"
                        className="text-sm font-bold text-[#FFA666] font-quicksand underline mt-4"
                    >
                        Forgot password?
                    </Link>
                    <p className="text-sm text-gray-400 mt-2 text-center">
                        Don't have an account yet?
                        <Link
                            to="/register"
                            className="text-[#FFA666] font-quicksand underline ml-1"
                        >
                            Register
                        </Link>
                    </p>
                </form>

                {/* Image Section */}
                <div className="hidden md:flex md:w-1/2 min-h-screen">
                    <BannerLogin imageSrc={Image1} />
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default SignIn;
