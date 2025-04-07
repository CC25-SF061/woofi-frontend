import React, { useState } from 'react';
import LogoDatabase from '../../assets/icons/admin/database.svg';

const dashboard_preview_destinations = () => {
    const destinationDataPerYear = {
        2023: [
            { month: 'January', color: '#8979FF', amount: 12 },
            { month: 'February', color: '#FF928A', amount: 24 },
            { month: 'March', color: '#3CC3DF', amount: 33 },
            { month: 'April', color: '#FFAE4C', amount: 40 },
            { month: 'May', color: '#537FF1', amount: 50 },
            { month: 'June', color: '#6FD195', amount: 10 },
            { month: 'July', color: '#8C63DA', amount: 20 },
            { month: 'August', color: '#2BB7DC', amount: 30 },
            { month: 'September', color: '#1F94FF', amount: 60 },
            { month: 'October', color: '#F4CF3B', amount: 45 },
            { month: 'November', color: '#55C4AE', amount: 20 },
            { month: 'December', color: '#6186CC', amount: 81 },
        ],
        2024: [
            { month: 'January', color: '#8979FF', amount: 5 },
            { month: 'February', color: '#FF928A', amount: 15 },
            { month: 'March', color: '#3CC3DF', amount: 30 },
            { month: 'April', color: '#FFAE4C', amount: 40 },
            { month: 'May', color: '#537FF1', amount: 50 },
            { month: 'June', color: '#6FD195', amount: 10 },
            { month: 'July', color: '#8C63DA', amount: 20 },
            { month: 'August', color: '#2BB7DC', amount: 30 },
            { month: 'September', color: '#1F94FF', amount: 60 },
            { month: 'October', color: '#F4CF3B', amount: 45 },
            { month: 'November', color: '#55C4AE', amount: 20 },
            { month: 'December', color: '#6186CC', amount: 81 },
        ],
        2025: [
            { month: 'January', color: '#8979FF', amount: 10 },
            { month: 'February', color: '#FF928A', amount: 20 },
            { month: 'March', color: '#3CC3DF', amount: 30 },
            { month: 'April', color: '#FFAE4C', amount: 40 },
            { month: 'May', color: '#537FF1', amount: 50 },
            { month: 'June', color: '#6FD195', amount: 10 },
            { month: 'July', color: '#8C63DA', amount: 20 },
            { month: 'August', color: '#2BB7DC', amount: 30 },
            { month: 'September', color: '#1F94FF', amount: 60 },
            { month: 'October', color: '#F4CF3B', amount: 45 },
            { month: 'November', color: '#55C4AE', amount: 20 },
            { month: 'December', color: '#6186CC', amount: 81 },
        ],
    };

    const [selectedYear, setSelectedYear] = useState(2025);
    const [startMonthIndex, setStartMonthIndex] = useState(0);
    const [hoverData, setHoverData] = useState(null);

    const visibleMonths = 6;
    const rawDestinationData = destinationDataPerYear[selectedYear] || [];
    const visibleData = rawDestinationData.slice(
        startMonthIndex,
        startMonthIndex + visibleMonths,
    );

    const getTotalDestinations = () =>
        visibleData.reduce((acc, v) => acc + v.amount, 0);
    const getModeDestination = () =>
        [...visibleData].sort((a, b) => b.amount - a.amount)[0];
    const totalBlockChartIndices = 7;

    const generateDestinationDataBlockChart = {
        monthBlock: (v, i, context) => (
            <div
                key={i}
                className="flex items-end h-full bg-[#D6DBED22] relative"
                style={{ width: `calc(${100.0 / context.length}% - 2px)` }}
                onMouseEnter={(e) => {
                    setHoverData({
                        month: v.month,
                        year: selectedYear,
                        amount: v.amount,
                        color: v.color,
                        x: e.clientX,
                        y: e.clientY,
                    });
                }}
                onMouseMove={(e) => {
                    setHoverData(
                        (prev) =>
                            prev && { ...prev, x: e.clientX, y: e.clientY },
                    );
                }}
                onMouseLeave={() => setHoverData(null)}
            >
                <div
                    style={{
                        backgroundColor: v.color + '77',
                        borderColor: v.color,
                        borderTopWidth: '2px',
                        width: '100%',
                        height: `${(v.amount / getModeDestination().amount) * 100.0}%`,
                    }}
                    className="border-t-2 rounded-t-sm transition-all duration-300"
                ></div>
            </div>
        ),
        countIndices: (index) => {
            const totalUser = getTotalDestinations();
            return Math.round(
                (totalUser / (totalBlockChartIndices - 1)) *
                    Math.min(index - 1, totalBlockChartIndices),
            );
        },
    };

    return (
        <div className="relative px-5 flex flex-col items-center pb-5 w-full font-quicksand">
            <div className="py-8 flex flex-col w-full items-center bg-[#252527] rounded-md shadow-lg mb-4">
                <img src={LogoDatabase} alt="Users Icon" className="w-8 mb-1" />
                <h2 className="text-[#aaa] tracking-wide text-xl">
                    Overview Destination Data
                </h2>
            </div>

            <div className="flex flex-col items-center justify-center p-5 bg-[#252527] rounded-md w-full">
                <div className="flex flex-col justify-around items-center p-5 w-full max-w-[1200px] bg-[#14141C] rounded-md">
                    {/* Dropdown tahun */}
                    <div className="flex items-center gap-4 mb-4">
                        <label className="text-white">Year:</label>
                        <select
                            className="bg-[#2a2a2a] text-white p-2 rounded-md"
                            value={selectedYear}
                            onChange={(e) => {
                                setSelectedYear(parseInt(e.target.value));
                                setStartMonthIndex(0);
                            }}
                        >
                            {Object.keys(destinationDataPerYear).map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Grafik */}
                    <div className="relative w-full flex justify-center aspect-[2/1] max-h-[400px]">
                        {/* Grid garis bantu */}
                        <div
                            className="absolute inset-0 grid items-end"
                            style={{
                                gridTemplateColumns: '1fr 45fr',
                                gridTemplateRows: '1fr repeat(6, 100fr)',
                            }}
                        >
                            {Array.from({
                                length: totalBlockChartIndices * 2,
                            }).map((_, i) =>
                                i % 2 === 0 ? (
                                    <p
                                        key={i}
                                        className="font-light text-xs text-[#ccc] w-full h-[0.5rem] text-right px-1"
                                    >
                                        {generateDestinationDataBlockChart.countIndices(
                                            totalBlockChartIndices - i / 2,
                                        )}
                                    </p>
                                ) : i === 1 ? (
                                    <div
                                        key={i}
                                        className="w-full h-full border-[#aaaaaa55] border-b-[1px] border-dashed"
                                    />
                                ) : (
                                    <div
                                        key={i}
                                        className="w-full h-full border-[#aaaaaa55] border-x-[1px] border-b-[1px] border-dashed"
                                    />
                                ),
                            )}
                        </div>

                        {/* Bar Chart */}
                        <div className="absolute ml-7 pt-[0.5rem] w-4/5 h-full flex flex-row justify-around">
                            {visibleData.map(
                                generateDestinationDataBlockChart.monthBlock,
                            )}
                        </div>

                        {/* Tooltip Hover */}
                        {hoverData && (
                            <div
                                className="absolute z-50 bg-black text-white text-sm p-2 rounded shadow-lg pointer-events-none transition-opacity duration-200"
                                style={{
                                    top: hoverData.y - 140,
                                    left: hoverData.x - 200,
                                    minWidth: 160,
                                    backgroundColor: '#1c1c1c',
                                    border: `1px solid ${hoverData.color}`,
                                }}
                            >
                                <div className="font-semibold">
                                    {hoverData.month} {hoverData.year}
                                </div>
                                <div className="text-xs">
                                    Total Destinations: {hoverData.amount}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigasi bulan */}
                    <div className="flex items-center mt-4 gap-4">
                        <button
                            className="bg-[#3c3c3c] text-white px-3 py-1 rounded disabled:opacity-40"
                            onClick={() =>
                                setStartMonthIndex((prev) =>
                                    Math.max(0, prev - visibleMonths),
                                )
                            }
                            disabled={startMonthIndex === 0}
                        >
                            ← Prev
                        </button>
                        <button
                            className="bg-[#3c3c3c] text-white px-3 py-1 rounded disabled:opacity-40"
                            onClick={() =>
                                setStartMonthIndex((prev) =>
                                    Math.min(
                                        rawDestinationData.length -
                                            visibleMonths,
                                        prev + visibleMonths,
                                    ),
                                )
                            }
                            disabled={
                                startMonthIndex + visibleMonths >=
                                rawDestinationData.length
                            }
                        >
                            Next →
                        </button>
                    </div>

                    {/* Legend */}
                    <div className="px-15 mt-3 flex flex-row flex-wrap justify-evenly h-fit gap-1 text-xs">
                        {visibleData.map((v, idx) => (
                            <div
                                key={idx}
                                className="flex flex-row items-center gap-2"
                            >
                                <div
                                    className="rounded-full w-2 aspect-square"
                                    style={{ backgroundColor: v.color }}
                                ></div>
                                <p className="font-semibold">
                                    {v.month}{' '}
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

export default dashboard_preview_destinations;
