import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginModal = ({ dialogRef }) => {
    const navigate = useNavigate();

    const handleLoginNavigation = async () => {
        await navigate('/sign-in');
    };

    return (
        <dialog ref={dialogRef} className="modal font-quicksand">
            <div className="modal-box bg-[#252527]">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <motion.button
                        transition={{
                            ease: 'backOut',
                            delay: 0,
                        }}
                        whileHover={{ scale: 1.125 }}
                        className="w-fit aspect-square rounded-[360px] hover:bg-gray-700 px-2 absolute right-2 top-2"
                    >
                        ✕
                    </motion.button>
                </form>
                <h3 className="font-bold text-xl">
                    You are not{' '}
                    <span className="text-[#FFA666] font-bold">Logged In</span>,
                    yet
                </h3>
                <p className="pb-6 font-light tracking-wide">
                    Login to continue
                </p>
                <motion.button
                    transition={{
                        ease: 'backOut',
                        delay: 0,
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-md hover:bg-[#FFA66622] border-solid border-[#FFA666] text-[#FFA666] border-[1px] px-2 py-1 font-semibold tracking-wider"
                    onClick={handleLoginNavigation}
                >
                    Login right away
                </motion.button>
            </div>
        </dialog>
    );
};

export default LoginModal;
