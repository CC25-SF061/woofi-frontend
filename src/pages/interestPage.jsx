import React, { useState } from 'react';

const InterestPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        birth_date: '',
        interest: [],
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
                ? [...prev.interest, value]
                : prev.interest.filter((item) => item !== value);
            return {
                ...prev,
                interest: newInterests,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Data terkirim:', formData);
        // TODO: Kirim ke backend atau API ML
    };

    return (
        <div className=" fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 font-quicksand top-20 lg:top-0">
            <div className="relative p-6 w-full max-w-lg rounded-lg shadow-2xl bg-[#1f1f1f] lg:max-h-[90vh] max-h-[75vh] overflow-y-auto border border-gray-700">
                
                <div className="flex flex-col bg-[#252527] p-4 py-4 border-b rounded-t border-gray-600 mb-8">
                    <h3 className="text-xl font-semibold text-white">
                        Complete your <span className='text-[#FFA666]'>Setup</span> Now
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
                            required
                            className="w-full p-3 font-quicksand rounded text-white border bg-[#1f1f1f] focus:outline-none focus:ring focus:ring-[#FFA666]"
                        >
                            <option value="">Choose Gender</option>
                            <option value="male">Man</option>
                            <option value="female">Woman</option>
                        </select>
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
                            required
                            className="w-full p-3 font-quicksand rounded text-white border bg-transparent focus:outline-none focus:ring focus:ring-[#FFA666]"
                        />
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
                                        checked={formData.interest.includes(
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
