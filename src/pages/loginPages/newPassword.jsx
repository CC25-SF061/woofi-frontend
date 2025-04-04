import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Image1 from '../../assets/logIn/image3.webp';
import BannerLogin from '../../components/bannerLogin';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosError } from 'axios';
import ErrorConstant from '../../util/ErrorConstant.js';
import { setForgetPassword } from '../../stores/forgetPasswordReducer';

const NewPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [errors, setErrState] = useState({
        password: null,
        passwordConfirmation: null,
    });
    const dispatch = useDispatch();
    const forgetPassword = useSelector((state) => state.forgetPassword);
    const navigate = useNavigate();

    useEffect(() => {
        if (!forgetPassword.otp) {
            navigate('/');
        }
    }, []);
    const invalidFieldErr = (arr) => {
        const newObjErr = {
            password: null,
            passwordConfirmation: null,
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
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setErrState(() => ({
                password: null,
                passwordConfirmation: null,
            }));
            const { password, passwordConfirmation } = Object.fromEntries(
                new FormData(e.target),
            );
            await axios.post('/api/auth/reset-password', {
                hash: forgetPassword.hash || ' ',
                otp: forgetPassword.otp || ' ',
                password,
                passwordConfirmation,
            });

            toast.success('Password reset successfully!', {
                position: 'top-right',
                autoClose: 3000,
            });
            dispatch(setForgetPassword({ hash: null, otp: null }));
            setTimeout(async () => navigate('/sign-in'), 1500);
        } catch (e) {
            if (!(e instanceof AxiosError)) {
                return;
            }
            const response = e?.response?.data?.payload;

            if (response?.errCode === ErrorConstant.ERR_INVALID_FIELD) {
                return invalidFieldErr(response.fields);
            }

            if (response?.errCode === ErrorConstant.ERR_INVALID_OTP) {
                return toast.error('Invalid OTP!', {
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

    return (
        <div className="bg-[#221122] min-h-screen flex items-center justify-center p-5 md:p-10">
            <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg overflow-hidden shadow-lg bg-[#252527] min-h-[650px]">
                <div className="hidden md:flex md:w-1/2">
                    <BannerLogin imageSrc={Image1} />
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-10 md:px-8"
                >
                    <h1 className="text-2xl md:text-3xl font-inknut-antiqua text-white mb-4 text-center">
                        New Password
                    </h1>
                    <p className="text-lg text-center font-quicksand text-white mb-6">
                        Create your New Password
                    </p>

                    <div className="mb-2 w-full">
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="New Password"
                                className={`w-full p-3 pr-12 font-quicksand rounded text-white border ${
                                    errors.password
                                        ? 'border-red-500'
                                        : 'border-white'
                                } bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FFA666]`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className="min-h-[20px]">
                            {errors.password && (
                                <div className="error text-red-500 text-sm">
                                    {errors.password}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-2 w-full">
                        <div className="relative">
                            <input
                                type={showPassword2 ? 'text' : 'password'}
                                name="passwordConfirmation"
                                placeholder="Confirm New Password"
                                className={`w-full p-3 pr-12 font-quicksand rounded text-white border ${
                                    errors.password2
                                        ? 'border-red-500'
                                        : 'border-white'
                                } bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FFA666]`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword2(!showPassword2)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
                            >
                                {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className="min-h-[20px]">
                            {errors.passwordConfirmation && (
                                <div className="error text-red-500 text-sm">
                                    {errors.passwordConfirmation}
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-[#FFA666] text-black font-bold font-quicksand rounded hover:bg-orange-500 transition"
                    >
                        Reset Password
                    </button>

                    <p className="text-sm text-gray-400 mt-4 text-center">
                        Don't have an account yet?{' '}
                        <Link
                            to="/register"
                            className="text-[#FFA666] font-quicksand underline"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default NewPassword;
