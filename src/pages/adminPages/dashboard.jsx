import React from 'react';
import SidebarAdmin from '../../components/admin/sidebar';
import HeaderAdmin from '../../components/admin/header';
import DashboardAdmin from '../../components/admin/dashboard';

const Dashboard = () => {
  return (
    <div className='w-full bg-[#221122] flex lg:h-screen text-white'>
      <SidebarAdmin/>
      <HeaderAdmin/>
      <DashboardAdmin users_count="24.3k" destinations_count="554"/>
    </div>
  )
}

export default Dashboard
