import React, { useState, useEffect } from 'react';
import Image1 from '../../assets/logIn/image5.webp';
import BannerLogin from '../../components/bannerLogin';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ErrorConstant from '../../util/ErrorConstant.js';
import { useDispatch } from 'react-redux';
import { setForgetPassword } from '../../stores/forgetPasswordReducer';
import { FaSpinner } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const OtpPages = () => {
    const [otpCode, setOtpCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email = useSelector((state) => state.forgetPassword.email);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!otpCode.trim()) {
            setError('OTP field cannot be empty');
            return;
        }
        toast.success('OTP verified successfully', {
            position: 'top-right',
            autoClose: 3000,
        });
        setIsLoading(true);

        try {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target));
            await axios.post('/api/auth/verify-forget-password', {
                hash: localStorage.getItem('passToken'),
                otp: data.otp,
            });
            dispatch(
                setForgetPassword({
                    otp: data.otp,
                    hash: localStorage.getItem('passToken'),
                })
            );
            // toast.success('OTP resend successfully', {
            //     position: 'top-right',
            //     autoClose: 3000,
            // });
            await navigate('/new-password');
        } catch (e) {
            const response = e?.response?.data?.payload;
            if (
                response.errCode === ErrorConstant.ERR_INVALID_FIELD ||
                response.errCode === ErrorConstant.ERR_INVALID_OTP
            ) {
                toast.error('Invalid OTP', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                return;
            } else {
                toast.error('Something went wrong', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } finally {
            setIsLoading(false); // Matikan loading setelah selesai
        }
    };

    const handleResendOTP = async (e) => {
        try {
            setCanResend(false);
            setTimer(30);
            await axios.post('/api/auth/resend-otp', {
                hash: localStorage.getItem('passToken'),
            });
            toast.success('OTP resend successfully', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (e) {
            toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };
    
    return (
        <div className="bg-[#221122] min-h-screen w-full flex items-center justify-center p-5 md:p-10">
            <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg overflow-hidden shadow-lg bg-[#252527] min-h-[650px]">
                <div className="hidden md:flex md:w-1/2 min-h-screen max-h-[650px]">
                    <BannerLogin imageSrc={Image1} />
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-10 md:px-8 flex-grow"
                >
                    <h1 className="text-2xl md:text-3xl font-inknut-antiqua text-white mb-6 text-center">
                        OTP CODE
                    </h1>
                    <p className="text-xl text-center md:text-lg font-quicksand text-white">
                        We have sent an OTP Code
                    </p>
                    <p className="text-xl text-center md:text-sm font-quicksand text-white mb-6">
                        to{' '}
                        <span className="font-bold text-[#FFA666]">
                            {email}
                        </span>
                    </p>
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="Enter OTP Code"
                            name="otp"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            className={`w-full p-3 pr-12 font-quicksand rounded text-white border ${
                                error ? 'border-red-500' : 'border-white'
                            } bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FFA666]`}
                        />
                        <div className="min-h-[20px]">
                            {error && (
                                <div className="error text-red-500 text-sm">
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-[#FFA666] text-black font-bold cursor-pointer font-quicksand rounded hover:bg-orange-500 transition flex justify-center items-center mt-2"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <FaSpinner className="animate-spin text-2xl" />
                        ) : (
                            'Submit'
                        )}
                    </button>
                    <button
                        type="button"
                        className="w-full p-3 mt-3 bg-gray-600 text-white font-bold cursor-pointer font-quicksand rounded hover:bg-gray-500 transition"
                        disabled={!canResend}
                        onClick={handleResendOTP}
                    >
                        {canResend ? 'Resend OTP' : `Resend OTP in ${timer}s`}
                    </button>
                    <p className="text-sm text-gray-400 mt-2 text-center">
                        Don't have an account yet?
                        <span className="text-[#FFA666] font-quicksand underline ml-1">
                            <Link to="/register">Register</Link>
                        </span>
                    </p>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default OtpPages;
