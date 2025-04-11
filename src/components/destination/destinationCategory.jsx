import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

const DestinationCategory = ({
    category,
    setCategory,
    allCategories,
    categoryDropdownOpen,
    setCategoryDropdownOpen,
    filteredCategories,
    setFilteredCategories,
    handleSelectCategory,
}) => {
    const toggleCategoryDropdown = () => {
        setCategoryDropdownOpen((prev) => !prev);
        if (!categoryDropdownOpen && category.name === '') {
            setFilteredCategories(allCategories);
        }
    };

    return (
        <div>
            <div className="flex flex-col mb-2 lg:mb-0 mt-auto relative">
                <div className="relative w-full">
                    <div className="flex items-center relative">
                        <input
                            id="category"
                            type="text"
                            name="category"
                            value={category.name}
                            onClick={toggleCategoryDropdown}
                            onChange={(e) => {
                                const value = e.target.value;
                                const filtered = allCategories.filter((c) =>
                                    c.name
                                        .toLowerCase()
                                        .includes(value.toLowerCase()),
                                );
                                setFilteredCategories(filtered);
                                setCategory({ name: value });
                                setCategoryDropdownOpen(true);
                            }}
                            placeholder="Select Category"
                            className="flex-3 p-3 font-quicksand rounded text-white border bg-[#1b1b1d] w-[240px] h-10 lg:h-auto"
                        />
                        <button
                            type="button"
                            onClick={toggleCategoryDropdown}
                            className="absolute inset-y-0 right-0 flex items-center justify-center p-2 pl-4 rounded-l-2xl bg-[#FFA666] cursor-pointer transition-all duration-200 hover:bg-white group"
                        >
                            <FaChevronDown
                                className={`text-lg text-black group-hover:text-[#FFA666] transition-transform duration-300 ${
                                    categoryDropdownOpen
                                        ? 'rotate-180'
                                        : 'rotate-0'
                                }`}
                            />
                        </button>
                    </div>

                    {categoryDropdownOpen && filteredCategories.length > 0 && (
                        <ul className="absolute left-0 right-0 top-full mt-1 bg-[#252527] text-white border border-[#FFA666] rounded shadow-md max-h-60 overflow-y-auto z-100">
                            {filteredCategories.map((c) => (
                                <li
                                    key={c.name}
                                    className="px-4 py-2 cursor-pointer hover:bg-[#FFA666] hover:text-black transition-all duration-200"
                                    onClick={() => handleSelectCategory(c)}
                                >
                                    {c.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DestinationCategory;
