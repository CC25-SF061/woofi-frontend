import React from 'react';
import { IoClose } from 'react-icons/io5';
import { FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const EditConfirm = ({
    selectedItemToEdit,
    setSelectedItemToEdit,
    handleProvinceChange,
    toggleDropdown,
    handleSelectProvince,
    dropdownOpen,
    filteredProvinces,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    errors,
    handleEdit,
}) => {
    const MotionDiv = motion.div;

    const handleCloseModal = () => {
        setSelectedItemToEdit(null);
    };

    return (
        <AnimatePresence>
            {selectedItemToEdit && (
                <MotionDiv
                    className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-80 backdrop-blur-md z-50 font-quicksand top-20 lg:top-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <MotionDiv
                        className="relative p-4 py-0 w-full max-w-lg rounded-lg shadow-lg bg-[#252527] lg:max-h-[90vh] max-h-[70vh] overflow-y-auto"
                        initial={{ y: '-20%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '-10%', opacity: 0 }}
                        transition={{
                            type: 'spring',
                            damping: 20,
                            stiffness: 300,
                        }}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-[#252527] z-10 p-4 pt-8 border-b rounded-t border-gray-600">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-white">
                                    Edit Destination
                                </h3>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-white bg-transparent hover:bg-white hover:text-[#FFA666] rounded-sm text-2xl cursor-pointer"
                                >
                                    <IoClose />
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <form
                            className="p-4 space-y-4"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            {/* Name */}
                            <div className="flex flex-col gap-2">
                                <label className="block text-white">
                                    Destination Name:
                                </label>
                                <input
                                    type="text"
                                    value={selectedItemToEdit.name}
                                    onChange={(e) =>
                                        setSelectedItemToEdit({
                                            ...selectedItemToEdit,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 font-quicksand rounded text-white border bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]"
                                />
                                {errors.name && (
                                    <div className="text-red-500 text-sm">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            {/* Location */}
                            <div className="flex flex-col gap-2">
                                <label className="block text-white">
                                    Location:
                                </label>
                                <input
                                    type="text"
                                    value={selectedItemToEdit.location}
                                    onChange={(e) =>
                                        setSelectedItemToEdit({
                                            ...selectedItemToEdit,
                                            location: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 font-quicksand rounded text-white border bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]"
                                />
                                {errors.location && (
                                    <div className="text-red-500 text-sm">
                                        {errors.location}
                                    </div>
                                )}
                            </div>

                            {/* Province Dropdown */}
                            <div className="flex flex-col gap-2">
                                <label className="block text-white">
                                    Province:
                                </label>
                                <div className="relative w-full">
                                    <div className="flex items-center">
                                        <input
                                            id="province"
                                            type="text"
                                            name="province"
                                            value={selectedItemToEdit.province}
                                            onChange={handleProvinceChange}
                                            placeholder="Search Province"
                                            className={`flex-3 p-3 font-quicksand rounded text-white border ${
                                                errors.province
                                                    ? 'border-red-500'
                                                    : 'border-white'
                                            } bg-transparent w-full pr-10 focus:outline-none focus:ring focus:ring-[#FFA666]`}
                                        />
                                        <button
                                            type="button"
                                            onClick={toggleDropdown}
                                            className="absolute inset-y-0 right-0 flex items-center justify-center p-2 pl-4 rounded-l-2xl bg-[#FFA666] cursor-pointer hover:bg-white group"
                                        >
                                            <FaChevronDown
                                                className={`text-lg text-black group-hover:text-[#FFA666] transition-transform duration-300 ${
                                                    dropdownOpen
                                                        ? 'rotate-180'
                                                        : 'rotate-0'
                                                }`}
                                            />
                                        </button>
                                    </div>
                                    {dropdownOpen &&
                                        filteredProvinces.length > 0 && (
                                            <ul className="absolute z-10 w-full mt-1 bg-[#252527] text-white border border-[#FFA666] rounded shadow-md max-h-60 overflow-y-auto">
                                                {filteredProvinces.map((p) => (
                                                    <li
                                                        key={p.name}
                                                        className="px-4 py-2 cursor-pointer hover:bg-[#FFA666] hover:text-black"
                                                        onClick={() =>
                                                            handleSelectProvince(
                                                                p,
                                                            )
                                                        }
                                                    >
                                                        {p.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                </div>
                                {errors.province && (
                                    <div className="text-red-500 text-sm">
                                        {errors.province}
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-2">
                                <label className="block text-white">
                                    Description:
                                </label>
                                <textarea
                                    value={selectedItemToEdit.detail}
                                    onChange={(e) =>
                                        setSelectedItemToEdit({
                                            ...selectedItemToEdit,
                                            detail: e.target.value,
                                        })
                                    }
                                    className="w-full max-h-45 p-3 font-quicksand rounded text-white border bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]"
                                    rows="5"
                                />
                                {errors.detail && (
                                    <div className="text-red-500 text-sm">
                                        {errors.detail}
                                    </div>
                                )}
                            </div>

                            {/* Image Upload */}
                            <div className="flex flex-col gap-2">
                                <label className="block text-white">
                                    Image:
                                </label>
                                <div className="flex flex-col items-center gap-3 w-full">
                                    {!selectedItemToEdit?.imageFile && (
                                        <div className="w-full">
                                            <label
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                                htmlFor="dropzone-file"
                                                className={`flex flex-col items-center justify-center w-full h-64 border-white border-2 border-dashed rounded-lg cursor-pointer transition
                                            ${isDragging ? 'border-[#FFA666] bg-gray-800' : 'border-gray-300 hover:bg-gray-700'}`}
                                            >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                                    <svg
                                                        className="w-8 h-8 mb-4 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 4v16m8-8H4"
                                                        />
                                                    </svg>
                                                    <p className="text-sm text-gray-400">
                                                        <span className="font-semibold">
                                                            Click to upload
                                                        </span>{' '}
                                                        or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        PNG, JPG, max 800x400px
                                                    </p>
                                                </div>
                                                <input
                                                    id="dropzone-file"
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file =
                                                            e.target.files[0];
                                                        if (file) {
                                                            setSelectedItemToEdit(
                                                                {
                                                                    ...selectedItemToEdit,
                                                                    imageFile:
                                                                        file,
                                                                },
                                                            );
                                                            e.target.value =
                                                                null;
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    )}
                                    {selectedItemToEdit?.imageFile && (
                                        <p className="text-sm text-white text-center">
                                            Selected file:{' '}
                                            <span className="font-semibold">
                                                {
                                                    selectedItemToEdit.imageFile
                                                        .name
                                                }
                                            </span>
                                        </p>
                                    )}
                                </div>
                                {errors.image && (
                                    <div className="text-red-500 text-sm">
                                        {errors.image}
                                    </div>
                                )}
                            </div>
                        </form>

                        {/* Footer */}
                        <div className="sticky bottom-0 bg-[#252527] z-10 p-4 pb-8 border-t border-gray-200 rounded-b border-gray-600 flex items-center justify-end gap-3">
                            <button
                                onClick={handleCloseModal}
                                className="py-2.5 px-5 text-sm font-semibold text-black rounded-lg hover:bg-gray-400 bg-white cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() =>
                                    handleEdit(setSelectedItemToEdit)
                                }
                                className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
                            >
                                Save Changes
                            </button>
                        </div>
                    </MotionDiv>
                </MotionDiv>
            )}
        </AnimatePresence>
    );
};

export default EditConfirm;
