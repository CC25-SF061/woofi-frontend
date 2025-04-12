import React from 'react';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import Dropdown from '../dropdown';

const EditConfirm = ({
    selectedItemToEdit,
    setSelectedItemToEdit,
    filteredProvinces,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    errors,
    handleEdit,
    filteredCategories,
}) => {
    const MotionDiv = motion.div;

    const handleCloseModal = () => {
        setSelectedItemToEdit(null);
    };

    return (
        <AnimatePresence>
            {selectedItemToEdit && (
                <MotionDiv
                    key={selectedItemToEdit.id || 'edit-modal'}
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
                                <Dropdown
                                    options={filteredProvinces}
                                    selected={filteredProvinces.find(
                                        (item) =>
                                            item.name ===
                                            selectedItemToEdit.province,
                                    )}
                                    setSelected={(item) =>
                                        setSelectedItemToEdit({
                                            ...selectedItemToEdit,
                                            province: item.name,
                                        })
                                    }
                                    placeholder="Search Province"
                                    error={errors.province}
                                />
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

                            {/* Category Dropdown */}
                            <div className="flex flex-col gap-2">
                                <label className="block text-white">
                                    Category:
                                </label>
                                <Dropdown
                                    options={filteredCategories}
                                    selected={filteredCategories.find(
                                        (item) =>
                                            item.name ===
                                            selectedItemToEdit.category,
                                    )}
                                    setSelected={(item) =>
                                        setSelectedItemToEdit({
                                            ...selectedItemToEdit,
                                            category: item.name,
                                        })
                                    }
                                    placeholder="Search Category"
                                    error={errors.category}
                                />
                            </div>

                            {/* Image Upload */}
                            <div className="flex flex-col gap-2">
                                <label className="block text-white">
                                    Image:
                                </label>
                                <div className="flex flex-col items-center gap-3 w-full">
                                    <div className="w-full">
                                        <label
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            htmlFor="dropzone-file"
                                            className={`flex flex-col items-center justify-center w-full h-64 border-white border-2 border-dashed rounded-lg cursor-pointer transition
                                            ${isDragging ? 'border-[#FFA666] bg-gray-800' : 'border-gray-300 hover:bg-gray-700'}`}
                                        >
                                            {!selectedItemToEdit?.imageFile ? (
                                                <>
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
                                                            PNG, JPG, max 10mb
                                                        </p>
                                                    </div>
                                                </>
                                            ) : (
                                                <img
                                                    src={URL.createObjectURL(
                                                        selectedItemToEdit.imageFile,
                                                    )}
                                                    alt="Selected"
                                                    className="object-cover w-full h-full rounded-lg"
                                                />
                                            )}
                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files[0];
                                                    if (file) {
                                                        setSelectedItemToEdit({
                                                            ...selectedItemToEdit,
                                                            imageFile: file,
                                                        });
                                                        e.target.value = null;
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>

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
