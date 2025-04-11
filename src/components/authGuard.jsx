import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../stores/userReducer';

const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.data);

    const userFetched = useSelector((state) => state.user.isFetched);
    useEffect(() => {
        (async () => {
            dispatch(fetchUserProfile());
        })();
    }, []);
    useEffect(() => {
        async function fetchProfile() {
            if (userFetched && !userId.id) {
                await navigate('/sign-in');
            }
        }
        fetchProfile();
    }, [userId, userFetched]);

    return <>{children}</>;
};

export default AuthGuard;
