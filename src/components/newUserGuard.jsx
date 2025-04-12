import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../stores/userReducer';
import PageWrapper from './loading/pageWrapper';

const NewUserGuard = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [canContinue, setCanContinue] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const user = await dispatch(fetchUserProfile()).unwrap();
                if (user.isNewUser) {
                    return await navigate('/interest');
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

export default NewUserGuard;
