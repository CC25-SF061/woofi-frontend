import axios from 'axios';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
const refreshAuthLogic = async (failedRequest) => {
    try {
        const response = failedRequest.response.data;
        if (
            response.message === 'Token expired' ||
            response.message === 'Invalid token structure'
        ) {
            const refreshToken = (
                await axios({
                    method: 'get',
                    url: '/api/auth/refresh-token',
                    withCredentials: true,
                })
            ).data;
            localStorage.setItem('token', refreshToken.token);
            return Promise.resolve();
        }
        localStorage.setItem('token', null);
        return Promise.reject();
    } catch (e) {
        return Promise.reject();
    }
};
axios.interceptors.request.use(
    function (request) {
        request.headers['Authorization'] = `Bearer ${localStorage.getItem(
            'token'
        )}`;

        return request;
    },
    function (error) {
        return Promise.reject(error);
    }
);
createAuthRefreshInterceptor(axios, refreshAuthLogic);
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
