import React from 'react';
import SidebarAdmin from '../../components/admin/sidebar';
import HeaderAdmin from '../../components/admin/header';
import UsersData from '../../components/admin/user_data';

const Dashboard = () => {
  return (
    <div className='w-full bg-[#221122] flex text-white'>
      <SidebarAdmin/>
      <HeaderAdmin/>
      <div className='pl-50 w-full'>
        <UsersData/>
      </div>
    </div>
  )
}

export default Dashboard
