import React, { useEffect, useState, useRef } from 'react';
import LogoDatabase from '../../assets/icons/admin/database.svg';
import { showLoading, hideLoading } from '../../stores/loadingReducer';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { nanoid } from 'nanoid';

const DashboardDestination = ({ destinationYears }) => {
    // const availableYears = [2025];
    const nullBlock = { month: 1, color: '#000000', count: 0 };
    const defaultMonth = [
        { month: 1, color: '#000000', count: 0 },
        { month: 2, color: '#000000', count: 0 },
        { month: 3, color: '#000000', count: 0 },
        { month: 4, color: '#000000', count: 0 },
        { month: 5, color: '#000000', count: 0 },
        { month: 6, color: '#000000', count: 0 },
        { month: 7, color: '#000000', count: 0 },
        { month: 8, color: '#000000', count: 0 },
        { month: 9, color: '#000000', count: 0 },
        { month: 10, color: '#000000', count: 0 },
        { month: 11, color: '#000000', count: 0 },
        { month: 12, color: '#000000', count: 0 },
    ];
    const dispatch = useDispatch();

    const [selectedYear, setSelectedYear] = useState(
        destinationYears[destinationYears.length - 1],
    );
    const tooltipContainerRef = useRef(null);
    const [startMonthIndex, setStartMonthIndex] = useState(0);
    const [hoverData, setHoverData] = useState(null);
    const [rawDestinationData, setRawDestinationData] = useState([nullBlock]);

    const visibleMonths = 6;
    const visibleData = rawDestinationData.slice(
        startMonthIndex,
        startMonthIndex + visibleMonths,
    );
    const searchMonth = (months, monthToSearch) => {
        return months.find((v) => v.month === monthToSearch);
    };
    useEffect(() => {
        // User Analytics
        (async () => {
            const keyLoading = nanoid();
            try {
                dispatch(showLoading(keyLoading));
                const req = (
                    await axios.get(
                        `/api/admin/destination-analytic?year=${selectedYear}`,
                    )
                ).data.data;
                const months = defaultMonth.map((v) => {
                    const search = searchMonth(req, v.month);
                    if (search) {
                        return {
                            ...search,
                        };
                    }
                    return v;
                });
                setRawDestinationData(months);
            } catch (e) {
                toast.error(
                    'Something went wrong at getting destination analytic',
                    {
                        autoClose: 3000,
                        position: 'top-right',
                    },
                );
            } finally {
                dispatch(hideLoading(keyLoading));
            }
        })();
    }, [selectedYear]);

    const getModeDestination = () =>
        rawDestinationData.length === 0
            ? nullBlock
            : [...rawDestinationData].sort((a, b) => b.count - a.count)[0];
    const totalBlockChartIndices = 7;

    const getNamedMonth = (month) => {
        const namedMonth = [
            { name: 'January', color: '#8979FF' },
            { name: 'February', color: '#FF928A' },
            { name: 'March', color: '#3CC3DF' },
            { name: 'April', color: '#FFAE4C' },
            { name: 'May', color: '#537FF1' },
            { name: 'June', color: '#6FD195' },
            { name: 'July', color: '#8C63DA' },
            { name: 'August', color: '#2BB7DC' },
            { name: 'September', color: '#1F94FF' },
            { name: 'October', color: '#F4CF3B' },
            { name: 'November', color: '#55C4AE' },
            { name: 'December', color: '#6186CC' },
        ];
        return namedMonth[Math.min(11, Math.max(0, Number(month) - 1))];
    };

    const generateDestinationDataBlockChart = {
        monthBlock: (v, i, context) => (
            <div
                key={i}
                className="flex items-end h-full bg-[#D6DBED22] relative"
                style={{ width: `calc(${100.0 / context.length}% - 2px)` }}
                onMouseEnter={(e) => {
                    const tooltipContainer = tooltipContainerRef.current;
                    const rect = tooltipContainer.getBoundingClientRect();
                    setHoverData({
                        month: getNamedMonth(v.month).month,
                        year: selectedYear,
                        count: v.count,
                        color: getNamedMonth(v.month).color,
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                    });
                }}
                onMouseMove={(e) => {
                    const tooltipContainer = tooltipContainerRef.current;
                    const rect = tooltipContainer.getBoundingClientRect();
                    setHoverData(
                        (prev) =>
                            prev && {
                                ...prev,
                                x: e.clientX - rect.left,
                                y: e.clientY - rect.top,
                            },
                    );
                }}
                onMouseLeave={() => setHoverData(null)}
            >
                <div
                    style={{
                        backgroundColor: getNamedMonth(v.month).color + '77',
                        borderColor: getNamedMonth(v.month).color,
                        borderTopWidth: '2px',
                        width: '100%',
                        height: `${(v.count / getModeDestination().count) * 100.0}%`,
                    }}
                    className="border-t-2 rounded-t-sm transition-all duration-300"
                ></div>
            </div>
        ),
        countIndices: (index) => {
            const totalDestination = getModeDestination().count;
            return Math.round(
                (totalDestination / (totalBlockChartIndices - 1)) *
                    Math.min(index - 1, totalBlockChartIndices),
            );
        },
    };

    return (
        <div className="relative px-5 flex flex-col items-center pb-5 w-full font-quicksand">
            <div className="py-8 flex flex-col w-full items-center bg-[#252527] rounded-md shadow-lg mb-4">
                <img
                    src={LogoDatabase}
                    alt="Destinations Icon"
                    className="w-8 mb-1"
                />
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
                            {destinationYears.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Grafik */}
                    <div
                        className="relative w-full flex justify-center aspect-[2/1] max-h-[400px]"
                        ref={tooltipContainerRef}
                    >
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
                                    top: hoverData.y,
                                    left: hoverData.x + 13,
                                    minWidth: 160,
                                    backgroundColor: '#1c1c1c',
                                    border: `1px solid ${hoverData.color}`,
                                }}
                            >
                                <div className="font-semibold">
                                    {hoverData.month} {hoverData.year}
                                </div>
                                <div className="text-xs">
                                    Total Destinations: {hoverData.count}
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
                    <div className="px-15 mt-3 flex flex-row flex-wrap justify-evenly h-fit gap-3 text-xs">
                        {visibleData.map((v, idx) => (
                            <div
                                key={idx}
                                className="flex flex-row items-center gap-1"
                            >
                                <div
                                    className="rounded-full w-2 aspect-square"
                                    style={{
                                        backgroundColor: getNamedMonth(v.month)
                                            .color,
                                    }}
                                ></div>
                                <p className="font-semibold">
                                    {getNamedMonth(v.month).name}&nbsp;
                                    <span
                                        style={{
                                            color: getNamedMonth(v.month).color,
                                        }}
                                    >
                                        ({v.count})
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

export default DashboardDestination;
