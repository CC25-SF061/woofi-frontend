import axios from 'axios';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { Provider } from 'react-redux';
import store from './stores/store.js';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

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

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
