import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer.js';
import forgetPasswordReducer from './forgetPasswordReducer.js';
import loadingReducer from './loadingReducer.js';
import notificationAdminReducer from './notificationAdminReducer.js';
import notificationUserReducer from './notificationUserReducer.js';
export default configureStore({
    reducer: {
        user: userReducer,
        forgetPassword: forgetPasswordReducer,
        loading: loadingReducer,
        notificationAdmin: notificationAdminReducer,
        notificationUser: notificationUserReducer,
    },
});
