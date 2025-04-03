import React, { useState } from 'react';
import Sidebar from '../../components/profile/sidebar';
import { HiX } from 'react-icons/hi';
import { RiMenu2Line } from 'react-icons/ri';
import { IoIosNotifications } from 'react-icons/io';
import ErrorConstant from '../../util/ErrorConstant.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddData = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileName, setFileName] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageLink: '',
        location: '',
        province: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: null });
    };

    const validateForm = () => {
        let validationErrors = {};

        if (!formData.title.trim()) {
            validationErrors.title = 'Title field cannot be empty!';
        }
        if (!formData.description.trim()) {
            validationErrors.description = 'Description field cannot be empty!';
        }
        if (!selectedImage) {
            validationErrors.imageLink = 'Image must be uploaded!';
        }
        if (!formData.location.trim()) {
            validationErrors.location = 'Location field cannot be empty!';
        }
        if (!formData.province.trim()) {
            validationErrors.province = 'Province field cannot be empty!';
        }

        return validationErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Jika validasi berhasil
        toast.success('Data added successfully!', {
            position: 'top-right',
            autoClose: 3000,
        });

        // Reset form setelah submit
        setFormData({
            title: '',
            description: '',
            imageLink: '',
            location: '',
            province: '',
        });
        setErrors({});
        setSelectedImage(null);
        setFileName('');
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setFileName(file.name);
            setErrors((prevErrors) => ({ ...prevErrors, imageLink: null })); // Reset error
        }
    };

    return (
        <div>
            <div className="w-full bg-[#221122] flex lg:h-screen items-center justify-center p-5 lg:p-10 gap-5 text-white">
                {/* Header Mobile */}
                <div className="lg:hidden p-5 fixed z-60 top-0 w-full bg-[#252527] flex justify-between items-center shadow-xl">
                    <button
                        className="bg-[#FFA666] p-2 rounded-lg text-black cursor-pointer"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? (
                            <HiX size={24} />
                        ) : (
                            <RiMenu2Line size={24} />
                        )}
                    </button>
                    <button className="bg-[#FFA666] text-black font-quicksand p-2 rounded-lg cursor-pointer">
                        <IoIosNotifications size={24} />
                    </button>
                </div>

                {/* Sidebar */}
                <div
                    className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#252527] transform transition-transform duration-300 ease-in-out shadow-lg lg:hidden lg:translate-x-0 ${
                        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <Sidebar />
                </div>
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                <div className="hidden lg:flex h-full">
                    <Sidebar />
                </div>

                <div className="flex flex-col flex-1 rounded-lg overflow-hidden shadow-lg bg-[#252527] m-5 lg:m-0 h-full lg:w-3/4 mt-20">
                    <div className="p-3 w-full shadow-md z-10">
                        <h1 className="text-center font-quicksand text-2xl">
                            Add Data Destination
                        </h1>
                        <hr className="border-t-2 border-white my-3 rounded" />
                    </div>

                    <div className="overflow-y-auto p-3 ">
                        <div className="flex flex-col lg:flex-row lg:gap-10">
                            <div className="flex-1 flex flex-col lg:gap-2">
                                <div className="flex flex-col mb-2 lg:mb-0">
                                    <p className="font-quicksand text-white pb-2">
                                        Title
                                    </p>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Input Title"
                                        className={`flex-3 p-3 font-quicksand rounded text-white border ${
                                            errors.title
                                                ? 'border-red-500'
                                                : 'border-white'
                                        } bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]`}
                                    />
                                    <div className="min-h-[20px]">
                                        {errors.title && (
                                            <div className="text-red-500 text-sm">
                                                {errors.title}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col mb-2 lg:mb-0">
                                    <p className="font-quicksand text-white pb-2">
                                        Description
                                    </p>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Input Description"
                                        rows={4}
                                        className={`flex-3 p-3 font-quicksand rounded text-white border ${
                                            errors.description
                                                ? 'border-red-500'
                                                : 'border-white'
                                        } bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666] resize-none`}
                                    ></textarea>
                                    <div className="min-h-[20px]">
                                        {errors.description && (
                                            <div className="text-red-500 text-sm">
                                                {errors.description}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col mb-2 lg:mb-0 mt-auto">
                                    <p className="font-quicksand text-white pb-2">
                                        Province
                                    </p>
                                    <input
                                        type="text"
                                        name="province"
                                        value={formData.province}
                                        onChange={handleChange}
                                        placeholder="Input Province"
                                        className={`flex-3 p-3 font-quicksand rounded text-white border ${
                                            errors.province
                                                ? 'border-red-500'
                                                : 'border-white'
                                        } bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]`}
                                    />
                                    <div className="min-h-[20px]">
                                        {errors.province && (
                                            <div className="text-red-500 text-sm">
                                                {errors.province}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col lg:gap-2">
                                <div className="flex flex-col mb-2 lg:mb-0">
                                    <p className="font-quicksand text-white pb-2">
                                        Link Image
                                    </p>

                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="dropzone-file"
                                            className={`flex flex-col items-center justify-center w-full h-58 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 
                                            ${
                                                errors.imageLink
                                                    ? 'border-red-500 dark:hover:border-red-700'
                                                    : 'border-gray-300 dark:border-gray-600 dark:hover:border-gray-500'
                                            }`}
                                        >
                                            {selectedImage ? (
                                                <img
                                                    src={selectedImage}
                                                    alt="Selected"
                                                    className="object-cover w-full h-full rounded-lg"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg
                                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 20 16"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                        />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold">
                                                            Click to upload
                                                        </span>{' '}
                                                        or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        SVG, PNG, JPG or GIF
                                                        (MAX. 800x400px)
                                                    </p>
                                                </div>
                                            )}
                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    </div>
                                    <div className='min-h-[20px]'>
                                        {fileName && (
                                            <p className="text-sm text-gray-500 text-center">
                                                {fileName}
                                            </p>
                                        )}
                                    </div>

                                    <div className="min-h-[20px]">
                                        {errors.imageLink && (
                                            <div className="text-red-500 text-sm">
                                                {errors.imageLink}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col mb-2 lg:mb-0">
                                    <p className="font-quicksand text-white pb-2">
                                        Location
                                    </p>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Input Location"
                                        className={`flex-3 p-3 font-quicksand rounded text-white border ${
                                            errors.location
                                                ? 'border-red-500'
                                                : 'border-white'
                                        } bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]`}
                                    />
                                    <div className="min-h-[20px]">
                                        {errors.location && (
                                            <div className="text-red-500 text-sm">
                                                {errors.location}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="font-bold w-full mt-5 p-3 bg-[#FFA666] text-black font-quicksand rounded hover:bg-orange-500 transition cursor-pointer"
                        >
                            Add Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddData;
