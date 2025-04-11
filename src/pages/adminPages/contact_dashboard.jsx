import React, { useState } from 'react';
import SidebarAdmin from '../../components/admin/sidebar';
import HeaderAdmin from '../../components/admin/header';
import ContactData from '../../components/admin/contact_data';

const Contact_dashboard = () => {
    const [search, setSearch] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [hasNewMessage, setHasNewMessage] = useState(true);

    return (
        <div className="w-full flex text-white overflow-y-auto pl-10">
            <SidebarAdmin />
            <HeaderAdmin
                selectedDate={{ get: selectedDate, set: setSelectedDate }}
                search={{ get: search, set: setSearch }}
            />
            <div className="pl-50 w-full">
                <ContactData />
            </div>
        </div>
    );
};

export default Contact_dashboard;
