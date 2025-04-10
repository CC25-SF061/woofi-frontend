import axios from 'axios';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import QueryString from 'qs';
import { Provider } from 'react-redux';
import store from './stores/store.js';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.timeout = 1000 * 60;
axios.defaults.paramsSerializer = (params) =>
    QueryString.stringify(params, { arrayFormat: 'repeat' });
axios.interceptors.request.use(
    function (request) {
        if (localStorage.getItem('token')) {
            request.headers['Authorization'] = `Bearer ${localStorage.getItem(
                'token',
            )}`;
        }

        return request;
    },
    function (error) {
        return Promise.reject(error);
    },
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
);
