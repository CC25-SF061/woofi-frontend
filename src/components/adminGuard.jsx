import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../stores/userReducer';
import PageWrapper from './loading/pageWrapper';

const AdminGuard = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [canContinue, setCanContinue] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const user = await dispatch(fetchUserProfile()).unwrap();
                if (!user.id || !user.isAdmin) {
                    return await navigate('/');
                }

                setCanContinue(true);
            } catch (e) {
                console.log(e);
            }
        }
        fetchProfile();
    }, []);
    return <>{canContinue ? children : <PageWrapper />}</>;
};

export default AdminGuard;
