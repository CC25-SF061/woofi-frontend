import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../stores/userReducer';
import PageWrapper from './loading/pageWrapper';
const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data.id);

    useEffect(() => {
        async function fetchProfile() {
            const user = await dispatch(fetchUserProfile()).unwrap();
            if (!user.id) {
                await navigate('/sign-in');
            }
        }
        fetchProfile();
    }, [user]);

    return <>{user ? children : <PageWrapper />}</>;
};

export default AuthGuard;
