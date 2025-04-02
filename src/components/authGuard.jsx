import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../stores/userReducer';

const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchProfile() {
            const userPromise = (await dispatch(fetchUserProfile())).payload;

            if (!userPromise.id) {
                await navigate('/sign-in');
            }
        }
        fetchProfile();
    }, []);

    return <>{children}</>;
};

export default AuthGuard;
