import React, { useEffect, useState } from "react";
import LogoUsers from "../../assets/icons/admin/users.svg";
import TempUserProfile from "../../assets/logIn/image2.webp";
import TempUserProfile2 from "../../assets/logIn/image4.webp";
import { Link } from "react-router-dom";


const UserData = ({select, pfp, name, email, role, tableRowTemplate}) => {

  const roles = [
    (
      <div className="w-fit px-4 py-1 text-black bg-[#ff853e] text-sm tracking-wider rounded-md">
        <p>User</p>
      </div>
    ),
    (
      <div className="w-fit px-4 py-1 font-semibold bg-[#7A43EE] text-sm tracking-wider rounded-md">
        <p>Admin</p>
      </div>
    ),
  ]

  const [selected, setSelected] = useState(false);
  const handleSelect = () => {
    setSelected(!selected);
  }

  useEffect(_ => {
    setSelected(select);
  }, [select]);

  return (
    <div 
      className="grid w-full items-center bg-[#252527] py-3 px-5 text-white"
      style={tableRowTemplate}>
      <input type="checkbox" className="outline-none w-5 h-5 cursor-pointer" checked={selected} onChange={handleSelect} />
      <div className="flex items-center gap-3">
        <img className="h-9 aspect-square rounded-3xl" src={pfp} />
        <div className="flex flex-col">
          <p className="tracking-wide font-semibold">{name}</p>
          <p className="tracking-tight text-gray-500 text-sm">{email}</p>
        </div>
      </div>
      {roles[role]}
      <button className="font-bold tracking-wider cursor-pointer">...</button>
    </div>
  )
}


const UserDataTable = () => {

  const tableRowTemplate = {gridTemplateColumns:'1.5fr 20fr 15fr 1fr'}
  const [selectedAll, setSelectedAll] = useState(false);
  const [users, setUsers] = useState([
    {
      pic: TempUserProfile, name: 'Full Name', email: 'example@exemple.com', role: 0,
    },
    {
      pic: TempUserProfile2, name: 'Full Name', email: 'example@exemple.com', role: 1,
    },
    {
      pic: TempUserProfile, name: 'Full Name', email: 'example@exemple.com', role: 0,
    },
    {
      pic: TempUserProfile, name: 'Full Name', email: 'example@exemple.com', role: 0,
    },
    {
      pic: TempUserProfile2, name: 'Full Name', email: 'example@exemple.com', role: 1,
    },
    {
      pic: TempUserProfile2, name: 'Full Name', email: 'example@exemple.com', role: 1,
    },
    {
      pic: TempUserProfile, name: 'Full Name', email: 'example@exemple.com', role: 1,
    },
  ]);

  const handleSelectAll = () => {
    setSelectedAll(!selectedAll);
  }
  
  return (
    <div className="flex flex-col items-stretch justify-center p-5 pt-40 h-fit gap-4 font-quicksand">
      <div className="flex flex-col items-center">
        <img src={LogoUsers} alt="Users Icon" className="w-10 mb-4" />
        <h2 className="text-[#aaa] font-semibold tracking-wider text-3xl">User Data</h2>
      </div>
      <div className="flex flex-col divide-white divide-y">
        {/* Table Header */}
        <div 
          className="grid w-full items-center bg-[#FFA666] py-3 px-5 rounded-tl-lg rounded-tr-lg text-black font-semibold tracking-wide"
          style={tableRowTemplate}>
          <input type="checkbox" className="outline-none w-5 h-5 cursor-pointer" checked={selectedAll} onChange={handleSelectAll} />
          <div>
            <p>Name</p>
          </div>
          <div>
            <p>Role</p>
          </div>
        </div>

        {
          /* Table Contents */
          users.map(v => <UserData select={selectedAll} pfp={v.pic} name={v.name} email={v.email} role={v.role} tableRowTemplate={tableRowTemplate} />)
        }
      </div>
    </div>
  );
};

export default UserDataTable;
