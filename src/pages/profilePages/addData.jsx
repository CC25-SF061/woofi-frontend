import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/profile/sidebar';
import { HiX } from 'react-icons/hi';
import { RiMenu2Line } from 'react-icons/ri';
import { IoIosNotifications } from 'react-icons/io';
import ErrorConstant from '../../util/ErrorConstant.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaChevronDown } from 'react-icons/fa';
import axios, { AxiosError } from 'axios';

const AddData = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileImage, setFileImage] = useState('');
    const [postId, setPostId] = useState();
    const [formData, setFormData] = useState({
        name: '',
        detail: '',
        imageLink: '',
        location: '',
        province: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        detail: '',
        image: '',
        location: '',
        province: '',
    });
    const [province, setProvince] = useState({ name: '' });
    const [filteredProvinces, setFilteredProvinces] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((state) => ({ ...state, [name]: value }));
    };

    const invalidFieldErr = (arr) => {
        const newObjErr = {
            name: '',
            detail: '',
            image: '',
            location: '',
            province: '',
        };
        for (const element of arr) {
            if (
                Object.prototype.hasOwnProperty.call(newObjErr, element.path[0])
            ) {
                newObjErr[element.path[0]] = element.message;
            }
        }
        setErrors((state) => ({ ...state, ...newObjErr }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        form.append('name', formData.name.trim());
        form.append('province', formData.province.trim());
        form.append('detail', formData.detail.trim());
        form.append('image', fileImage);
        form.append('location', formData.location.trim());

        try {
            //ping the route so its not econreset error
            await axios
                .post('/api/destination/add', new FormData())
                .catch((e) => {});

            const result = await axios.post('/api/destination/add', form);
            setPostId(result.data.data.postId);
            formData?.imageLink?.revokeObjectUrl?.();
            setErrors(() => ({
                name: '',
                detail: '',
                image: '',
                location: '',
                province: '',
            }));
            setFormData(() => ({
                name: '',
                detail: '',
                imageLink: '',
                location: '',
                province: '',
            }));
            setProvince({ name: '' });
            setFileImage(null);
            setSelectedImage('');

            document.getElementById('modal-success').showModal();
        } catch (e) {
            if (!(e instanceof AxiosError)) {
                return toast.error('Something went wrong', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
            if (e.status == 413) {
                setErrors((state) => ({ ...state, image: 'Image too large' }));
            }
            const response = e?.response?.data?.payload;
            if (response.errCode === ErrorConstant.ERR_INVALID_FIELD) {
                console.log(response.fields);
                invalidFieldErr(response.fields);
            }
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setFileImage(file);
        }
        event.target.value = '';
    };

    useEffect(() => {
        setFormData((prev) => ({ ...prev, province: province.name }));
    }, [province]);

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const res = await axios.get('/api/geolocation/provinces');
                setProvinces(res.data.data);
                setFilteredProvinces(res.data.data);
            } catch (err) {
                toast.error('Failed to fetch provinces!');
                console.error(err);
            }
        };

        fetchProvinces();
    }, []);

    const handleProvinceChange = (e) => {
        const value = e.target.value;
        setProvince({ name: value });
        setDropdownOpen(true);

        const filtered = provinces.filter((p) =>
            p.name.toLowerCase().includes(value.toLowerCase()),
        );
        setFilteredProvinces(filtered);
    };

    const handleSelectProvince = (selectedProvince) => {
        setProvince(selectedProvince);
        setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    return (
        <div>
            <ToastContainer />
            <dialog id="modal-success" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">
                        Success adding Destination!
                    </h3>
                    <p className="py-4">
                        Click
                        <a
                            className="link link-primary"
                            href={`/destination/${postId}`}
                        >
                            {' '}
                            Here{' '}
                        </a>
                        to go to your created destination
                    </p>
                    <form method="dialog">
                        <button className="btn btn-neutral">Ok</button>
                    </form>
                </div>
            </dialog>

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
                                        Destination Name
                                    </p>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Input Destination"
                                        className={`flex-3 p-3 font-quicksand rounded text-white border ${
                                            errors.name
                                                ? 'border-red-500'
                                                : 'border-white'
                                        } bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]`}
                                    />
                                    <div className="min-h-[20px]">
                                        {errors.name && (
                                            <div className="text-red-500 text-sm">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col mb-2 lg:mb-0">
                                    <p className="font-quicksand text-white pb-2">
                                        Province
                                    </p>
                                    <div className="relative w-full">
                                        <div className="flex items-center">
                                            <input
                                                id="province"
                                                type="text"
                                                name="province"
                                                value={province.name}
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
                                                className="absolute inset-y-0 right-0 flex items-center justify-center p-2 pl-4 rounded rounded-l-2xl bg-[#FFA666] cursor-pointer transition-all duration-200 hover:bg-white group"
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
                                                    {filteredProvinces.map(
                                                        (p) => (
                                                            <li
                                                                key={p.name}
                                                                className="px-4 py-2 cursor-pointer hover:bg-[#FFA666] hover:text-black transition-all duration-200"
                                                                onClick={() =>
                                                                    handleSelectProvince(
                                                                        p,
                                                                    )
                                                                }
                                                            >
                                                                {p.name}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            )}
                                    </div>
                                    <div className="min-h-[20px]">
                                        {errors.province && (
                                            <div className="text-red-500 text-sm">
                                                {errors.province}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col mb-2 lg:mb-0 mt-auto">
                                    <p className="font-quicksand text-white pb-2">
                                        Description
                                    </p>
                                    <textarea
                                        name="detail"
                                        value={formData.detail}
                                        onChange={handleChange}
                                        placeholder="Input Description"
                                        rows={4}
                                        className={`flex-3 p-3 font-quicksand rounded text-white border ${
                                            errors.detail
                                                ? 'border-red-500'
                                                : 'border-white'
                                        } bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666] resize-none`}
                                    ></textarea>
                                    <div className="min-h-[20px]">
                                        {errors.detail && (
                                            <div className="text-red-500 text-sm">
                                                {errors.detail}
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
                                            className={`flex flex-col items-center justify-center w-full h-59 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer hover:bg-gray-700 transition 
                                            ${
                                                errors.imageLink
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
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
                                                        className="w-8 h-8 mb-4 text-gray-400"
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
                                                    <p className="text-sm text-gray-400">
                                                        <span className="font-semibold">
                                                            Click to upload
                                                        </span>{' '}
                                                        or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        PNG, JPG or WEBP (MAX.
                                                        800x400px)
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
                                    <div className="min-h-[20px]">
                                        {fileImage && (
                                            <p className="text-sm text-gray-500 text-center">
                                                {fileImage.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="min-h-[20px]">
                                        {errors.image && (
                                            <div className="text-red-500 text-sm">
                                                {errors.image}
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
