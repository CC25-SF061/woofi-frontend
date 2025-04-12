import React, { useEffect, useState } from 'react';
import SidebarAdmin from '../../components/admin/sidebar';
import HeaderAdmin from '../../components/admin/header';
import DashboardPreview from '../../components/admin/dashboard_preview';
import DashboardUser from '../../components/admin/dashboard_preview_user';
import DashboardDestinations from '../../components/admin/dashboard_preview_destinations';
import axios from 'axios';
import { showLoading, hideLoading } from '../../stores/loadingReducer';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

const Dashboard = () => {
    const [isRendered, setIsRendered] = useState(false);
    const dispatch = useDispatch();
    const [analytic, setAnalytic] = useState({
        destination_count: null,
        destination_years: null,
        user_count: null,
        user_years: null,
    });
    useEffect(() => {
        (async () => {
            const keyLoading = nanoid();
            try {
                dispatch(showLoading(keyLoading));
                const res = await axios.get('/api/admin/analytics');
                setAnalytic(res.data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsRendered(true);

                dispatch(hideLoading(keyLoading));
            }
        })();
    }, []);
    return (
        <div className="w-full bg-[#221122] flex h-screen text-white lg:pl-10 overflow-y-auto">
            <SidebarAdmin />
            <HeaderAdmin />
            <div className="lg:pl-50 w-full">
                {isRendered && (
                    <>
                        <DashboardPreview
                            destinationCount={analytic.destination_count}
                            userCount={analytic.user_count}
                        />
                        <DashboardUser
                            userYears={Array.from(
                                new Set([
                                    ...(analytic?.user_years || []),
                                    new Date().getFullYear(),
                                ]),
                            )}
                        />
                        <DashboardDestinations
                            destinationYears={Array.from(
                                new Set([
                                    ...(analytic?.destination_years || []),
                                    new Date().getFullYear(),
                                ]),
                            )}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
