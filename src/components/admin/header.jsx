import React from "react";
import Logo from "../../assets/navbar/logo.webp";
import LogoProfile from "../../assets/icons/profile_outline.svg";
import LogoNotif from "../../assets/icons/notification_outline.svg";
import LogoRefresh from "../../assets/icons/admin/refresh.svg";
import LogoActions from "../../assets/icons/admin/actions.svg";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  let name = '';
  switch (location.pathname) {
    case '/admin':
      name = 'Admin Dashboard';
      break;
    case '/admin/users':
      name = 'Admin Dashboard / Users';
      break;
    case '/admin/posts':
      name = 'Admin Dashboard / Posts';
      break;
  }

  const handleDataRefresh = () => {
    // do stuff based on the current location
  }
  const showActions = () => {
    // do stuff based on the current location
  }
  const showNotifs = () => {
    // do stuff
  }
  
  return (
    <div className="fixed overflow-hidden h-fit w-full font-quicksand">
      <div className="flex flex-row items-center shadow-lg bg-[#252527] p-4 pt-5">
        <div className="flex flex-row w-fit items-center gap-3 mr-5 divide-white">
          <img src={Logo} alt="Logo Woofi" className="w-15" />
          <h1 className="text-xl text-white tracking-wide">Woofi Admin</h1>
        </div>
        <div className="bg-white h-10 w-[1px] mr-5"></div>
        <h1 className="text-2xl text-[#d2d2d2] tracking-wider">{name}</h1>

        <div className="flex flex-row ml-auto gap-3">
          <button onClick={showNotifs}>
            <img src={LogoNotif} alt="Notification Icon" className="w-9 h-9 cursor-pointer" />
          </button>
          <Link
            to="/profile"
            className="flex items-center justify-center cursor-pointer"
            >
            <img src={LogoProfile} alt="Profile Icon" className="w-9 h-9" />
          </Link>
        </div>
      </div>
      <div className="flex flex-row-reverse items-center w-full tracking-wide text-[#aaa] gap-6 px-5 mt-5">
        <button className="flex flex-row gap-2 cursor-pointer" onClick={showActions}>
          <img src={LogoActions} alt="Actions Icon" className="w-5 h-5" />
          <p>Actions</p>
        </button>
        <button className="flex flex-row gap-2 cursor-pointer" onClick={handleDataRefresh}>
          <img src={LogoRefresh} alt="Refresh Icon" className="w-5 h-5" />
          <p>Refresh Data</p>
        </button>
      </div>
    </div>
  );
};

export default Header;
