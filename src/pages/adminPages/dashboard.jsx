import React from 'react'
import SidebarAdmin from '../../components/admin/sidebarAdmin'
const dashboard = () => {
  return (
    <div className='w-full bg-[#221122] flex lg:h-screen items-center justify-center p-5 lg:p-10 gap-5 text-white'>
        <SidebarAdmin/>
    </div>
  )
}

export default dashboard
