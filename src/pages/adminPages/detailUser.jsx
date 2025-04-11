import React from 'react';
import Navbar from '../../components/navbar';
import ProfileIcon from '../../assets/navbar/Icon.webp';

const DetailUser = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#221122] pt-24 px-5 md:px-10 text-white">
                <div className="max-w-3xl mx-auto bg-[#252527] rounded-lg shadow-lg p-8">
                    {/* Profile Section */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <img
                            className="rounded-full w-24 h-24 mb-3"
                            src={ProfileIcon}
                            alt="Profile"
                        />
                        <h1 className="text-2xl font-bold">user53</h1>
                        <p className="text-gray-400">user53</p>
                    </div>

                    <hr className="border-gray-600 mb-6" />

                    {/* Account Info */}
                    <h2 className="text-xl font-semibold mb-6 text-center">Data destination</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-5 w-full px-3 pb-5'>
                        {/* List card here */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailUser;
