import React, { useState } from 'react';
import Image1 from '../../assets/logIn/image2.webp';
import BannerLogin from '../../components/bannerLogin';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios, { AxiosError } from 'axios';
import ErrorConstant from '../../util/ErrorConstant';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [errState, setErrState] = useState({
        name: null,
        username: null,
        password: null,
        passwordConfirmation: null,
        email: null,
    });
    const invalidFieldErr = (arr) => {
        const newObjErr = {
            name: null,
            username: null,
            password: null,
            passwordConfirmation: null,
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
        setErrState((state) => ({
            ...state,
            name: null,
            username: null,
            password: null,
            passwordConfirmation: null,
            email: null,
        }));
        const request = Object.fromEntries(new FormData(e.target));
        try {
            const response = await axios.post('/api/auth/register', request);

            //lakukan sesuatu ketika sukses
        } catch (e) {
            if (!(e instanceof AxiosError)) {
                return;
            }

            const err = e.response.data.payload;

            if (err.errCode === ErrorConstant.ERR_INVALID_FIELD) {
                invalidFieldErr(err.fields);
            }

            if (err.errCode === ErrorConstant.ERR_EMAIL_ALREADY_USED) {
                setErrState((state) => ({
                    ...state,
                    email: 'Email Already Used',
                }));
            }

            if (err.errCode === ErrorConstant.ERR_USERNAME_ALREADY_USED) {
                setErrState((state) => ({
                    ...state,
                    username: 'Username Already Used',
                }));
            }
        }
    };
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

                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        className="w-full p-3 font-quicksand mb-4 rounded text-white border border-white bg-transparent focus:outline-none"
                    />
                    <div className="error">{errState.username}</div>

                    <input
                        type="text"
                        placeholder="Display Name"
                        name="name"
                        className="w-full p-3 font-quicksand mb-4 rounded text-white border border-white bg-transparent focus:outline-none"
                    />
                    <div className="error">{errState.name}</div>

                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="w-full p-3 font-quicksand mb-4 rounded text-white border border-white bg-transparent focus:outline-none"
                    />
                    <div className="error">{errState.email}</div>

                    <div className="relative w-full mx-auto mb-4">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            className="w-full p-3 pr-10 font-quicksand rounded text-white border border-white bg-transparent focus:outline-none"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <div className="error">{errState.password}</div>
                    </div>

                    <div className="relative w-full mx-auto mb-4">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password confirmation"
                            name="passwordConfirmation"
                            className="w-full p-3 pr-10 font-quicksand rounded text-white border border-white bg-transparent focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword1(!showPassword1)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <div className="error">
                            {errState.passwordConfirmation}
                        </div>
                    </div>

                    <button className="w-full p-3 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition">
                        Register
                    </button>

                    <div className="w-full flex items-center my-4">
                        <hr className="flex-grow border-gray-400" />
                        <span className="mx-2 text-gray-400">or</span>
                        <hr className="flex-grow border-gray-400" />
                    </div>

                    <button className="w-full flex items-center justify-center p-3 bg-white text-black font-quicksand rounded shadow hover:bg-gray-200 transition mb-4">
                        <FcGoogle className="text-2xl mr-2" />
                        Register with Google
                    </button>

                    <p className="text-sm text-gray-400 mt-2">
                        Already have an account{' '}
                        <Link
                            to={'/sign-in'}
                            className="text-[#FFA666] font-quicksand underline cursor-pointer"
                        >
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
