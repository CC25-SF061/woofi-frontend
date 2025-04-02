import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Pages
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/homePage';
import CultureHistory from './pages/cultureHistory';
import GalleryPage from './pages/galleryPage';
import DestinationPage from './pages/destinationPage';
import DestinationViewPage from './pages/destinationViewPage';
import NotFound from './pages/notFound';
import ContactUs from './pages/contactUs';

import Signin from './pages/loginPages/signin';
import Register from './pages/loginPages/register';
import ForgetPassword from './pages/loginPages/forgetPassword';
import OtpPages from './pages/loginPages/otpPages';
import NewPassword from './pages/loginPages/newPassword.jsx';

import Profile from './pages/profilePages/profile';
import Wishlist from './pages/profilePages/wishlist';
import AddData from './pages/profilePages/addData';

import Dashboard from './pages/adminPages/dashboard.jsx';
import UsersDashboard from './pages/adminPages/user_dashboard.jsx';
import PostsDashboard from './pages/adminPages/post_dashboard.jsx';

import ScrollToTop from './scrollToTop';
import PageWrapper from './components/loading/pageWrapper';
import AuthGuard from './components/authGuard.jsx';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setData } from './stores/userReducer.js';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const App = () => {
    const dispatch = useDispatch();
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
                localStorage.setItem('token', refreshToken.data.token);
                return Promise.resolve();
            }
            localStorage.setItem('token', null);
            dispatch(
                setData({
                    profileImage: null,
                    username: null,
                    name: null,
                    email: null,
                    id: null,
                    isVerified: null,
                })
            );
            return Promise.reject();
        } catch (e) {
            dispatch(
                setData({
                    profileImage: null,
                    username: null,
                    name: null,
                    email: null,
                    id: null,
                    isVerified: null,
                })
            );
            return Promise.reject();
        }
    };
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    createAuthRefreshInterceptor(axios, refreshAuthLogic);

    return (
        <GoogleOAuthProvider
            clientId={import.meta.env.VITE_GOOGLE_WEB_CLIENT_ID}
        >
            <Router>
                <ScrollToTop />
                <PageWrapper />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/culture" element={<CultureHistory />}></Route>
                    <Route
                        path="/destination"
                        element={<DestinationPage />}
                    ></Route>
                    <Route
                        path="/destination/:destinationId"
                        element={<DestinationViewPage />}
                    ></Route>
                    <Route path="/gallery" element={<GalleryPage />}></Route>
                    <Route path="/contact-us" element={<ContactUs />}></Route>
                    <Route path="/sign-in" element={<Signin />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route
                        path="/forget-password"
                        element={<ForgetPassword />}
                    ></Route>
                    <Route path="/otp-code" element={<OtpPages />}></Route>
                    <Route
                        path="/new-password"
                        element={<NewPassword />}
                    ></Route>
                    <Route
                        path="/profile/wishlist"
                        element={<Wishlist />}
                    ></Route>
                    <Route
                        path="/profile"
                        element={
                            <AuthGuard>
                                <Profile />
                            </AuthGuard>
                        }
                    ></Route>
                    <Route
                        path="/profile/add-data"
                        element={<AddData />}
                    ></Route>
                    <Route path="/admin" element={<Dashboard />}></Route>
                    <Route
                        path="/admin/users"
                        element={<UsersDashboard />}
                    ></Route>
                    <Route
                        path="/admin/posts"
                        element={<PostsDashboard />}
                    ></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </Router>
        </GoogleOAuthProvider>
    );
};

export default App;
