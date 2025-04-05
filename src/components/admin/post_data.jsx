import React, { useEffect, useState } from 'react';
import LogoPosts from '../../assets/icons/admin/database.svg';
import TempUserProfile from '../../assets/logIn/image2.webp';
import TempUserProfile2 from '../../assets/logIn/image4.webp';
import { Link } from 'react-router-dom';

const PostData = ({ select, pic, name, writer, state, tableRowTemplate }) => {
    const states = [
        <div className="w-fit px-4 py-1 text-black font-semibold bg-[#63ffa1] text-sm tracking-wider rounded-md">
            <p>Posted</p>
        </div>,
        <div className="w-fit px-4 py-1 text-black font-semibold bg-[#ff853e] text-sm tracking-wider rounded-md">
            <p>Reviewed</p>
        </div>,
        <div className="w-fit px-4 py-1 bg-[#41445d] text-sm tracking-wider rounded-md">
            <p>Hidden</p>
        </div>,
    ];

    const [selected, setSelected] = useState(false);
    const handleSelect = () => {
        setSelected(!selected);
    };

    useEffect(
        (_) => {
            setSelected(select);
        },
        [select],
    );

    return (
        <div
            className="grid w-full items-center bg-[#252527] py-3 px-5 text-white"
            style={tableRowTemplate}
        >
            <input
                type="checkbox"
                className="outline-none w-5 h-5 cursor-pointer"
                checked={selected}
                onChange={handleSelect}
            />
            <div className="flex items-center gap-3">
                <img className="h-9 aspect-square rounded-3xl" src={pic} />
                <div className="flex flex-col">
                    <p className="tracking-wide font-semibold">{name}</p>
                    <p className="tracking-tight text-gray-500 text-sm">
                        {writer.name} | {writer.email}
                    </p>
                </div>
            </div>
            {states[state]}
            <button className="font-bold tracking-wider cursor-pointer">
                ...
            </button>
        </div>
    );
};

const PostDataTable = () => {
    const tableRowTemplate = { gridTemplateColumns: '1.5fr 20fr 15fr 1fr' };
    const [selectedAll, setSelectedAll] = useState(false);
    const [users, setUsers] = useState([
        {
            pic: [TempUserProfile],
            name: 'Destination Name',
            writer: 'Writer',
            writer_email: 'example@exemple.com',
            state: 0,
        },
        {
            pic: [TempUserProfile2],
            name: 'Destination Name',
            writer: 'Writer',
            writer_email: 'example@exemple.com',
            state: 1,
        },
        {
            pic: [TempUserProfile],
            name: 'Destination Name',
            writer: 'Writer',
            writer_email: 'example@exemple.com',
            state: 2,
        },
        {
            pic: [TempUserProfile],
            name: 'Destination Name',
            writer: 'Writer',
            writer_email: 'example@exemple.com',
            state: 0,
        },
        {
            pic: [TempUserProfile2],
            name: 'Destination Name',
            writer: 'Writer',
            writer_email: 'example@exemple.com',
            state: 1,
        },
        {
            pic: [TempUserProfile2],
            name: 'Destination Name',
            writer: 'Writer',
            writer_email: 'example@exemple.com',
            state: 2,
        },
        {
            pic: [TempUserProfile],
            name: 'Destination Name',
            writer: 'Writer',
            writer_email: 'example@exemple.com',
            state: 2,
        },
    ]);

    const handleSelectAll = () => {
        setSelectedAll(!selectedAll);
    };

    return (
        <div className="flex flex-col items-stretch justify-center p-5 pt-40 h-fit gap-4 font-quicksand">
            <div className="py-6 flex flex-col items-center bg-[#252527] rounded-md shadow-lg shadow-[#00000055] mb-5">
                <img src={LogoPosts} alt="Database Icon" className="w-7 mb-1" />
                <h2 className="text-[#aaa] tracking-wide text-xl">
                    See all Destination Data
                </h2>
            </div>
            <div className="flex flex-col divide-white divide-y">
                {/* Table Header */}
                <div
                    className="grid w-full items-center bg-[#FFA666] py-3 px-5 rounded-tl-lg rounded-tr-lg text-black font-semibold tracking-wide"
                    style={tableRowTemplate}
                >
                    <input
                        type="checkbox"
                        className="outline-none w-5 h-5 cursor-pointer"
                        checked={selectedAll}
                        onChange={handleSelectAll}
                    />
                    <div>
                        <p>Name & Writer</p>
                    </div>
                    <div>
                        <p>State</p>
                    </div>
                </div>

                {
                    /* Table Contents */
                    users.map((v) => (
                        <PostData
                            select={selectedAll}
                            pic={v.pic[0]}
                            name={v.name}
                            writer={{ name: v.writer, email: v.writer_email }}
                            state={v.state}
                            tableRowTemplate={tableRowTemplate}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default PostDataTable;
