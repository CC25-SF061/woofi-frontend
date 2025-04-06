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
    const getModeUser = () =>
        [...rawUserData].sort((a, b) => b.amount - a.amount)[0];

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

    const totalBlockChartIndices = 7;
    const generateUserDataBlockChart = {
        monthBlock: (v, i, context) => {
            return (
                <div
                    className="flex items-end h-full bg-[#D6DBED22]"
                    style={{
                        width: `calc(${100.0 / context.length}% - 2px)`,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: v.color + '77',
                            borderColor: v.color,
                            borderTopWidth: '2px',
                            width: '100%',
                            height: `${(v.amount / getModeUser().amount) * 100.0}%`,
                        }}
                    ></div>
                </div>
            );
        },
        countIndices: (index) => {
            const totalUser = getTotalUsers();
            return Math.round(
                (totalUser / (totalBlockChartIndices - 1)) *
                    Math.min(index - 1, totalBlockChartIndices),
            );
        },
    };

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
                    <div className="relative flex items-center justify-center bg-black rounded-[360rem] border-black border-[2px] w-1/3 lg:w-1/2 aspect-square z-0">
                        <div
                            className="absolute inset-0 rounded-[360rem]"
                            style={generateUserDataPieChart()}
                        ></div>
                        <div className="flex items-center justify-center absolute w-16 lg:w-35 aspect-square rounded-[360rem] bg-[#252527]">
                            <p className="text-md lg:text-3xl font-bold tracking-wider">
                                {getTotalUsers()}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-rows-8 lg:grid-rows-8 grid-cols-2 grid-flow-col gap-2 text-xs lg:text-sm">
                        {rawUserData.map((v) => (
                            <div className="flex flex-row items-center gap-3">
                                <div
                                    className={`rounded-[360rem] w-2 aspect-square`}
                                    style={{ backgroundColor: v.color }}
                                ></div>
                                <p>
                                    {v.month}{' '}
                                    <span
                                        className="font-light "
                                        style={{ color: v.color }}
                                    >
                                        ({v.amount})
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Block Chart Diagram */}
            <div className="flex items-center justify-center p-5 bg-[#252527] rounded-md w-4/6">
                <div className="flex flex-col justify-around items-center p-5 w-full h-full bg-[#14141C] rounded-md">
                    <div className="relative flex items-end justify-center w-full aspect-video">
                        {/* JANGAN DISENTUH ( CALL 0895394545465 ) */}
                        <div
                            className="h-full w-full items-end"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 45fr',
                                gridTemplateRows: '1fr repeat(6, 100fr)',
                            }}
                        >
                            {Array.from({
                                length: totalBlockChartIndices * 2,
                            }).map((v, i) => {
                                return i % 2 === 0 ? (
                                    <p className="font-light text-xs text-[#ccc] w-full h-[0.5rem] text-right px-1">
                                        {generateUserDataBlockChart.countIndices(
                                            totalBlockChartIndices - i / 2,
                                        )}
                                    </p>
                                ) : i === 1 ? (
                                    <div className="w-full h-full border-[#aaaaaa55] border-b-[1px] border-dashed"></div>
                                ) : (
                                    <div className="w-full h-full border-[#aaaaaa55] border-x-[1px] border-b-[1px] border-dashed"></div>
                                );
                            })}
                        </div>
                        <div
                            className="absolute ml-10 w-4/5 flex flex-row justify-around"
                            style={{ height: 'calc(100% - 0.5rem)' }}
                        >
                            {rawUserData.map(
                                generateUserDataBlockChart.monthBlock,
                            )}
                        </div>
                    </div>
                    <div className="px-15 mt-3 flex flex-row flex-wrap justify-evenly h-fit gap-1 text-xs">
                        {rawUserData.map((v) => (
                            <div className="flex flex-row items-center justify-center gap-2">
                                <div
                                    className={`rounded-[360rem] w-2 aspect-square`}
                                    style={{ backgroundColor: v.color }}
                                ></div>
                                <p className="font-semibold">
                                    {v.month + ' '}
                                    <span style={{ color: v.color }}>
                                        ({v.amount})
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
