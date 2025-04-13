import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import invalidFieldErr from '../util/invalidField';
import ErrorConstant from '../util/errorConstant';
import { fetchUserProfile, setIsNewUser } from '../stores/userReducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const InterestPage = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        birth_date: '',
        interests: [],
    });
    const [err, setErr] = useState({
        name: '',
        gender: '',
        birth_date: '',
        interests: '',
    });

    const interestsList = [
        'Peak',
        'Mountain',
        'Forest',
        'Beach',
        'Waterfall',
        'Lake',
        'Museum',
        'Recreational Park',
        'Tourist Village',
        'Others',
    ];
    useEffect(() => {
        (async () => {
            dispatch(fetchUserProfile());
        })();
    }, []);
    useEffect(() => {
        (async () => {
            if (user.isNewUser === false) {
                await navigate('/profile');
            }
        })();
    }, [user]);
    useEffect(() => {
        if (err.interests) {
            toast.error(err.interests, {
                autoClose: 3000,
                position: 'top-right',
            });
        }
    }, [err]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            const newInterests = checked
                ? [...prev.interests, value]
                : prev.interests.filter((item) => item !== value);
            return {
                ...prev,
                interests: newInterests,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/user/interest', formData);
            dispatch(setIsNewUser(false));
            await navigate('/profile');
        } catch (e) {
            console.log(e);
            if (!(e instanceof AxiosError)) {
                return toast.error('Something went wrong', {
                    autoClose: 3000,
                    position: 'top-right',
                });
            }
            const response = e?.response?.data?.payload;
            if (response.errCode === ErrorConstant.ERR_INVALID_FIELD) {
                return invalidFieldErr(
                    response.fields,
                    {
                        name: '',
                        gender: '',
                        birth_date: '',
                        interests: '',
                    },
                    setErr,
                );
            }

            return toast.error('Something went wrong', {
                autoClose: 3000,
                position: 'top-right',
            });
        }
    };

    return (
        <div className=" fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 font-quicksand top-20 lg:top-0">
            <ToastContainer />
            <div className="relative p-6 w-full max-w-lg rounded-lg shadow-2xl bg-[#1f1f1f] lg:max-h-[90vh] max-h-[75vh] overflow-y-auto border border-gray-700">
                <div className="flex flex-col bg-[#252527] p-4 py-4 border-b rounded-t border-gray-600 mb-8">
                    <h3 className="text-xl font-semibold text-white">
                        Complete your{' '}
                        <span className="text-[#FFA666]">Setup</span> Now
                    </h3>
                    <p className="text-gray-300 text-sm lg:text-base max-w-xl mx-auto leading-relaxed">
                        This form is used to collect users' travel interests to
                        provide personalized destination recommendations.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 text-white">
                    {/* Gender */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-300">
                            Gender
                        </label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            // required
                            className="w-full p-3 font-quicksand rounded text-white border bg-[#1f1f1f] focus:outline-none focus:ring focus:ring-[#FFA666]"
                        >
                            <option value="">Choose Gender</option>
                            <option value="male">Man</option>
                            <option value="female">Woman</option>
                        </select>
                        <div className="text-red-500 text-sm">{err.gender}</div>
                    </div>

                    {/* Birth Date */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-300">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="birth_date"
                            value={formData.birth_date}
                            onChange={handleChange}
                            // required
                            className="w-full p-3 font-quicksand rounded text-white border bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]"
                        />
                        <div className="text-red-500 text-sm">
                            {err.birth_date}
                        </div>
                    </div>

                    {/* Interests */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#FFA666]">
                            Choose your interest destination
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {interestsList.map((item) => (
                                <label
                                    key={item}
                                    className="flex items-center space-x-3"
                                >
                                    <input
                                        type="checkbox"
                                        value={item}
                                        checked={formData.interests.includes(
                                            item,
                                        )}
                                        onChange={handleCheckboxChange}
                                        className="accent-blue-600 w-4 h-4"
                                    />
                                    <span className="text-gray-200">
                                        {item}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit & Cancel */}
                    <div className="bottom-0 bg-[#1f1f1f] z-10 p-4 pt-6 mt-6 border-t border-gray-700 flex items-center justify-end gap-4">
                        <button
                            type="submit"
                            className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InterestPage;
