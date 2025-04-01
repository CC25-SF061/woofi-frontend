import React, { useState } from 'react';
import Image1 from '../../assets/logIn/image3.webp';
import BannerLogin from '../../components/bannerLogin';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ErrorConstant from '../../util/ErrorConstant';
import { FaSpinner } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setForgetEmail } from '../../stores/forgetPasswordReducer';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [errState, setErrState] = useState({ email: '' });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const dispatch = useDispatch();

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setErrState({ email: 'Email is required' });
            return;
        }

        if (!isValidEmail(email)) {
            setErrState({ email: 'Invalid email format' });
            return;
        }

        setErrState({ email: '' });
        if (attempts >= 3) {
            toast.error('Too many attempts. Try again later.', {
                position: 'top-right',
                autoClose: 5000,
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('/api/auth/forget-password', {
                email,
            });
            dispatch(setForgetEmail(email));

            toast.success(
                'If this email is registered, a reset link has been sent.',
                {
                    position: 'top-right',
                    autoClose: 3000,
                }
            );
            localStorage.setItem('passToken', response.data.hash);
            setTimeout(() => {
                navigate(`/otp-code`);
            }, 1000);
        } catch (e) {
            setAttempts(attempts + 1);
            const response = e?.response?.data?.payload;

            if (response?.errCode === ErrorConstant.ERR_INVALID_FIELD) {
                setErrState({ email: 'Email is invalid' });
            } else {
                toast.error('Something went wrong. Please try again later.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } finally {
            setIsLoading(false);
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
                        Forgot Password
                    </h1>
                    <p className="text-xl text-center md:text-lg font-quicksand text-white mb-6">
                        We will send a password reset code to your email
                    </p>

                    <div className="w-full relative">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                    <button
                        type="submit"
                        className="w-full p-3 bg-[#FFA666] text-black font-bold cursor-pointer font-quicksand rounded hover:bg-orange-500 transition flex justify-center items-center mt-2"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <FaSpinner className="animate-spin text-2xl" />
                        ) : (
                            'Send reset code'
                        )}
                    </button>

                    <p className="text-sm text-gray-400 mt-2 text-center">
                        Don't have an account yet?
                        <span className="text-[#FFA666] font-quicksand underline ml-1">
                            <Link to={'/register'}>Register</Link>
                        </span>
                    </p>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgetPassword;
