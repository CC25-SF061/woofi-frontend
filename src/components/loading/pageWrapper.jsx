// src/components/PageWrapper.jsx
import LoadingScreen from './loadingScreen';
import { useSelector } from 'react-redux';

const PageWrapper = ({ children }) => {
    const loading = useSelector((state) => state.loading.loading);
    return (
        <div className="relative">
            {loading.length > 0 ? (
                <LoadingScreen />
            ) : (
                <div className="hidden">{children}</div>
            )}
        </div>
    );
};

export default PageWrapper;
