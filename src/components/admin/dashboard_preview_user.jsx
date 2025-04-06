import React from 'react';
import LogoUsers from '../../assets/icons/admin/users.svg';
import LogoDatabase from '../../assets/icons/admin/database.svg';

const Dashboard = () => {
    const rawUserData = [
        { month: 'January', color: '#8979FF', amount: 350 },
        { month: 'Febuary', color: '#FF928A', amount: 215 },
        { month: 'March', color: '#3CC3DF', amount: 425 },
        { month: 'April', color: '#FFAE4C', amount: 735 },
        { month: 'May', color: '#537FF1', amount: 405 },
        { month: 'June', color: '#6FD195', amount: 120 },
        { month: 'July', color: '#8C63DA', amount: 270 },
        { month: 'August', color: '#2BB7DC', amount: 800 },
        { month: 'September', color: '#1F94FF', amount: 1005 },
        { month: 'October', color: '#F4CF3B', amount: 405 },
        { month: 'November', color: '#55C4AE', amount: 350 },
        { month: 'December', color: '#6186CC', amount: 656 },
    ];

    const getTotalUsers = () =>
        rawUserData.reduce((acc, v) => acc + v.amount, 0);

    const generateUserDataPieChart = () => {
        // Count percentages
        const total = getTotalUsers();
        const percentages = rawUserData.map((v) => {
            return { ...v, percent: ((v.amount / total) * 100.0).toFixed(1) };
        });

        // Generate conic gradient slices (output => 'blue 0%, blue 20%, red 20%, red 100%')
        const css_pie_slices = percentages.reduce((acc, v, i, context) => {
            const accPercent =
                i === 0
                    ? 0
                    : context
                          .slice(0, i)
                          .reduce((acc, v) => acc + Number(v.percent), 0);
            const ceilPercent = Number(accPercent) + Number(v.percent);
            switch (i) {
                case 0: // first slice
                    return acc + `${v.color} 0%, ${v.color} ${v.percent}%`;
                default: // rest of the slice
                    return (
                        acc +
                        `, ${v.color} ${accPercent}%, ${v.color} ${ceilPercent}%`
                    );
            }
        }, '');

        // return css style
        return {
            background: `conic-gradient(${css_pie_slices})`,
        };
    };
    console.log(generateUserDataPieChart());

    return (
        <div className="relative flex flex-col items-center p5-5 gap-4 pb-5 w-full font-quicksand">
            <div className="py-8 flex flex-col w-4/6 items-center bg-[#252527] rounded-md shadow-lg mb-2">
                <img src={LogoUsers} alt="Users Icon" className="w-8 mb-1" />
                <h2 className="text-[#aaa] tracking-wide text-xl">
                    Overview User Data
                </h2>
            </div>

            {/* Pie Chart Diagram */}
            <div className="flex items-center justify-center p-5 bg-[#252527] rounded-md w-4/6 aspect-video">
                <div className="flex flex-row justify-around items-center p-5 w-full h-full bg-[#14141C] rounded-md">
                    <div className="relative flex items-center justify-center bg-black rounded-[360rem] border-black border-[2px] w-1/2 aspect-square z-0">
                        <div
                            className="absolute inset-0 rounded-[360rem]"
                            style={generateUserDataPieChart()}
                        ></div>
                        <div className="flex items-center justify-center absolute w-20 lg:w-35 aspect-square rounded-[360rem] bg-[#252527]">
                            <p className="text-3xl font-bold tracking-wider">
                                {getTotalUsers()}
                            </p>
                        </div>
                    </div>
                    <div className="grid md:grid-rows-6 lg:grid-rows-8 grid-cols-2 grid-flow-col justify-around h-fit gap-2 text-sm lg:text-base">
                        {rawUserData.map((v) => (
                            <div className="flex flex-row items-center gap-3">
                                <div
                                    className={`rounded-[360rem] w-2 aspect-square`}
                                    style={{ backgroundColor: v.color }}
                                ></div>
                                <p>{v.month}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
