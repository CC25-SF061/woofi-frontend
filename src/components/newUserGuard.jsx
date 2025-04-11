import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../stores/userReducer';

const NewUserGuard = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [canContinue, setCanContinue] = useState(false);
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
                setCanContinue(false);
                await navigate('/interest');
            }
            setCanContinue(true);
        }
        fetchProfile();
    }, [user, userFetched]);

    return <>{canContinue && children}</>;
};

export default NewUserGuard;
