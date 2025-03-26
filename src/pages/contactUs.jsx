import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Image1 from '../assets/logIn/image4.webp';
import BannerLogin from '../components/bannerLogin';
import Logo from '../assets/navbar/logo.webp';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios, { AxiosError } from 'axios';
import ErrorConstant from '../util/ErrorConstant';

const ContactUs = () => {
    const [errState, setErrState] = useState({
        email: null,
        name: null,
        reason: null,
        message: null,
    });

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
        setErrState(() => newObjErr);
    };
    const handleSubmit = async (e) => {
        try {
            setErrState(() => ({
                email: null,
                name: null,
                reason: null,
                message: null,
            }));
            e.preventDefault();
            await axios.post(
                '/api/contact/add',
                Object.fromEntries(new FormData(e.target))
            );

            toast.success('Your message has been sent successfully!', {
                position: 'top-right',
            });
        } catch (e) {
            if (!(e instanceof AxiosError)) {
                return;
            }
            const response = e.response?.data?.payload;

            if (response?.errCode === ErrorConstant.ERR_INVALID_FIELD) {
                invalidFieldErr(response.fields);
            } else {
                toast.error('something went wrong', {
                    position: 'top-right',
                });
            }
        }
    };
    return (
        <>
            <Navbar></Navbar>
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

                        <div className="flex flex-col w-full mb-4">
                            <p className="font-quicksand text-white pb-2">
                                name
                            </p>
                            <input
                                type="text"
                                placeholder="Your Username"
                                className="w-full p-3 font-quicksand rounded text-white border border-white focus:outline-none"
                            />
                            <div className="error">{errState.name}</div>
                        </div>

                        <div className="flex flex-col w-full mb-4">
                            <p className="font-quicksand text-white pb-2">
                                Email
                            </p>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full p-3 font-quicksand rounded text-white border border-white focus:outline-none"
                            />
                            <div className="error">{errState.email}</div>
                        </div>

                        <div className="flex flex-col w-full mb-4">
                            <p className="font-quicksand text-white pb-2">
                                Reason
                            </p>
                            <input
                                placeholder="Reason for contacting us"
                                className="w-full p-3 font-quicksand rounded text-white border border-white focus:outline-none"
                            />
                            <div className="error">{errState.reason}</div>
                        </div>

                        <div className="flex flex-col w-full mb-4">
                            <p className="font-quicksand text-white pb-2">
                                Message
                            </p>
                            <textarea className="w-full p-3 font-quicksand  rounded text-white border border-white focus:outline-none" />
                            <div className="error">{errState.message}</div>
                        </div>
                        <button className="w-full p-2 bg-[#FFA666] text-white font-quicksand rounded hover:bg-orange-500 transition">
                            Submit
                        </button>
                    </form>

                    {/* Image Section */}
                    <div className="hidden md:flex md:w-1/2 min-h-screen max-h-[650px]">
                        <BannerLogin imageSrc={Image1} />
                    </div>
                </div>
            </section>
            <Footer></Footer>
            <ToastContainer />
        </>
    );
};

export default ContactUs;
