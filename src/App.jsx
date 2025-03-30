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
import NewPassword from './pages/loginPages/newPassword.jsx'

import Profile from './pages/profilePages/profile';
import Wishlist from './pages/profilePages/wishlist';
import AddData from './pages/profilePages/addData';

import Dashboard from './pages/adminPages/dashboard.jsx';

import ScrollToTop from './scrollToTop';
import PageWrapper from './components/loading/pageWrapper';
import { Provider } from 'react-redux';
import store from './stores/store.js';

const App = () => {
    return (
        <Provider store={store}>
            <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_WEB_CLIENT_ID}
            >
                <Router>
                    <ScrollToTop />
                    <PageWrapper />
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route
                            path="/culture"
                            element={<CultureHistory />}
                        ></Route>
                        <Route
                            path="/destination"
                            element={<DestinationPage />}
                        ></Route>
                        <Route
                            path="/destination/:destinationId"
                            element={<DestinationViewPage />}
                        ></Route>
                        <Route
                            path="/gallery"
                            element={<GalleryPage />}
                        ></Route>
                        <Route
                            path="/contact-us"
                            element={<ContactUs />}
                        ></Route>
                        <Route path="/sign-in" element={<Signin />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                        <Route
                            path="/forget-password"
                            element={<ForgetPassword />}
                        ></Route>
                        <Route path="/otp-code" element={<OtpPages />}></Route>
                        <Route path="/new-password" element={<NewPassword />}></Route>
                        <Route
                            path="/profile/wishlist"
                            element={<Wishlist />}
                        ></Route>
                        <Route path="/profile" element={<Profile />}></Route>
                        <Route
                            path="/profile/add-data"
                            element={<AddData />}
                        ></Route>
                        <Route
                            path="/admin"
                            element={<Dashboard />}
                        ></Route>
                        <Route path="*" element={<NotFound />}></Route>
                    </Routes>
                </Router>
            </GoogleOAuthProvider>
        </Provider>
    );
};

export default App;
