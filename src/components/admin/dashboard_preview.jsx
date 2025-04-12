import React from 'react';
import LogoUsers from '../../assets/icons/admin/users.svg';
import LogoDatabase from '../../assets/icons/admin/database.svg';

const Dashboard = ({ userCount, destinationCount }) => {
    // const users_count = '24.3k';
    // const destinations_count = '554';

    return (
        <div className="flex flex-row items-stretch  p-6 pt-28  gap-8 flex-wrap md:flex-nowrap  justify-center w-full font-quicksand whitespace-nowrap">
            <div className="flex flex-col items-center p-7 basis-0 grow lg:px-24 gap-1 rounded-md shadow-lg bg-[#252527] text-[#aaa] text-lg">
                <img src={LogoUsers} alt="Users Icon" className="w-8 mb-3" />
                <p>Active Users</p>
                <p className="font-semibold text-4xl tracking-wider">
                    {userCount || 0}
                </p>
            </div>
            <div className="flex flex-col items-center p-7 lg:px-24 basis-0 grow gap-1 rounded-md shadow-lg bg-[#252527] text-[#aaa] text-lg">
                <img
                    src={LogoDatabase}
                    alt="Database Icon"
                    className="w-7 mb-2"
                />
                <p>Total Destinations</p>
                <p className="font-semibold text-4xl tracking-wider">
                    {destinationCount || 0}
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
