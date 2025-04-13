import React, { useEffect, useRef, useState } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

const SearchDestination = ({
    handleSubmit,
    selectedHandler,
    provinces,
    resetSelectedHandler,
}) => {
    const [searchParams, _] = useSearchParams();

    const [province, setProvince] = useState({
        name: searchParams.get('province') || '',
    });
    const [destination, setDestination] = useState({
        name: searchParams.get('name') || '',
    });
    const [filteredProvinces, setFilteredProvinces] = useState(provinces);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const inputDropdown = useRef(null);
    const handleProvinceChange = (e) => {
        const value = e.target.value;
        setProvince({
            name: value,
        });
        setDropdownOpen(true);

        if (value) {
            const filtered = provinces.filter((p) =>
                p.name.toLowerCase().includes(value.toLowerCase()),
            );
            setFilteredProvinces(filtered);
        } else {
            setFilteredProvinces(provinces);
        }
    };
    const autoCompleteProvince = (e) => {
        if (filteredProvinces.length > 0 && province.name != '') {
            const selectedProvince = filteredProvinces[0];
            setProvince(selectedProvince);
            selectedHandler(selectedProvince);
            setDropdownOpen(false);
            setFilteredProvinces(provinces);
        } else {
            e.preventDefault();
            setProvince({ name: '' });
            resetSelectedHandler();
        }
    };

    useEffect(() => {
        setFilteredProvinces(provinces);
    }, [provinces]);

    const handleSelectProvince = (selectedProvince) => {
        setProvince(selectedProvince);
        selectedHandler(selectedProvince);
        setDropdownOpen(false);
        setFilteredProvinces(provinces);
    };

    const toggleDropdown = () => {
        if (!dropdownOpen) inputDropdown.current.focus();
        setDropdownOpen((prev) => !prev);
    };

    return (
        <form
            className="flex flex-col text-center items-center bg-[#252527] text-white px-5 md:px-8 py-5 gap-3 rounded-md w-full"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(province, destination);
            }}
        >
            <label
                htmlFor="province"
                className="font-quicksand text-xl text-nowrap md:text-2xl rounded-md w-full tracking-tight sm:tracking-wide"
            >
                Search For Tourist Destination
            </label>
            <div className="flex md:flex-row flex-col w-full items-center gap-6">
                <div className="relative w-full md:w-2/5">
                    <div className="flex items-center">
                        <input
                            id="province"
                            name="province"
                            className="bg-[#252527] w-full text-nowrap px-5 py-2 text-white font-quicksand placeholder-[#ffffff32] shadow-md shadow-stone-950 rounded-sm"
                            type="text"
                            placeholder="Search Province"
                            ref={inputDropdown}
                            value={province?.name || ''}
                            onChange={handleProvinceChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') autoCompleteProvince(e);
                            }}
                        />
                        <button
                            type="button"
                            onClick={toggleDropdown}
                            className="absolute inset-y-0 right-0 flex items-center justify-center p-2 pl-4 rounded-sm rounded-l-2xl bg-[#FFA666] cursor-pointer transition-all duration-200 hover:bg-white group"
                        >
                            <FaChevronDown
                                className={`text-lg text-black group-hover:text-[#FFA666] transition-transform duration-300 ${
                                    dropdownOpen ? 'rotate-180' : 'rotate-0'
                                }`}
                            />
                        </button>
                    </div>

                    {dropdownOpen && filteredProvinces.length > 0 && (
                        <ul className="absolute left-0 mt-1 w-full bg-[#252527] text-white border border-[#FFA666] rounded-sm shadow-md shadow-stone-950 z-10 max-h-80 overflow-y-auto">
                            {filteredProvinces.map((p) => (
                                <li
                                    key={p.name}
                                    className="px-4 py-2 cursor-pointer hover:bg-[#FFA666] hover:text-black transition-all duration-200"
                                    onClick={() => handleSelectProvince(p)}
                                >
                                    {p.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="relative w-full md:w-3/5">
                    <input
                        id="destinationName"
                        name="destinationName"
                        className="bg-[#252527] w-full text-nowrap px-5 py-2 pr-12 text-white font-quicksand placeholder-[#ffffff32] shadow-md shadow-stone-950 rounded-lg"
                        type="text"
                        value={destination.name}
                        onChange={(e) => {
                            setDestination({ name: e.target.value.trim() });
                        }}
                        placeholder="Look up Destination"
                    />
                    <button
                        type="submit"
                        className="absolute inset-y-0 right-0 flex items-center justify-center p-2 pl-4 rounded-lg rounded-l-2xl bg-[#FFA666] cursor-pointer transition-all duration-200 hover:bg-white group"
                    >
                        <FaSearch className="text-lg text-black group-hover:text-[#FFA666]" />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SearchDestination;
