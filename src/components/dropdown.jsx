import { useEffect, useState, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Dropdown = ({
    options = [],
    selected = { name: '' },
    setSelected,
    getOptionLabel = (item) => item.name,
    placeholder = 'Select...',
    onSelect = () => {},
    error = '',
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const dropdownRef = useRef();

    useEffect(() => {
        setFilteredOptions(
            options.filter((item) =>
                getOptionLabel(item)
                    .toLowerCase()
                    .includes(search.toLowerCase()),
            ),
        );
    }, [search, options]);

    useEffect(() => {
        const label = getOptionLabel?.(selected) || '';
        if (label !== search) {
            setSearch(label);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        if (!dropdownOpen) {
            setFilteredOptions(options);
        }
        setDropdownOpen((prev) => !prev);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setDropdownOpen(true);
    };

    const handleSelect = (item) => {
        setSelected(item);
        setSearch(getOptionLabel(item));
        setDropdownOpen(false);
    };

    const autoCompleteOption = (e) => {
        if (filteredOptions.length > 0 && search.name != '') {
            const firstFilteredOpt = getOptionLabel(filteredOptions[0]);
            setSearch(firstFilteredOpt);
            setDropdownOpen(false);
        } else {
            e.preventDefault();
            setSearch('');
        }
    };

    return (
        <div
            ref={dropdownRef}
            className="relative w-full"
            onKeyDown={(e) => {
                if (e.key === 'Enter') autoCompleteOption(e);
            }}
        >
            <div className="flex items-center">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder={placeholder}
                    className={`flex-3 p-3 font-quicksand rounded text-white border w-full pr-10 bg-transparent focus:outline-none transition-all duration-200
            ${error ? 'border-red-500' : 'border-white'} 
            ${dropdownOpen ? 'ring ring-[#FFA666]' : 'focus:ring focus:ring-[#FFA666]'}
        `}
                />
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className="absolute inset-y-0 right-0 flex items-center justify-center mr-4 group"
                >
                    <div className="rounded-full p-1 cursor-pointer transition-all duration-250 hover:bg-orange-200">
                        <FaChevronDown
                            className={`text-base text-[#FFA666] group-hover:text-[#FFA666] transition-transform duration-300 ${
                                dropdownOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                        />
                    </div>
                </button>
            </div>

            {dropdownOpen && filteredOptions.length > 0 && (
                <ul className="absolute z-20 w-full mt-1 bg-[#252527] text-white border border-[#FFA666] rounded shadow-md max-h-49 overflow-y-auto">
                    {filteredOptions.map((opt, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-[#FFA666] hover:text-black transition-all duration-200"
                            onClick={() => handleSelect(opt)}
                        >
                            {getOptionLabel(opt)}
                        </li>
                    ))}
                    {filteredOptions.length === 0 && (
                        <li className="px-4 py-2 text-gray-400">
                            No options found
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
