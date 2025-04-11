import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../stores/userReducer';

const NewUserGuard = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const userFetched = useSelector((state) => state.user.isFetched);
    useEffect(() => {
        (async () => {
            dispatch(fetchUserProfile());
        })();
    }, []);
    useEffect(() => {
        async function fetchProfile() {
            if (userFetched && user.isNewUser) {
                await navigate('/interest');
            }
        }
        fetchProfile();
    }, [user, userFetched]);

    return <>{children}</>;
};

export default NewUserGuard;
