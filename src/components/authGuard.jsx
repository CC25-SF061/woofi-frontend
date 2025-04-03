import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../stores/userReducer';

const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        async function fetchProfile() {
            const userPromise = (await dispatch(fetchUserProfile())).payload;
            if (!userPromise.id) {
                await navigate('/sign-in');
            }
        }
        fetchProfile();
    }, [user]);

    return <>{children}</>;
};

export default AuthGuard;
