import React, { useEffect, useState } from 'react';
import Image1 from '../../assets/logIn/image1.webp';
import BannerLogin from '../../components/bannerLogin';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import axios, { AxiosError } from 'axios';
import ErrorConstant from '../../util/ErrorConstant';
import { ErrorToast } from '../../components/toast';
import {
    GoogleOAuthProvider,
    useGoogleLogin,
    useGoogleOneTapLogin,
} from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';

const SignIn = () => {
    const [invalidLoginState, setInvalidLoginState] = useState(null);
    const [errState, setErrState] = useState({
        password: null,
        email: null,
    });
    const invalidLogin = () => {
        setInvalidLoginState('Invalid Email or password');
        setTimeout(() => {
            setInvalidLoginState(null);
        }, 9000);
    };
    const invalidFieldErr = (arr) => {
        const newObjErr = {
            password: null,
            email: null,
        };
        for (const element of arr) {
            if (newObjErr.hasOwnProperty(element.path[0])) {
                newObjErr[element.path[0]] = element.message;
            }
        }
        setErrState((state) => ({ ...state, ...newObjErr }));
    };
    const submit = async (e) => {
        e.preventDefault();
        setInvalidLoginState(null);
        setErrState((state) => ({
            ...state,
            password: null,
            email: null,
        }));

        const request = Object.fromEntries(new FormData(e.target));
        try {
            const response = await axios.post('/api/auth/login', request);

            //lakukan sesuatu ketika sukses
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
        }
    };
    const createUserGoogle = async (accessToken) => {
        try {
            const response = (
                await axios.post('/api/auth/register/google', {
                    token: accessToken,
                })
            ).data;
            localStorage.setItem('accessToken', response.data.token);

            //lakukan sesuatu jika berhasil
        } catch (e) {
            console.log(e);
        }
    };
    const googleLogin = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            try {
                const response = (
                    await axios.post('/api/auth/login/google', {
                        token: credentialResponse.access_token,
                    })
                ).data;
                localStorage.setItem('accessToken', response.data.token);
                //lakukan sesuatu jika berhasil kurang lebih sama dengan yang diatas
            } catch (e) {
                if (!(e instanceof AxiosError)) {
                    return;
                }
                const response = e.response.data.payload;
                if (response.errCode === ErrorConstant.ERR_USER_NOT_FOUND) {
                    await createUserGoogle(credentialResponse.access_token);
                }
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

                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="w-full p-3 font-quicksand mb-4 rounded text-white border border-white bg-transparent focus:outline-none"
                    />
                    <div className="error">{errState.email}</div>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="w-full p-3 font-quicksand mb-4 rounded text-white border border-white bg-transparent focus:outline-none"
                    />
                    <div className="error">{errState.password}</div>

                    <button className="w-full p-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition">
                        Login
                    </button>

                    <div className="w-full flex items-center my-4">
                        <hr className="flex-grow border-gray-400" />
                        <span className="mx-2 text-gray-400">or</span>
                        <hr className="flex-grow border-gray-400" />
                    </div>

                    <button
                        onClick={googleLogin}
                        type="button"
                        className="w-full flex items-center justify-center p-3 bg-white text-black font-quicksand rounded shadow hover:bg-gray-200 transition mb-4"
                    >
                        <FcGoogle className="text-2xl mr-2" /> Sign in with
                        Google
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
                <div className="hidden md:flex md:w-1/2 min-h-screen max-h-[650px]">
                    <BannerLogin imageSrc={Image1} />
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default SignIn;
