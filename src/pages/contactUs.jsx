import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Image1 from '../assets/logIn/image4.webp';
import BannerLogin from '../components/bannerLogin';
import Logo from '../assets/navbar/logo.webp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios, { AxiosError } from 'axios';
import ErrorConstant from '../util/errorConstant';
import { FaSpinner } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

const ContactUs = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [formState, setFormData] = useState({
        email: '',
        name: '',
        reason: searchParams.get('reason') || '',
        message: '',
        type: searchParams.get('type') || null,
        reply_id: parseInt(searchParams.get('reply_id')) || null,
    });
    useEffect(() => {
        setFormData((state) => ({
            ...state,
            reason: searchParams.get('reason') || '',
            type: searchParams.get('type') || null,
            reply_id: parseInt(searchParams.get('reply_id')) || null,
        }));
    }, [searchParams]);
    const [errState, setErrState] = useState({
        email: null,
        name: null,
        reason: null,
        message: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formState, [e.target.name]: e.target.value });
        setErrState({ ...errState, [e.target.name]: null }); // Hapus error saat mengetik
    };

    const invalidFieldErr = (arr) => {
        const newObjErr = {
            email: null,
            name: null,
            reason: null,
            message: null,
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
        e.preventDefault();
        setIsSubmitting(true);

        const newErrState = { ...errState };
        let isValid = true;

        setErrState(newErrState);

        if (!isValid) {
            setIsSubmitting(false);
            return;
        }

        try {
            setErrState({
                email: null,
                name: null,
                reason: null,
                message: null,
            });
            await axios.post('/api/contact/add', formState);

            toast.success('Your message has been sent successfully!', {
                position: 'top-right',
            });

            setFormData({
                email: '',
                name: '',
                message: '',
                reason: searchParams.get('reason') || '',
                type: searchParams.get('type') || null,
                reply_id: parseInt(searchParams.get('reply_id')) || null,
            });
        } catch (e) {
            console.log(e);
            if (!(e instanceof AxiosError)) {
                return;
            }
            const response = e.response?.data?.payload;
            if (response?.errCode === ErrorConstant.ERR_INVALID_FIELD) {
                invalidFieldErr(response.fields);
                toast.error('Please check the form fields for errors.', {
                    position: 'top-right',
                });
            } else {
                toast.error('Something went wrong. Please try again later.', {
                    position: 'top-right',
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <section className="bg-[#221122] min-h-screen w-full flex items-center justify-center px-5 pb-5 pt-20 md:px-10 md:pb-10 md:pt-25">
                <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg overflow-hidden shadow-lg bg-[#252527] min-h-[650px]">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-10 md:px-8 flex-grow"
                    >
                        <img
                            src={Logo}
                            alt="Logo Woofi"
                            className="w-36 mb-5 lg:hidden"
                        />
                        <h1 className="text-2xl md:text-3xl font-inknut-antiqua text-white mb-6 text-center">
                            Get In Touch
                        </h1>

                        <div className="flex flex-col w-full mb-2">
                            <p className="font-quicksand text-white pb-2">
                                Name
                            </p>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Username"
                                value={formState.name}
                                onChange={handleChange}
                                className={`w-full p-3 pr-12 font-quicksand rounded text-white border ${
                                    errState.name
                                        ? 'border-red-500'
                                        : 'border-white'
                                } bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FFA666]`}
                            />
                            <div className="min-h-[20px]">
                                {errState.name && (
                                    <div className="error text-red-500 text-sm">
                                        {errState.name}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col w-full mb-2">
                            <p className="font-quicksand text-white pb-2">
                                Email
                            </p>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formState.email}
                                onChange={handleChange}
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

                        <div className="flex flex-col w-full mb-2">
                            <p className="font-quicksand text-white pb-2">
                                Reason
                            </p>
                            <input
                                type="text"
                                name="reason"
                                placeholder="Reason for contacting us"
                                value={formState.reason}
                                // readOnly={formData.reason !== ''}
                                onChange={handleChange}
                                className={`w-full p-3 pr-12 font-quicksand rounded text-white border ${
                                    errState.reason
                                        ? 'border-red-500'
                                        : 'border-white'
                                } bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FFA666]`}
                            />
                            <div className="min-h-[20px]">
                                {errState.reason && (
                                    <div className="error text-red-500 text-sm">
                                        {errState.reason}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col w-full mb-2">
                            <p className="font-quicksand text-white pb-2">
                                Message
                            </p>
                            <textarea
                                name="message"
                                placeholder="Your message"
                                value={formState.message}
                                onChange={handleChange}
                                className={`w-full p-3 pr-12 font-quicksand rounded text-white border ${
                                    errState.message
                                        ? 'border-red-500'
                                        : 'border-white'
                                } bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FFA666]`}
                            />
                            <div className="min-h-[20px]">
                                {errState.message && (
                                    <div className="error text-red-500 text-sm">
                                        {errState.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            className="w-full mt-6 p-2 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition cursor-pointer font-bold flex items-center justify-center"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <FaSpinner className="animate-spin text-2xl" />
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </form>

                    <div className="hidden md:flex md:w-1/2 min-h-screen ">
                        <BannerLogin imageSrc={Image1} />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ContactUs;
